const mongoose = require('mongoose');

const filmSchema = mongoose.Schema({
    filmName: {
        type: String,
        required: true,
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

module.exports = mongoose.model('Film', filmSchema);