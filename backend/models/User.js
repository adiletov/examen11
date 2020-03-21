const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nanoid = require('nanoid');


const Schema = mongoose.Schema;

const newSchema = new Schema({
    username: {
        type: String,
        required:  true,
        unique: true,
        validate: {
            validator: async function(value) {
                if (!this.isModified('username')) return;

                const user = await User.findOne({username: value});
                if(user) throw new Error();
            },
            message: 'This user is already registered'
        }
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required:  true
    },
    phoneNumber : {
        type: String,
        required:  true
    },
    token: {
        type: String,
        required: true
    }
});


newSchema.methods.generateToken = function () {
    this.token = nanoid();
};

newSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
});

newSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', newSchema);

module.exports = User;

