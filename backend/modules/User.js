const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nanoid = require('nanoid');
const bcrypt = require('bcrypt');

const newSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

newSchema.methods.generationToken = function () {
    this.token = nanoid();
};

newSchema.pre('save',async function (next) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

newSchema.set('toJSON', {
    transform: (doc, ret, option)=>{
        delete ret.password;
        return ret
    }
});

const User = mongoose.model('User', newSchema);
module.exports = User;