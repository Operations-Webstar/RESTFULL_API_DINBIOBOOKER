const express = require('express');
const router = express.Router();

//importer de forskellige controllers
const showingController = require('../controllers/showings');

//Opretter forskellige routes for showings
//router.get('/', showingController.Showing_get_all)

router.post('/', showingController.Showing_create_one)

router.post('/findAllForOneFilm', showingController.Showing_get_all_for_one_film)

router.get('/:showingId', showingController.Showing_get_one)

module.exports = router;