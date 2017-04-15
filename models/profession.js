const mongoose = require('mongoose');
const config = require('../config/database');

const ProfessionSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required:true
    }
});

const Profession = module.exports = mongoose.model('Profession', ProfessionSchema);

module.exports.getProfessionByName = function(name, callbeck){
    Profession.findOne({name: name}, callbeck);
}

module.exports.addProfession = function(newProfession, callbeck){
    newProfession.save(callbeck);
}