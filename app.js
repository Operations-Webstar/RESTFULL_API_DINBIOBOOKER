//henter pakker til brug
const express = require('express');
const app = new express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
//Mongoose er et libary, der giver en masse måde at
const mongoose = require('mongoose');

//henter mine routes
const filmRoutes = require('./api/routes/films');
const bookingRoutes = require('./api/routes/bookings');
const userRoutes = require('./api/routes/users');
const cinemahallRoutes = require('./api/routes/cinemahalls');
const showingRoutes = require('./api/routes/showings');

mongoose.connect('mongodb+srv://Thumas:' + process.env.MONGO_ATLAS_PW + '@dinbiobooker-nwwz8.mongodb.net/test?retryWrites=true&w=majority', {
    //sættes fordi https://mongoosejs.com/docs/deprecations.html siger det.
    useNewUrlParser :true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

//Middleware
//morgan bliver brugt, så den laver status koder, til vores api, og viser de evt fejl der er.
app.use(morgan('dev'));
//bodyparser, gør at req.body er til at få fat i, og .json, gør at det kun er den der bliver taget imod
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//sætter headers, så at det respons, jeg sender tilbage, har de rigtige headers, og der ikke opstår en cors error.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    if(req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', '*');
    }
    next()
});


//Handler min routes, og de request de modtager.
app.use('/films', filmRoutes);
app.use('/bookings', bookingRoutes);
app.use('/users', userRoutes);
app.use('/cinemahalls', cinemahallRoutes);
app.use('/showings', showingRoutes);

//en funktion der bruges til at samle de resterende request op, som ikke kunne blevet fikset tidligere i koden.
//denne bruges til at klare ikke fundet errors.
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error)
});

//denne funktion vil fange alle de errors som komemr igennem vores system.
//Denne samler alle errors op, så det kunne være errors, som ikke har noget med routes at gøre, men database osv.
/*app.use((error,req, res, next) => {
    res.status(error.status || 500).json({error: error.message});
 next()
});*/

//exporter til brug i Server.js
module.exports = app;