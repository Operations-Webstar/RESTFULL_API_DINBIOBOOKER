const mongoose = require('mongoose');
Schema = mongoose.Schema

// Skema for hvordan showings lagres i databasen.
const showingSchema = new Schema({
    film: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film',
        required: true
    },
    dateTime: {
        type: String,
        required: true,
    },
    hall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cinemahall',
        required: true
    }

});

module.exports = mongoose.model('Showing', showingSchema);