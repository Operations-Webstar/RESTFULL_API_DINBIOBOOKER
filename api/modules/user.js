const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
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



module.exports = mongoose.model('User', userSchema);