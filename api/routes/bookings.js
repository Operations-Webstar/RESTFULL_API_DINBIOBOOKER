const express = require('express');
const router = express.Router();

//importer de forskellige controllers
const BookingsController = require('../controllers/bookings');

router.get('/', BookingsController.bookings_get_all);

router.post('/', BookingsController.bookings_create_booking);

router.get('/:bookingId', BookingsController.bookings_get_one);

router.delete('/:bookingId', BookingsController.bookings_delete_one);


module.exports = router;