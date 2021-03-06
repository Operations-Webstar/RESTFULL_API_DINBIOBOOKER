const mongoose = require('mongoose');
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

// Skema for hvordan cinemahalls lagres i databasen.
const cinemahallSchema = new Schema({
    hallName: {
        type: String,
        required: true,
        unique:true
    },
    rows: {
        type: String,
        required: true,
    },
    columns: {
        type: String,
        required: true,
    }
});

//bruger uniquevalidator, så unique:true faktisk gør at væriden er unik i databasen.
cinemahallSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Cinemahall', cinemahallSchema);