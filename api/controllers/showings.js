const Showing = require('../modules/showing');

exports.Showing_get_all = (req, res, next) => {
    Showing.find()
        .exec()
        .then(docs => {
            if(docs.length >= 0){
                res.status(200).json(docs)
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

exports.Showing_get_all_for_one_film = (req, res, next) => {
    Showing.find({filmName: req.body.film})
        .exec()
        .then(docs => {
            if(docs.length >= 0){
                res.status(200).json(docs)
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


exports.Showing_create_one = (req, res, next) => {
    const showing = new Showing({
        film: req.body.film,
        dateTime: req.body.dateTime,
        hall: req.body.hall,
    });
    showing
        //kalder save på det objekt jeg har lavet over, så den bliver gemt i min database.
        .save()
        //hvis at save
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /showing',
                createdCinemahall: {
                    hallName: result.hallName,
                    rows: result.rows,
                    columns: result.columns,
                    url: req.protocol + '://'+ req.headers.host + req.url + '/showings' + result._id
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