const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Oferta = require('../models/oferta');
const Project = require('../models/project');
const User = require('../models/user');

//create Oferta
router.post('/create',  passport.authenticate('jwt', {session: false}), function(req, res, next){

    let OfertaRe = new Oferta(req.body);
    const userID = req.body.userID;
    const projectID = req.body.projectID;
    const shuma_double = req.body.shuma;

    User.getUserById(userID, function(err, user)
    {
        if(err) throw err;

        if(!user)
        {
            return res.json({success: false, msg: 'Ky user nuk ekziston.'});
        }

        Project.getProjectById(projectID, function(err, project)
        {
            if(err) throw err;

            if(!project)
            {
                return res.json({success: false, msg: 'Ky project nuk ekziston.'});
            }

            if(shuma_double < 0)
            {
                return res.json({success: false, msg: 'Nuk bon me jep shume negative'});
            }

            // SPo bon me testu a ekziston a jo qaj vlersim i qati useri ne qat projekt
            Oferta.getOfertaByUserIDAndProjectID(userID, projectID, function(err, oferta)
            {
                if(err) throw err;

                if(oferta)
                {
                    return res.json({success: false, msg: 'Oferta i keti useri ne kete projekt ekziston.'});
                }
                else
                {
                    Oferta.addOferta(OfertaRe, function(err, oferta)
                    {
                        if(err) throw err;
                        else
                        {
                            res.json({success: true, msg: 'Oferta created'});
                        }
                    });
                }
            });
        });
    });
});

router.get('/getOfertaByUserIDAndProjectID/:userid/:projectid', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Oferta.getOfertaByUserIDAndProjectID(req.params.userid, req.params.projectid, function(err, oferta)
    {
        res.json(oferta);
    });
});

//Remove Oferta
router.delete('/removeOferta/:id', passport.authenticate('jwt', {session: false}), function(req, res, next)
{
    const ofertaID = req.params.id;
    
    Oferta.removeOferta(ofertaID, function(err, oferta){
        if(err){
            throw err;
        }
        else {
            res.json({success: true, msg:'oferta deleted'});
        }
    });
});


//Modifiko Oferten
router.put('/updateOferta/:id', passport.authenticate('jwt', {session: false}), function(req, res, next)
{
    const ofertaID = req.params.id;
    const newOferta = req.body;

    const userID = newOferta.userID;
    const projectID = newOferta.projectID;
    
    Oferta.getOfertaById(ofertaID, function(err, oferta)
    {
        if(err) throw err;

        if(!oferta)
        {
            return res.json({success: false, msg: 'Kjo ofert nuk ekziston.'});
        }

        User.getUserById(userID, function(err, user)
        {
            if(err) throw err;

            if(!user)
            {
                return res.json({success: false, msg: 'Ky user nuk ekziston.'});
            }

            Project.getProjectById(projectID, function(err, project)
            {
                if(err) throw err;

                if(!project)
                {
                    return res.json({success: false, msg: 'Ky project nuk ekziston.'});
                }

                //Ndoshta ska pas nevoj edhe per qet check po pe lo :p
                Oferta.getOfertaByUserIDAndProjectID(userID, projectID, function(err, oferta)
                {

                    if(err) throw err;

                    if(!oferta)
                    {
                        return res.json({success: false, msg: 'Ky vlersim nuk ekziston me kete userid edhe projectid.'});
                    }

                    Oferta.updateOferta(ofertaID, newOferta, function(err, newOferta)
                    {
                        if(err)
                        {
                            res.json(err);
                            res.json({success: false, msg:'Failed to update oferta!'});
                        }
                        else 
                        {
                            res.json({success: true, msg:'Oferta updated'});
                        }
                    });
                });
            });
        });
    });
});


module.exports = router;