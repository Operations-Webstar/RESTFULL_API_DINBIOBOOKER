const mongoose = require('mongoose');

const showingSchema = mongoose.Schema({
    film: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film',
        required: true
    },
    datetime: {
        type: Date,
        required: true,
    },
    hall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cinemahall',
        required: true
    }

});

module.exports = mongoose.model('Showing', showingSchema);