const Showing = require('../modules/showing');
const Cinemahall = require('../modules/cinemahall')
const Film = require('../modules/film')
//TODO: Mangler måske at showing fylder alt den tid som den tager.
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
        Showing.find({film: req.body.filmId})
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
                        } else {
                            Showing.find().then(result => {
                                for(let i = 0; 0 < result.length; i++){
                                    if(result[i].dateTime == req.body.dateTime && result[i].hall == req.body.hall){
                                        return res.status(404).json({
                                            message: 'Showing for this hall and time already exist'
                                        })
                                    } else{
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
                                    }
                                }
                            })
                        }
                    })
            }
            })
}
