const Film = require('../modules/film');

exports.films_get_all = (req, res, next) => {
    Film.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                //mapper docs, så jeg kun sender den relevante info, jeg skal bruge.
                products: docs.map(doc => {
                    const info = {
                        type: 'GET',
                        url: req.protocol + '://'+ req.headers.host + req.url + 'films/' + doc._id,
                    };
                    return {
                        filmName: doc.filmName,
                        genre: doc.genre,
                        description: doc.description,
                        filmLength: doc.filmLength,
                        ageRestriction: doc.ageRestriction,
                        url: info.url
                    }
                })
            };
            if(docs.length >= 0){
                res.status(200).json(response)
            } else {
                res.status(404).json({
                    message: 'no entries found'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

exports.films_create_one = (req, res, next) => {
    const film = new Film({
        filmName: req.body.filmName,
        genre: req.body.genre,
        filmLength: req.body.filmLength,
        ageRestriction: req.body.ageRestriction,
        description: req.body.description,
    });
    film
        //kalder save på det objekt jeg har lavet over, så den bliver gemt i min database.
        .save()
        //hvis at save
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /films',
                createdFilm: {
                    name: result.filmName,
                    genre: result.genre,
                    Length: result.filmLength,
                    ageRestriction: result.ageRestriction,
                    description: result.description,
                    url: req.protocol + '://'+ req.headers.host + req.url + 'films/' + result._id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

exports.films_get_one = (req, res, next) => {
    Film.findById(req.params.filmId)
        //exec gør at find by id, bliver et promise
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({message: "not found"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
};

/*exports.films_update_one = (req, res, next) => {
    const id =  req.params.filmId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Film.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};*/

exports.films_delete_one = (req, res, next) => {
    const id =  req.params.filmId;
    Film.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};