const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Profession = require('../models/profession');

//create Profession
router.post('/create', function(req, res, next){
    let newProfession = new Profession ({
        name: req.body.name
    });

    Profession.addProfession(newProfession, function(err, profession){
        if(err){
            res.json({success: false, msg: 'Failed to create profession'});
        }
        else {
            res.json({success: true, msg: 'Profession create'});
        }
    });
});

module.exports = router;