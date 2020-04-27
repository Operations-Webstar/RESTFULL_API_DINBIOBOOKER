const express = require('express');
const router = express.Router();

//importer de forskellige controllers
const showingController = require('../controllers/cinemahalls');

router.get('/', showingController.Cinemahall_get_all)

router.post('/', showingController.Cinemahalls_create_one)

module.exports = router;