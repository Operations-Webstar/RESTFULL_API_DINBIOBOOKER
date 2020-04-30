const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    tlfNumber: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
    }
});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);