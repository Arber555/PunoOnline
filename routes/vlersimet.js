const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Project = require('../models/project');
const User = require('../models/user');
const Vlersimi = require('../models/vlersimi');

//create Vlerimin
router.post('/create',  passport.authenticate('jwt', {session: false}), function(req, res, next){

    let VlersimiRi = new Vlersimi(req.body);
    const userID = req.body.userID;
    const projectID = req.body.projectID;
    const vlersimi_double = req.body.vlera_vlersimit;

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

            if(vlersimi_double > 5 && vlersimi_double < 0)
            {
                return res.json({success: false, msg: 'Vlersimi qe mund ti besh nje useri eshte nga 0 deri ne 5'});
            }

            // SPo bon me testu a ekziston a jo qaj vlersim i qati useri ne qat projekt
            Vlersimi.getVlersimiByUserIDAndProjectID(userID, projectID, function(err, vlersimi)
            {
                if(err) throw err;

                console.log(vlersimi);
                if(vlersimi)
                {
                    return res.json({success: false, msg: 'Vlersimi i keti useri ne kete projekt ekziston.'});
                }

                Vlersimi.addVlersimi(VlersimiRi, function(err, vlersimi)
                {
                    if(err) throw err;
                    else
                    {
                        res.json({success: true, msg: 'Vlersimi created'});
                    }
                });
            });

            
        });
    });
});


router.get('/getVlersimiByUser/:id', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Vlersimi.getVlersimiByUserId(req.params.id, function(err, vlersimi)
    {
        res.json(vlersimi);
    });
});

router.get('/getVlersimiByUserIDAndProjectID/:userid/:projectid', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Vlersimi.getVlersimiByUserIDAndProjectID(req.params.userid, req.params.projectid, function(err, vlersimi)
    {
        res.json(vlersimi);
    });
});

//me provu AVG me query
router.get('/getAVGVlersimiByUser/:id', passport.authenticate('jwt', {session: false}), function(req, res, next){

    Vlersimi.getVlersimiByUserId(req.params.id, function(err, vlersimi)
    {
        if(err) {throw err;}
        
        let sum = 0;
        let count = 0;

        for(var port in vlersimi)
        {
            sum += vlersimi[port].vlera_vlersimit;
            count++;
        }

        const avg = sum / count;
        res.json(avg);
    });
});


//Remove Vlersimin
router.delete('/removeVlersimin/:id', passport.authenticate('jwt', {session: false}), function(req, res, next)
{
    const vlersimiID = req.params.id;
    
    Vlersimi.removeVlersimi(vlersimiID, function(err, vlersimi){
        if(err){
            throw err;
        }
        else {
            res.json({success: true, msg:'vlersimi deleted'});
        }
    });
});

//Modifiko Vlersimin
router.put('/updateVlersimi/:id', passport.authenticate('jwt', {session: false}), function(req, res, next)
{
    const vlersimiID = req.params.id;
    const newVlersimi = req.body;

    const userID = newVlersimi.userID;
    const projectID = newVlersimi.projectID;
    
    Vlersimi.getVlersimiById(vlersimiID, function(err, vlersimi)
    {
        if(err) throw err;

        if(!vlersimi)
        {
            return res.json({success: false, msg: 'Ky vlersim nuk ekziston.'});
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
                Vlersimi.getVlersimiByUserIDAndProjectID(userID, projectID, function(err, vlersimi)
                {

                    if(err) throw err;

                    if(!vlersimi)
                    {
                        return res.json({success: false, msg: 'Ky vlersim nuk ekziston me kete userid edhe projectid.'});
                    }

                    Vlersimi.updateVlersimi(vlersimiID, newVlersimi, function(err, newVlersimi)
                    {
                        if(err)
                        {
                            res.json(err);
                            res.json({success: false, msg:'Failed to update vlersimi!'});
                        }
                        else 
                        {
                            res.json({success: true, msg:'Vlersimi updated'});
                        }
                    });
                });
            });
        });
    });
});

module.exports = router;