const jwt= require('jsonwebtoken');
//TODO: enten kommenter ud eller lav færdig
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
};