const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Portfolio = require('../models/portfolio');
const Category = require('../models/category')

//create Portfolio
router.post('/create', function(req, res, next){
    let newPortfolio = new Portfolio (req.body);
    const categoryName = req.body.categoryID;
    
    Category.getCateguryByName(categoryName, function(err, category){
        if(err){ 
            res.json({msg: "Gabim te Errori"});
            throw err; 
        }

        if(!category){
            return res.json({success: false, msg: 'Nuk ka category'});
        }

        newPortfolio.categoryID = category.id;
        Portfolio.addPortfolio(newPortfolio, function(err, profession){
            if(err){
                res.json({success: false, msg: 'Failed to create portfolio'});
            }
            else {
                res.json({success: true, msg: 'Portfolio create'});
            }
        });
    });
});


//get Portfolio by profile id

router.get('/:id', function(req, res, next){
    Portfolio.getPortfolioByProfileID(req.params.id, function(err, portfolios){
        if(err)
        {
            throw err;
        }

        if(!portfolios)
        {
            return res.json({success: false, msg: 'Nuk ka asnj portfolio'});
        }

        res.json(portfolios);
    });
});

module.exports = router;