const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
//const User = require('../models/user');
const Profile = require('../models/profile');
const Profession = require('../models/profession');
const Portfolio = require('../models/portfolio');

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

        Profession.getProfessionByName(professionName, function(err, profession){
            if(err){ throw err;}

            if(!profession)
            {
                return res.json({success: false, msg: 'Zgjidh profesionin'});
            }

            let newProfile = new Profile({
                profesioni: profession.id,
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

//update profile
router.put('/:id', function(req, res, next){  //duhet me kqyr per validim mi tregu gipes me bo front end
    const profileID = req.params.id;
    const profile = req.body;
    const professionName = req.body.profesioni;
    
    /*const portfolio = req.body.portfolio;
    if(portfolio) //update nese ka portfolio
    {
        let newPortfolio = new Portfolio(req.body.portfolio);
        for(var port in newPortfolio)
        {

        }
        Portfolio.addPortfolio(newPortfolio, function(err, portfolio){ // nese ki 2 ose ma shum qysh don mi shti?????
            if(err){
                 throw err;
            }

            if(!portfolio)
            {
                return res.json({success: false, msg: 'Portfolio gabim'});
            }
            
             Profession.getProfessionByName(professionName, function(err, profession){
                if(err){
                    throw err;
                }

                if(!profession){
                    return res.json({success: false, msg: 'Zgjidh profesionin'});
                }

                profile.profesioni = profession.id;
                profile.portfolioID = portfolio.id;
                Profile.updateProfile(profileID, profile, function(err, profile){
                    if(err){
                        res.json(err);
                        res.json({success: false, msg:'Failed to update profile!'});
                    }
                    else {
                        res.json({success: true, msg:'Profile update'});
                    }
                });
            });
        });
    }
    else
    {*/
    Profession.getProfessionByName(professionName, function(err, profession){
        if(err){
            throw err;
        }

        if(!profession){
            return res.json({success: false, msg: 'Zgjidh profesionin'});
        }

        profile.profesioni = profession.id;
        Profile.updateProfile(profileID, profile, function(err, profile){
            if(err){
                res.json(err);
                res.json({success: false, msg:'Failed to update profile!'});
            }
            else {
                res.json({success: true, msg:'Profile update'});
            }
        });
    });
});

module.exports = router;