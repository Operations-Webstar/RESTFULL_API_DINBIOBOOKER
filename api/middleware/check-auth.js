/*const jwt= require('jsonwebtoken');
//TODO: Kan laves skulle man lyste.
module.exports = (req,res, next) => {
    try{
        const decoded = jwt.verify(req.body.token, process.env.JW_KEY);
        req.userData = decoded;
        next();
    } catch (e) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
};*/