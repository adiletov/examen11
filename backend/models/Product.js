const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: String,
    image: String,
    price: {
        type: Number,
        min: 0,
        required: true
    },
    datetime: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', newSchema);

module.exports = Product;
