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

const mongoURI = process.env.MONGO_URI

const app = express();

const store = new MongoDBStore({
    uri: mongoURI,
    collection: 'sessions'
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        httpOnly: true
    }
}));

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
            console.error(`CORS error: Origin ${origin} not allowed`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));





app.use(async (req, res, next) => {  // 👈 Then, check session
    if (!req.session.user) {
        console.log("No User in Session");
        return next();
    }
    try {
        const user = await User.findById(req.session.user?._id);
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


app.get("/session", (req, res) => {
    if (req.session.user) {
        res.json({ message: "User is logged in", user: req.session.user });
    } else {
        res.json({ message: "No active session" });
    }
});



app.use('/', productRoute);
app.use('/admin', authRoute);


app.listen(5959, () => {
    console.log("Server running on port 5959");
});
