const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
//const User = require('../models/user');
const Profile = require('../models/profile');
const Profession = require('../models/profession');


//create Profile
router.post('/create',  passport.authenticate('jwt', {session: false}), function(req, res, next){
    const professionName = req.body.profesioni;
    const userID = req.body.userID;

    Profile.getProfileByUserId(userID, function(err, userID){
        if(err){throw err;}
        console.log(userID);
        if(userID)
        {
            return res.json({success: false, msg: 'Ju keni profile'});
        }

        Profession.getProfessionByName(professionName, function(err, profesioni){
            if(err){ throw err;}

            if(!Profession)
            {
                return res.json({success: false, msg: 'Zgjidh profesionin'});
            }

            let newProfile = new Profile({
                profesioni: profesioni.id,
                telefoni: req.body.telefoni,
                foto_name: req.body.foto_name,
                ora: req.body.ora,
                edukimi: req.body.edukimi,
                mesatarja_vlersimit: req.body.mesatarja_vlersimit,
                pershkrimi: req.body.pershkrimi,
                userID: req.body.userID
            });

            Profile.addProfile(newProfile, function(err, profile){
                if(err){
                    res.json({success: false, msg:'Failed to create profile!'});
                }
                else{
                    res.json({success:true, msg: 'Profile create'});
                }
            });
        });
    });    
});

//get profile
router.get('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Profile.getProfileById(req.params.id, function(err, profile){
        res.json(profile);
    });
});

module.exports = router;