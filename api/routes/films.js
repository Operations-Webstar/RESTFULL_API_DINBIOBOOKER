const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const FilmController = require('../controllers/films');

router.get('/', FilmController.films_get_all);

router.post('/', FilmController.films_create_one);

router.get('/:filmId', FilmController.films_get_one);

router.patch('/:filmId', FilmController.films_update_one);

router.delete('/:filmId', FilmController.films_delete_one);


module.exports = router;