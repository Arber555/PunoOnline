const mongoose = require('mongoose');
const config = require('../config/database');

const KontrataVirtualeSchema = mongoose.Schema({
    data_pranimit: {
        type: Date,
        required: true
    },
    data_pranimit: {
        type: Date,
        required: true
    },
    projectID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
        required: false
    },
    ofertaID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'oferta',
        required: false
    }
});

const KontrataVirtuale = module.exports = mongoose.model('KontrataVirtuale', KontrataVirtualeSchema);