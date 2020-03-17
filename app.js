//henter pakker til brug
const express = require('express');
const app = new express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//henter mine routes
const filmRoutes = require('./api/routes/films');
const bookingRoutes = require('./api/routes/bookings');
const userRoutes = require('./api/routes/users');

mongoose.connect('mongodb+srv://Thumas:' + process.env.MONGO_ATLAS_PW + '@dinbiobooker-nwwz8.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser :true,
    useUnifiedTopology: true
});

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({})
    }
    next()
});

//Handler min routes, og de request de modtager.
app.use('/films', filmRoutes);
app.use('/bookings', bookingRoutes);
app.use('/users', userRoutes);

//en funktion der bruges til at samle de resterende request op, som ikke kunne blevet fikset tidligere i koden.
//denne bruges til at klare ikke fundet errors.
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error)
});

//denne funktion vil fange alle de errors som komemr igennem vores system.
//Denne samler alle errors op, så det kunne være errors, som ikke har noget med routes at gøre, men database osv.
app.use((error,req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

//exporter til brug i Server.js
module.exports = app;