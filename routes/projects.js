const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Project = require('../models/project');
const User = require('../models/user');
const Category = require('../models/category');


//create Project
router.post('/create',  passport.authenticate('jwt', {session: false}), function(req, res, next){

    let newProject = new Project(req.body);
    const userID = req.body.userID;
    const categoryID = req.body.categoryID;

    User.getUserById(userID, function(err, user)
    {
        if(err) throw err;

        if(!user)
        {
            return res.json({success: false, msg: 'Ky user nuk ekziston.'});
        }

        Category.getCategoryById(categoryID, function(err, category)
        {
            if(err) throw err;

            if(!category)
            {
                return res.json({success: false, msg: 'Kjo kategori nuk ekziston.'});
            }

            Project.addProject(newProject, function(err, project)
            {
                if(err) throw err;
                else
                {
                    res.json({success: true, msg: 'Project created'});
                }
            });
        });
    });
});

// Get project me id
router.get('/getProject/:id', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Project.getProjectById(req.params.id, function(err, project){
        res.json(project);
    });
});

// Get project me name
router.get('/getProject/:name', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Project.getProjectById(req.params.id, function(err, project){
        res.json(project);
    });
});

// kthej krejt projektet e userit
router.get('/getProjectByName/:emri_projektit', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Project.getProjectByName(req.params.emri_projektit, function(err, project){
        res.json(project);
    });
});

// kthej krejt projektet e ni kategorie
router.get('/GetProjectByCategory/:id', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Project.getProjectByCategory(req.params.id, function(err, project){
        res.json(project);
    });
});

//Modifiko Pojektin
router.put('/updateProject/:id', passport.authenticate('jwt', {session: false}), function(req, res, next)
{
    const projectID = req.params.id;
    const newProject = req.body;

    const userID = newProject.userID;
    const categoryID = newProject.kategoria;
    
    Project.getProjectById(projectID, function(err, project)
    {
        if(err) throw err;

        if(!project)
        {
            return res.json({success: false, msg: 'Ky project nuk ekziston.'});
        }

        User.getUserById(userID, function(err, user)
        {
            if(err) throw err;

            if(!user)
            {
                return res.json({success: false, msg: 'Ky user nuk ekziston.'});
            }

            Category.getCategoryById(categoryID, function(err, category)
            {
                if(err) throw err;

                if(!category)
                {
                    return res.json({success: false, msg: 'Kjo kategori nuk ekziston.'});
                }

                Project.updateProject(projectID, newProject, function(err, newProject)
                {
                    if(err){
                        res.json(err);
                        res.json({success: false, msg:'Failed to update project!'});
                    }
                    else {
                        res.json({success: true, msg:'Project updated'});
                    }
                });
            });
        });
    });
});

//Remove Pojektin
router.delete('/removeProject/:id', passport.authenticate('jwt', {session: false}), function(req, res, next)
{
    const projectID = req.params.id;
    
    Project.removeProject(projectID, function(err, project){
        if(err){
            throw err;
        }
        else {
            res.json({success: true, msg:'Project deleted'});
        }
    });
});

module.exports = router;