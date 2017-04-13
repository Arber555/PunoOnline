const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
        type: double,
        required: true
    },
    koha_projektit: 
    {
        type: int //koha qe nevojitet per me kry ni prijekt
    },
    menyra_pageses: 
    {
        lloji_pageses:  
        {  // lloji pageses mundet me kon me ore, me dit, me jave, me muaj apo i tere projektit (fiks)
            name: string,
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

const User = module.exports = mongoose.model('User', UserSchema);
