const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const KontratatVirtuale = require('../models/kontratavirtuale');
const Project = require('../models/project');
const Oferta = require('../models/oferta');


//create kontratavirtuale
router.post('/create',  passport.authenticate('jwt', {session: false}), function(req, res, next){

    let kontratavirtualeRe = new KontratatVirtuale(req.body);
    const ofertaID = req.body.ofertaID;
    const projectID = req.body.projectID;

    Project.getProjectById(projectID, function(err, project)
    {
        if(err) throw err;

        if(!project)
        {
            return res.json({success: false, msg: 'Ky project nuk ekziston.'});
        }

        Oferta.getOfertaById(ofertaID, function(err, oferta)
        {
            if(err) throw err;

            if(!oferta)
            {
                return res.json({success: false, msg: 'Kjo ofert nuk ekziston.'});
            }

            // SPo bon me testu a ekziston a jo qaj vlersim i qati useri ne qat projekt
            KontratatVirtuale.getKontrataVirtualeByOfertaIDAndProjectID(ofertaID, projectID, function(err, kontratavirtuale)
            {
                if(err) throw err;

                if(kontratavirtuale)
                {
                    return res.json({success: false, msg: 'KontratatVirtuale i keti projekti dhe oferte ekziston.'});
                }
                else
                {
                    KontratatVirtuale.addKontrataVirtuale(kontratavirtualeRe, function(err, kontratavirtuale)
                    {
                        if(err) throw err;
                        else
                        {
                            res.json({success: true, msg: 'KontratatVirtuale created'});
                        }
                    });
                }
            });
        });
    });
});

router.get('/getKontrataVirtualeByOfertaIDAndProjectID/:ofertaid/:projectid', passport.authenticate('jwt', {session: false}), function(req, res, next){
    KontratatVirtuale.getKontrataVirtualeByOfertaIDAndProjectID(req.params.ofertaid, req.params.projectid, function(err, kontratavirtuale)
    {
        res.json(kontratavirtuale);
    });
});

//Remove KontratatVirtuale
router.delete('/removeKontrataVirtuale/:id', passport.authenticate('jwt', {session: false}), function(req, res, next)
{
    const kontratavirtualeID = req.params.id;
    
    KontratatVirtuale.removeKontrataVirtuale(kontratavirtualeID, function(err, kontratavirtuale){
        if(err){
            throw err;
        }
        else {
            res.json({success: true, msg:'kontratavirtuale deleted'});
        }
    });
});


//Modifiko KontratatVirtuale
router.put('/updateKontrataVirtuale/:id', passport.authenticate('jwt', {session: false}), function(req, res, next)
{
    const kontratavirtualeID = req.params.id;
    const newKontrataVirtuale = req.body;

    const ofertaID = newKontrataVirtuale.ofertaID;
    const projectID = newKontrataVirtuale.projectID;
    
    KontratatVirtuale.getKontrataVirtualeById(kontratavirtualeID, function(err, kontratavirtuale)
    {
        if(err) throw err;

        if(!kontratavirtuale)
        {
            return res.json({success: false, msg: 'Kjo kontratavirtuale nuk ekziston.'});
        }

        Oferta.getOfertaById(ofertaID, function(err, oferta)
        {
            if(err) throw err;

            if(!oferta)
            {
                return res.json({success: false, msg: 'Kjo oferte nuk ekziston.'});
            }

            Project.getProjectById(projectID, function(err, project)
            {
                if(err) throw err;

                if(!project)
                {
                    return res.json({success: false, msg: 'Ky project nuk ekziston.'});
                }

                //Ndoshta ska pas nevoj edhe per qet check po pe lo :p
                KontratatVirtuale.getKontrataVirtualeByOfertaIDAndProjectID(ofertaID, projectID, function(err, kontratavirtuale)
                {

                    if(err) throw err;

                    if(!kontratavirtuale)
                    {
                        return res.json({success: false, msg: 'Kjo kontratavirtuale nuk ekziston me kete oferteid edhe projectid.'});
                    }

                    KontratatVirtuale.updateKontrataVirtuale(kontratavirtualeID, newKontrataVirtuale, function(err, newKontrataVirtuale)
                    {
                        if(err)
                        {
                            res.json(err);
                            res.json({success: false, msg:'Failed to update kontratavirtuale!'});
                        }
                        else 
                        {
                            res.json({success: true, msg:'kontratavirtuale updated'});
                        }
                    });
                });
            });
        });
    }); 
});

module.exports = router;