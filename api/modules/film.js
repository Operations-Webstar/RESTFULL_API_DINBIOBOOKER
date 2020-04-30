const mongoose = require('mongoose');
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const filmSchema = new Schema({
    filmName: {
        type: String,
        required: true,
        unique: true
    },
    genre: {
        type: String,
        required: true,
    },
    filmLength: {
        type: Number,
        required: true,
    },
    ageRestriction: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

filmSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Film', filmSchema);