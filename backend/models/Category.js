const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newSchema = new Schema({
    title: {
        type: String,
        required: true
    }
});

const Category = mongoose.model('Category', newSchema);

module.exports = Category;
