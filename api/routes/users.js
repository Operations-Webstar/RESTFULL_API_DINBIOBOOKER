const express = require('express');
const router = express.Router();


const UserController = require('../controllers/users');

router.get('/', UserController.get_all_users);

router.post("/signup", UserController.Users_create_one);

router.post('/findOne', UserController.Users_get_one);

router.post('/login', UserController.Users_login);

router.delete('/:userId', UserController.Users_delete_one);

router.patch('/:userId', UserController.Users_update_one);

module.exports = router;