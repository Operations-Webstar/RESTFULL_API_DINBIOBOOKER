const CinemaHall = require('../modules/cinemahall');

// Alle cinemahalls hentes
exports.Cinemahall_get_all = (req, res, next) => {
    CinemaHall.find()
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

// Oprettelsen af en cinemahall, bliver ikke brugt i selve programmet, men brugt til at lave cinemahalls i databasen.
exports.Cinemahalls_create_one = (req, res, next) => {
    const cinemaHall = new CinemaHall({
        hallName: req.body.hallName,
        rows: req.body.rows,
        columns: req.body.columns,
    });
    cinemaHall
        //kalder save på det objekt jeg har lavet over, så den bliver gemt i databasen.
        .save()
        //hvis at save
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /cinemahalls',
                createdCinemahall: {
                    hallName: result.hallName,
                    rows: result.rows,
                    columns: result.columns,
                    url: req.protocol + '://'+ req.headers.host + req.url + '/cinemahalls' + result._id
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

// En cinemahall hentes
exports.Cinemahall_get_one = (req, res, next) => {
    console.log(req.params.hallId)
        CinemaHall.findById(req.params.hallId)
        .then(doc => {
            if(doc){
                res.status(200).json(doc)
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