const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const productrout = require('./routes/product.route');
const authRout = require('./routes/auth.routes');

mongoose.set('debug', true);

const mongoURI = "mongodb+srv://parthrkakdiya:prk59595@cluster0.qx5ox.mongodb.net/product?retryWrites=true&w=majority"
const app = express();
const store = new MongoDBStore({
    uri: mongoURI,
    collection: 'sessions'
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))


mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));


const allowedOrigins = [
    'https://ecommerce-one-pi-90.vercel.app',
    'https://ecommerce-v36f.vercel.app',
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
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
)

app.get('/', (req, res) => {
    res.json("hello");
})

app.use('/', productrout)
app.use('/admin', authRout)




app.listen(5959, () => {
    console.log("server listen");
})



