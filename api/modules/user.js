const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

// Skema for hvordan users lagres i databasen.
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

//bruger uniquevalidator, så unique:true faktisk gør at væriden er unik i databasen.
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);