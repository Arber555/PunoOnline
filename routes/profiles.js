const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
//const User = require('../models/user');
const Profile = require('../models/profile');
const Profession = require('../models/profession');
const Portfolio = require('../models/portfolio');
//Middleware per file/foto
//const multer = require('multer');
//var upload = multer({dest: '../public/profilePhotos/'});
const fs = require('fs');
const randomString = require('randomstring');

//rendom String base64
function base64Random(fileName)
{
    //return Buffer.from(fileName, 'base64');
    new Buffer(fileName, 'base64').toString("utf8");
}

// me encodu file/foto ne base64
function base64_encode(file) {
    // i lexon te dhenat ne menyr binare
    var bitmap = fs.readFileSync(file);
    // i converton te dhenat binare ne base64 encoded string
    return new Buffer(bitmap).toString('base64');
}


// me decodu base64 ne file
function base64_decode(base64str, file) {
    // krijon ni buffer object me base64
    var bitmap = new Buffer(base64str, 'base64');
    // e shkrun bufferin ne file
    fs.writeFileSync('./public/profilePhotos/'+file+".jpg", bitmap);
}


//create Profile
router.post('/create',  passport.authenticate('jwt', {session: false}), function(req, res, next){
    const professionName = req.body.profesioni;
    const userID = req.body.userID;

    Profile.getProfileByUserId(userID, function(err, userID){
        if(err){throw err;}
        //console.log(userID);
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
            //console.log(req.body.foto_name);
            //const file = req.body.foto_name;
            // base64_decode(file.file, 'copy.jpg');
           
            //console.log(randomFileName); //jepja qet emer random te filename (name) edhe ruje

           // return;  //qetu e kom lon vazhdo neser me rujt pathin mongodb edhe mi testu tonat menyrat 
           var newProfile;

            //foto
            if(req.body.foto_name)
            {
                const file = req.body.foto_name;
                
                const randomFileName = randomString.generate({
                    length: 20,
                    charset: 'alphabetic'
                });

                //e run foton ne follderin profilePhotos
                base64_decode(file.file, randomFileName);

                const fotoPath = "./public/profilePhotos/"+randomFileName+".jpg";

                newProfile = new Profile({
                    profesioni: profession.id,
                    telefoni: req.body.telefoni,
                    foto_name: fotoPath,
                    ora: req.body.ora,
                    edukimi: req.body.edukimi,
                    mesatarja_vlersimit: req.body.mesatarja_vlersimit,
                    pershkrimi: req.body.pershkrimi,
                    shteti: req.body.shteti,
                    qyteti: req.body.qyteti,
                    adresa: req.body.adresa,
                    userID: req.body.userID
                });
            }
            else {
                newProfile = new Profile({
                    profesioni: profession.id,
                    telefoni: req.body.telefoni,
                    foto_name: "./public/profilePhotos/default.jpg",
                    ora: req.body.ora,
                    edukimi: req.body.edukimi,
                    mesatarja_vlersimit: req.body.mesatarja_vlersimit,
                    pershkrimi: req.body.pershkrimi,
                    shteti: req.body.shteti,
                    qyteti: req.body.qyteti,
                    adresa: req.body.adresa,
                    userID: req.body.userID
                });
            }

            

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