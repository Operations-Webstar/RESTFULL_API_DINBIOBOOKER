const Booking = require('../modules/booking');
const Film = require('../modules/film');

exports.bookings_get_all = (req, res, next) => {
    Booking.find()
        .populate('film', 'filmName')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                bookings: docs.map(doc => {
                    return{
                        film: doc.film,
                        date: doc.date,
                        url: req.protocol + '://'+ req.headers.host + req.url + 'bookings/' + doc._id
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error:err
            })
        });
};

exports.bookings_create_booking = (req, res, next) => {
    Film.findById(req.body.film)
        .then(film => {
            if(!film){
                return res.status(404).json({
                    message: "Film not found"
                })
            }
            const booking = new Booking({
                film: req.body.film,
                //seats: res.body.seats,
                date: req.body.date,
            });
            return booking
                .save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Booking received',
                info: req.protocol + '://'+ req.headers.host + req.url + 'bookings/' + result._id
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Booking not made",
                error:err
            })
        });
};

exports.bookings_get_one = (req, res, next) => {
    Booking.findById(req.params.bookingId)
        .populate('film')
        .exec()
        .then(booking => {
            if(!booking) {
                res.status(404).json({
                    message: "order not found"
                })
            }
            res.status(200).json({
                booking: booking
            })
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            })
        })
};

exports.bookings_delete_one = (req, res, next) => {
    Booking.deleteOne({_id: req.params.bookingId}).exec()
        .then(result => {
            res.status(201).json({
                message: 'Booking deleted',
                result: result
            })
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            })
        })
};