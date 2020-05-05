const mongoose = require('mongoose');
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

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

cinemahallSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Cinemahall', cinemahallSchema);