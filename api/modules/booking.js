const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Skema for hvordan bookings lagres i databasen.
const bookingSchema = new Schema({
    showing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Showing',
        required: true
    },
    seats: {
     type: Array,
     required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

module.exports = mongoose.model('Booking', bookingSchema);