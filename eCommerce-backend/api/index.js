const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const productrout = require('./routes/product.route')
mongoose.set('debug', true);

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

const mongoURI = "mongodb+srv://parthrkakdiya:prk59595@cluster0.qx5ox.mongodb.net/product?retryWrites=true&w=majority"

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));


const allowedOrigins = [
    'https://ecommerce-one-pi-90.vercel.app',
    'https://ecommerce-v36f.vercel.app',
    'https://ecommerce-w2el.vercel.app'
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


app.get('/', (req, res) => {
    res.json("hello");
})

app.use('/', productrout)



app.listen(5959, () => {
    console.log("server listen");
})



