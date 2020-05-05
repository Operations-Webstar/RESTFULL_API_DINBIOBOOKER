const express = require('express');
const router = express.Router();

//importerer de forskellige controllers
const BookingsController = require('../controllers/bookings');

//Opretter forskellige routes for bookings

router.get('/', BookingsController.bookings_get_all);

router.post('/', BookingsController.Booking_create_one);

router.get('/:showingId', BookingsController.bookings_get_all_seats_for_one_showing);

router.delete('/:bookingId', BookingsController.bookings_delete_one);

router.get('/find/:userId', BookingsController.bookings_get_all_for_one_user);

module.exports = router;