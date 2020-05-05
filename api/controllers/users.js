const User = require('../modules/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Henter alle users
exports.get_all_users =  (req, res, next) => {
    User.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                //mapper docs, så jeg kun sender den relevante info, jeg skal bruge.
                products: docs.map(doc => {
                    const info = {
                        type: 'GET',
                        url: req.protocol + '://'+ req.headers.host + req.url + 'users/' + doc._id,
                    };
                    return {
                        tlfNumber: doc.tlfNumber,
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

//Henter én user
exports.Users_get_one = (req, res, next) => {
    console.log(req.body.tlfNumber);
    User.findOne({tlfNumber: req.body.tlfNumber})
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

// Opretter en bruger
exports.Users_create_one = (req, res, next) => {
    User.find({tlfNumber: req.body.tlfNumber})
        .exec()
        .then(user => {
            if(user.length >= 1){
                return res.status(409).json({
                    message: "telephone already in database"
                })
            } else{
                bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        if (err) {
                            return res.status(500).json({
                                error: err,
                            })
                        } else {
                            const user = new User({
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                tlfNumber: req.body.tlfNumber,
                                dateOfBirth: req.body.dateOfBirth,
                                password: hash,
                                userType: 'standard'
                            });
                            user
                                .save()
                                .then(result => {
                                    res.status(201).json({
                                        message: 'Handling POST requests to /users',
                                        createdUser: {
                                            firstName: result.firstName,
                                            lastName: result.lastName,
                                            tlfNumber: result.tlfNumber,
                                            dateOfBirth: result.dateOfBirth,
                                            password: result.password,
                                        }
                                    })
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({
                                        error: err
                                    })
                                });
                        }
                    })
                })
            }
        })
};

//Login af en bruger
exports.Users_login = (req, res, next) => {
    User.find({tlfNumber: req.body.tlfNumber})
        .exec()
        .then( user => {
            if(user.length < 1){
                return res.status(401).json({
                    message: "Auth failed"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(result){
                    const token = jwt.sign({
                            tlfNumber: user[0].tlfNumber,
                            userId: user[0]._id,
                        }, process.env.JWT_KEY,
                        {
                            expiresIn: "1hour"
                        });
                    return res.status(200).json({
                        userId: user[0]._id,
                        userType: user[0].userType,
                        dateOfBirth: user[0].dateOfBirth,
                        firstName: user[0].firstName,
                        lastName: user[0].lastName,
                        tlfNumber: user[0].tlfNumber,
                        message: "Auth succes",
                        token: token
                    })
                } else {
                    return res.status(401).json({
                        message: "Auth failed"
                    })
                }
            } )
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};

// Sletter en bruger
exports.Users_delete_one = (req, res, next) => {
    const id =  req.params.userId;
    User.deleteOne({_id: id})
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
// Opdater en user.
//TODO: dette endpoint kunne også godt blive brugt til at opdaterer en user.
exports.Users_update_one = (req, res, next) => {
    const id =  req.params.userId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    User.updateOne({_id: id}, {$set: updateOps})
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