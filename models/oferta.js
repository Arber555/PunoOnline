const mongoose = require('mongoose');
const config = require('../config/database');

const OfertaSchema = mongoose.Schema({
    shuma: {
        type: double,
        required: true
    },
    pershkrimi: {
        type: string,
        required: true
    },
    projectID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
        required: false
    },
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false
    }
});

const Oferta = module.exports = mongoose.model('Oferta', OfertaSchema);