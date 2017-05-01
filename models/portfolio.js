//portfolion se ki te krijimi i profilit po vetem te update profili... duhet me diskutu edhe pak qeto pse!!!!

const mongoose = require('mongoose');
const config = require('../config/database');

const PortfolioSchema = mongoose.Schema({
    emriProjectit: {  //luj me emer te update profile!!!!
        type: String,
        required: true,
        unique: true
    },

    pershkrimiProjectit: {
        type: String,
        required: true
    },

    fotoProjectit: {
        type: String,
        required: false
    },

    projectiURL: {
        type: String,
        required: false
    },
    
    profileID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    },

    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    } 
});

const Portfolio = module.exports = mongoose.model('Portfolio', PortfolioSchema);

module.exports.addPortfolio = function(newPortfoio, callback){
    newPortfoio.save(callback);
}

module.exports.getPortfolioById = function(id, cllback){
    Portfolio.findeById(id, callback);
}

module.exports.getPortfolioByName = function(portfolioName, callback){
    Portfolio.findOne({emriProjectit: portfolioName}, callback);
}

module.exports.updatePortfolio = function(id, updatePortfolio, callback){
    Portfolio.update({_id: mongoose.Types.ObjectId(id)}, updatePortfolio, callback);
}

module.exports.getPortfolioByProfileID = function(profileID, callback){
    Portfolio.finde({profileID: profileID}, callback);
}

module.exports.removePortfolio = function(id, callback){
    Portfolio.remove({_id: mongoose.Types.ObjectId(id)}, callback);
}