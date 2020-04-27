const express = require('express');
const router = express.Router();

//importer de forskellige controllers
const showingController = require('../controllers/showings');

router.get('/', showingController.Showing_get_all)

router.post('/', showingController.Showing_create_one)

module.exports = router;