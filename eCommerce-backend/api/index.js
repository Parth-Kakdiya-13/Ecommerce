const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
mongoose.set('debug', true);

const productrout = require('./routes/product.route')



const app = express();
app.use(express.json());
const allowedOrigins = [
    'https://ecommerce-one-pi-90.vercel.app',
    'https://ecommerce-v36f.vercel.app/',
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


app.use(bodyParser.urlencoded({ extended: false }))


const mongoURI = "mongodb+srv://parthrkakdiya:prk59595@cluster0.qx5ox.mongodb.net/product?retryWrites=true&w=majority"

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));



app.get('/', (req, res) => {
    res.json("hello");
})
app.get('/addproduct', () => {
    res.json("addproduct")
})
app.get('/shop', () => {
    res.json("shop")
})
app.use('/', productrout)



app.listen(5959, () => {
    console.log("server listen");
})



