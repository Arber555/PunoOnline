const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Profile = require('../models/profile');

//Register
router.post('/register', function(req, res, next){
    let newUser = new User({
        emri: req.body.emri,
        mbiemri: req.body.mbiemri,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        freelancer: req.body.freelancer,
        klient: req.body.klient,
        gjinia: req.body.gjinia,
        datalindjes: req.body.datalindjes,
        statusi: req.body.statusi
    });

     User.getUserByUsername(req.body.username, function(err, user){
        if(err){throw err;}
        //console.log(userID);
        if(user)
        {
            return res.json({success: false, msg: 'Ju keni profile'});
        }
        User.addUser(newUser, function(err, user){
            if(err){
                res.json({success: false, msg:'Ka ndodhur nje gabim!!!'});
            }
            else {
                res.json({success:true, msg: 'User registered'});
            }
        });
     });
});

//Authenticate
router.post('/authenticate', function(req, res, next){
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, function(err, user){
        if(err){ throw err;}

        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }
       
        User.comparePassword(password, user.password, function(err, isMatch){
             if(err){ throw err;}

             if(isMatch)
             {
                 const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                 });
                 res.json({
                     success: true,
                     token: 'JWT '+token,
                     user: {
                         id: user._id,
                         name: user.name,
                         username: user.username,
                         email: user.email
                     }
                 });
             }
             else {
                 return res.json({success: false, msg: 'Wrong password'});
             }
        });
    });
});

//Profile test osht
router.get('/profile', passport.authenticate('jwt', {session: false}), function(req, res, next){
    res.json({user: req.user});
});

//test me mar ni user permes ID
router.get('/:id', function(req, res, next){
    User.getUserById(req.params.id, function(err, user){
        res.json(user);
    })
});

router.put("/updateUser/:id", function(req, res, next){
    User.getUserById(req.params.id, function(err, user){
        if(err){ throw err; }

        if(!user){
            return res.json({success: false, msg: 'Wrong user'});
        }

        User.updateUser(req.params.id, req.body, function(err, updateUser){
            if(err){ throw err; }

            if(!updateUser){
                 return res.json({success: false, msg: 'ERROR updateUser'});
            }

            res.json({success: true, msg: 'User update'});
        });
    });
});

module.exports = router;