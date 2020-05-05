const Booking = require('../modules/booking');
const Showing = require('../modules/showing');
const User = require('../modules/user')

//finder alle bookinger
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

/*exports.bookings_create_booking = (req, res, next) => {
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
};*/
// Når der laves en booking
exports.Booking_create_one = (req, res, next) => {
    console.log(req.body)
    Showing.findById(req.body.showing)
        .then(showing => {
            if(!showing){
                return res.status(404).json({
                    message: "Showing not found"
                })
            } else {
                User.findById(req.body.user)
                    .then(user => {
                        if(!user){
                            return res.status(404).json({
                                message: 'User not found '
                            })
                        }
                        const booking = new Booking({
                            showing: req.body.showing,
                            seats: req.body.seats,
                            user: req.body.user
                        })
                        return booking.save()
                            .then(result => {
                                res.status(201).json({
                                    bookingCreated: result
                                })
                            }).catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    })
            }
        })
}
// Alle sæder til en showing hentes
exports.bookings_get_all_seats_for_one_showing = (req, res, next) => {
    Booking.find({showing: req.params.showingId})
        .exec()
        .then(bookings => {
            if(!bookings) {
                res.status(404).json({
                    message: "order not found"
                })
            }
            const response = {
               products: bookings.map(booking => {
                   return {seats: booking.seats}
                })

            }
            res.status(200).json({
                booking: response
            })
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            })
        })
};

//TODO: Skal nedenstående have en knap således at det bliver muligt eller fjernes?
exports.bookings_delete_one = (req, res, next) => {
    Booking.deleteOne({_id: req.params.bookingId})
        .exec()
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

// Alle bookinger for en bruger hentes
exports.bookings_get_all_for_one_user = (req, res, next) => {
    console.log(req.params.userId)
    Booking.find({user: req.params.userId})
        .populate('showing')
        .populate('user')
        .exec()
        .then(bookings => {
            console.log(bookings)
            if(!bookings) {
                res.status(404).json({
                    message: "order not found"
                })
            }
            res.status(200).json({
                booking: bookings
            })
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            })
        })
};