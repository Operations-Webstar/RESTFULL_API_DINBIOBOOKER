const mongoose = require('mongoose');
const Schema = mongoose.Schema

const cinemahallSchema = new Schema({
    hallName: {
        type: String,
        required: true,
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

module.exports = mongoose.model('Cinemahall', cinemahallSchema);