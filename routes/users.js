const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

var nodemailer = require("nodemailer");
var app = express();

var smtpTransport = require('nodemailer-smtp-transport');
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "punoonlineemail@gmail.com",
        pass: "PunoOnline123"
    }
});
var rand,mailOptions,host,link;
/*------------------SMTP Over-----------------------------*/




//Register
router.post('/register', function(req, res, next)
{

    let newUser = new User({
        emri: req.body.emri,
        mbiemri: req.body.mbiemri,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        freelancer: req.body.freelancer,
        klient: req.body.klient,
        gjinia: req.body.gjinia,
        datalindjes: req.body.datalindjes
    });

     User.getUserByUsername(req.body.username, function(err, user){
        if(err){throw err;}
        //console.log(userID);
        if(user)
        {
            return res.json({success: false, msg: 'Ky username ekziston.'});
        }
        User.addUser(newUser, function(err, user){
            if(err){
                res.json({success: false, msg:'Failed to register user!'});
            }
            else 
            {
                host = req.get('host');
                rand = newUser.id;
                link="http://"+req.get('host')+"/users/verify/"+newUser.id;
                mailOptions ={
                    to : newUser.email,
                    subject : "Please confirm your Email account",
                    text : "Click here to verify: "+link 
                }
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error)
                    {
                        res.end("error");
                    }else
                    {
                        res.end("sent");
                    }
                });

                res.json({success:true, msg: 'User registered. Please check your email for activation link.'});
            }
        });
     });
});

router.get('/verify/:id',function(req,res)
{
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.params.id==rand)
        {
            User.getUserById(rand, function(err, user){
                if(err)
                    throw err;
                else if(!user)
                    return res.json({success: false, msg: 'Ky user nuk ekziston.'});
                else
                {
                    user.active = true;
                    User.updateUser(req.params.id, user, function(err, updateUser)
                    {
                        if(err){ throw err; }

                        if(!updateUser){
                            return res.json({success: false, msg: 'ERROR updateUser'});
                        }

                        res.json({success: true, msg: 'User update'});
                    });
                    res.end("Email "+mailOptions.to+" is been Successfully verified");
                }
            })
        }
        else
        {
            res.end("Bad Request");
        }
    }
    else
    {
        res.end("Request is from unknown source");
    }
});


router.get('/changePass/:email', function(req,res)
{
    User.getUserByEmail(req.params.email, function(err, user){
        if(err)
            throw err;
        else if (!user)
            res.json({success: false, msg: 'Useri me kete email nuk ekziston.'});
        else
        {
            host = req.get('host');
            rand = user.id;
            link="http://"+req.get('host')+"/users/cahngePass/"+user.id;  // Qetu vjen URL per qe tqon te page per me ndru passin
            mailOptions ={
                to : newUser.email,
                subject : "Please change your password.",
                text : "Click here to change password: "+link 
            }
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error)
                {
                    res.end("error");
                }else
                {
                    res.end("sent");
                }
            });
        }
    })    
});

router.put("/updatePassUser/:id", function(req, res, next){
    User.getUserById(req.params.id, function(err, user){
        if(err){ throw err; }

        if(!user){
            return res.json({success: false, msg: 'Wrong user'});
        }

        user.password = bcrypt.hashSync(req.body.password); 

        User.updateUser(req.params.id, user, function(err, updateUser){
            if(err){ throw err; }

            if(!updateUser){
                 return res.json({success: false, msg: 'ERROR updateUser'});
            }

            res.json({success: true, msg: 'User pass update'});
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

router.get('/getUserByEmail/:email', function(req, res, next){
    User.getUserByEmail(req.params.email, function(err, user){
        if(err)
            throw err;
        else if (!user)
            res.json({success: false, msg: 'Useri me kete email nuk ekziston.'});
        else
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

/*router.get("/resertUsernameByEmail/:email", function(req, res, next)
{
    User.resetUsernameByEmail(req.params.email, function(err, user)
    {
        if(err)
        {
            res.json({success: false, message: err});
        }
        else
        {
            if(!user)
            {
                res.json({success: false, message: "email not found."});
            }
            else
            {
                //if user successfully saved to database, create email objekt
                var email = 
                {
                    form: 'Localhost Staff, staff@localhost.com',
                    to: user.email,
                    subject: 'Localhost Activation Link Request',
                    text: 'Hello ' + user.emri + ', You recently requested a new account activation link. Please clock on the followinig link to complete your action:  http://localhost:8080/activate/'+  
                };


                res.json({success: true, message: 'Username has been sent to email.'});
            }
        }
    });
});*/

module.exports = router;