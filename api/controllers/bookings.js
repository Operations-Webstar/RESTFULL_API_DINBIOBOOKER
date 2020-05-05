const Booking = require('../modules/booking');
const Showing = require('../modules/showing');
const User = require('../modules/user')

//finder alle bookinger
/*exports.bookings_get_all = (req, res, next) => {
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
};*/

// Når der laves en booking
exports.Booking_create_one = (req, res, next) => {
    //findes først en showing
    Showing.findById(req.body.showing)
        .then(showing => {
            if(!showing){
                return res.status(404).json({
                    message: "Showing not found"
                })
            } else {
                //finder derefter en user
                User.findById(req.body.user)
                    .then(user => {
                        if(!user){
                            return res.status(404).json({
                                message: 'User not found '
                            })
                        }
                        //laver der efter booking med modellen
                        const booking = new Booking({
                            showing: req.body.showing,
                            seats: req.body.seats,
                            user: req.body.user
                        })
                        //laver en booking.save, for at putte i database.
                        return booking.save()
                            .then(result => {
                                res.status(201).json({
                                    bookingCreated: result
                                })
                            }).catch(err => {
                                res.status(500).json({
                                    message: 'booking not made',
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

//bruges til at slette en booking
exports.bookings_delete_one = (req, res, next) => {
    const id = req.params.bookingId
    Booking.deleteOne({_id: id})
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
    Booking.find({user: req.params.userId})
        //bruger populate, så informationen bliver hentet fra de forskellige object id'er
        .populate('showing')
        .populate('user')
        .exec()
        .then(bookings => {
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