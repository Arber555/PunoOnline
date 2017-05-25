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
module.exports.getProfessionById = function(id, callback){
    Profession.findById(id, callback);
}

module.exports.addProfession = function(newProfession, callbeck){
    newProfession.save(callbeck);
}

module.exports.removeProfession = function(id, callback){
    Profession.remove({_id: mongoose.Types.ObjectId(id)}, callback);
}

module.exports.updateProfession = function(id, updateProfession, callback){
    Profession.update({_id: mongoose.Types.ObjectId(id)}, updateProfession, callback);
}