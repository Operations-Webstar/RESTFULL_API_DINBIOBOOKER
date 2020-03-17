const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    film: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film',
        required: true
    },
    //seats: {
        //TO DO lav seatSchema
     //type: [seatScehma],
     //required: true
    //},
    date: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Booking', bookingSchema);