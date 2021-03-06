const Showing = require('../modules/showing');
const Cinemahall = require('../modules/cinemahall')
const Film = require('../modules/film')

// Henter alle showings
/*
exports.Showing_get_all = (req, res, next) => {
    Showing.find()
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
};*/
// Henter alle showings for en film
exports.Showing_get_all_for_one_film = (req, res, next) => {
        Showing.find({film: req.body.filmId})
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

// Oprettelse af showing
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
                                for(let i = 0; i < result.length; i++){
                                    if(result[i].dateTime == req.body.dateTime && result[i].hall == req.body.hall){
                                        return res.status(404).json({
                                            message: 'Showing for this hall and time already exist'
                                        })
                                    }}
                                let myDate = new Date(req.body.dateTime)
                                if(new Date() >= myDate){
                                    return res.status(404).json({
                                        message: 'Showing cannot be in the past'
                                    })
                                }{
                                        const showing = new Showing({
                                            film: req.body.film,
                                            dateTime: req.body.dateTime,
                                            hall: req.body.hall
                                        })
                                        return showing.save()
                                            .then(result => {
                                                res.status(201).json({
                                                    showingCreated: result
                                                })
                                            }).catch(err => {
                                                res.status(500).json({
                                                    error: err
                                                })
                                            })
                                    }
                            })
                        }
                    })
            }
            })
}

// Henter en showing
exports.Showing_get_one = (req, res, next) => {
    Showing.findById(req.params.showingId)
        .populate('film')
        .populate('hall')
        .then(showings => {
            console.log(showings)
            if(!showings) {
                res.status(404).json({
                    message: "order not found"
                })
            }
            res.status(200).json({
                showing: showings
            })
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            })
        })
};
