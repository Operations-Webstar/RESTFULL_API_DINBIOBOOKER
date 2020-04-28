const mongoose = require('mongoose');

const showingSchema = mongoose.Schema({
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