const mongoose = require('mongoose');
const config = require('../config/database');

// TESSST
const PagesaSchema = mongoose.Schema({
    shuma: 
    {
        type: double,
        required: true
    },

    profile_ID : 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile',
        required: false
    }
});