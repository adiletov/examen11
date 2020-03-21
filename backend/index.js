const express = require('express');
const app = express();
const port = 8080;

const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./router/Users');
const categories = require('./router/Categories');
const products = require('./router/Products');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


const run = async () => {

    await mongoose.connect(config.database, config.options);

    app.use('/users', users);
    app.use('/categories', categories);
    app.use('/products', products);
    app.listen(port)

};

run().catch(error => {
    console.error(error)
});
