require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('./models/user');
const productRoute = require('./routes/product.route');
const authRoute = require('./routes/auth.routes');

if (!process.env.MONGO_URI || !process.env.SESSION_SECRET) {
    console.error("Missing required environment variables! Check .env file.");
    process.exit(1);
}

const mongoURI = process.env.MONGO_URI;
const app = express();

const store = new MongoDBStore({
    uri: mongoURI,
    collection: 'sessions'
});

store.on('error', (error) => {
    console.error("Session Store Error:", error);
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        secure: true, // Use secure cookies in production
        httpOnly: true,
        sameSite: "None",
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.set("trust proxy", 1);

const allowedOrigins = [
    "https://ecommerce-ql8y.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174"
];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn(`CORS blocked: ${origin}`);
            callback(null, false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Could not connect to MongoDB:', err);
        process.exit(1);
    });

app.use(async (req, res, next) => {
    if (!req.session.user || !mongoose.Types.ObjectId.isValid(req.session.user._id)) {
        console.log("No valid User ID in Session");
        return next();
    }
    try {
        const user = await User.findById(req.session.user._id);
        if (!user) {
            console.log("User Not Found in Database");
            return next();
        }
        req.user = user;
        console.log("User Loaded into req.user:", req.user);
        next();
    } catch (err) {
        console.error("Error Retrieving User:", err);
        next();
    }
});

app.get("/auth", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    res.json({ user: req.session.user });
});

app.use('/', productRoute);
app.use('/admin', authRoute);

const PORT = process.env.PORT || 5959;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
