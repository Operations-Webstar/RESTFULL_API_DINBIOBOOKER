const express = require('express');
const router = express.Router();

//importer de forskellige controllers
const CinemahallsController = require('../controllers/cinemahalls');

router.get('/', CinemahallsController.Cinemahall_get_all)

router.post('/', CinemahallsController.Cinemahalls_create_one)

module.exports = router;