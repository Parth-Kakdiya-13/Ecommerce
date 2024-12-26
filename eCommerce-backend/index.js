const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
mongoose.set('debug', true);

const productrout = require('./routes/product.route')



const app = express();
app.use(express.json());
app.use(cors({
    origin: ["https://ecommerce-one-theta-45.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }))


const mongoURI = "mongodb+srv://parthrkakdiya:prk59595@cluster0.qx5ox.mongodb.net/product?retryWrites=true&w=majority"

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));



app.get('/', (req, res) => {
    res.json("hello")
})
app.use('/', productrout)



app.listen(5959, () => {
    console.log("server listen");
})



