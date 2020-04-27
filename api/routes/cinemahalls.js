const express = require('express');
const router = express.Router();

//importer de forskellige controllers
const CinemahallController = require('../controllers/cinemahalls');

router.get('/', CinemahallController.Cinemahall_get_all)

router.post('/', CinemahallController.Cinemahalls_create_one)

module.exports = router;