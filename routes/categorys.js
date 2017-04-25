const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Category = require('../models/category');


//create Category test so qe e perdorim dika qet route po mu ka duft me shtu kategori
router.post('/create', function(req, res, next){
    let newCategory = new Category({
        name: req.body.name,
        categoryID: req.body.categoryID
    });

    Category.addCategory(newCategory, function(err, category){
        if(err){
            //throw err;
            res.json({success: false, msg: 'Failed to create category'});
        }
        else {
            res.json({success: true, msg: 'Category create'});
        }
    });
});

router.get('/getCategory/:id', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Category.getCategoryById(req.params.id, function(err, category){
        res.json(category);
    });
});

module.exports = router;