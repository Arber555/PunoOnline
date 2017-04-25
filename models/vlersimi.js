const mongoose = require('mongoose');
const config = require('../config/database');

//Lidhje shume me shume me userin ---
const VlersimiSchema = mongoose.Schema({
    vlersimi: {
        type: double,
        required: true
    }
});

const Vlersimi = module.exports = mongoose.model('Vlersimi', VlersimiSchema);