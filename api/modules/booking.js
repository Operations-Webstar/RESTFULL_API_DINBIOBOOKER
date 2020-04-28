const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    film: { //TODO: lav om til showing
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film',
        required: true
    },
    //seats: { //TODO: LAv om til User
        //TO DO lav seatSchema
     //type: [seatScehma],
     //required: true
    //},

    date: { //TODO: lav om til seats
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Booking', bookingSchema);