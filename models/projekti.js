const mongoose = require('mongoose');
const config = require('../config/database');

//Projekti Schema
const ProjektiSchema = mongoose.Schema({
    emri_projektit: 
    {
        type: String,
        required: true
    },
    pershkrimi_projektit: 
    {
        type: String,
        required: true,
    },
    buxheti_projektit: 
    {
        type: Number,
       required: true
    },
    koha_projektit: 
    {
        type: Date //koha qe nevojitet per me kry ni prijekt
    },
    menyra_pageses: 
    {
        lloji_pageses:  
        {  // lloji pageses mundet me kon me ore, me dit, me jave, me muaj apo i tere projektit (fiks)
            name: String,
            required: true
        }
    },
    kategoria: 
    {
        type: Mongoose.Schema.Types.ObjectId, ref:'Kategoria'
    },
    user:
    [{
        type: Mongoose.Schema.Types.ObjectId, ref:'User'
    }]

});

const Projekti = module.exports = mongoose.model('Projekti', ProjektiSchema);