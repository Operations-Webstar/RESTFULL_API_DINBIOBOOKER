const Showing = require('../modules/showing');
const Cinemahall = require('../modules/cinemahall')
const Film = require('../modules/film')
//TODO: sørge for at der ikke kan være to showings med samme sal samme tid og dag
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
    Film.findById(req.body.film)
        .then(film => {
            if(!film){
                return res.status(404).json({
                    message: "Film not found"
                })
            } else {
                Cinemahall.findById(req.body.hall)
                    .then(cinemahall => {
                        if(!cinemahall){
                            return res.status(404).json({
                                message: 'Cinemahall not found '
                            })
                        }

                     const showing = new Showing({
                         film: req.body.film,
                         dateTime: req.body.dateTime,
                         hall: req.body.hall
                     })
                        return showing.save()
                            .then(result => {
                                res.status(201).json({
                                    userCreated: result
                                })
                            }).catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    })
            }
            })
}
