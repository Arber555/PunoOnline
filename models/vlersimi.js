const mongoose = require('mongoose');
const config = require('../config/database');

//Lidhje shume me njo me userin ---
const VlersimiSchema = mongoose.Schema({
    vlera_vlersimit: 
    {
        type: Number,
        required: true
    },
    userID : 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    projectID : 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
        required: true
    }
});

const Vlersimi = module.exports = mongoose.model('Vlersimi', VlersimiSchema);

module.exports.getVlersimiByUserId = function(userID, callback)
{
    Vlersimi.find({userID: mongoose.Types.ObjectId(userID)},callback);
}

module.exports.getPerAVG = function(userID, callback)
{
    Vlersimi.find({userID: mongoose.Types.ObjectId(userID)}, {'vlera_vlersimit':true, '_id': false}, callback);
}

module.exports.getVlersimiByUserIDAndProjectID = function(userID, projectID, callback)
{
    Vlersimi.findOne
    (
        {
            userID: mongoose.Types.ObjectId(userID),
            projectID: mongoose.Types.ObjectId(projectID)
        },
        callback
    );
}

module.exports.addVlersimi = function(newVlersimi, callback){
    newVlersimi.save(callback);
}

module.exports.updateVlersimi = function(id, updateVlersimi, callback){
    Vlersimi.update({_id: mongoose.Types.ObjectId(id)}, updateVlersimi, callback);
}

module.exports.removeVlersimi = function(id, removeVlersimi, callback){
    Vlersimi.remove({_id: mongoose.Types.ObjectId(id)}, removeVlersimi, callback);
}

module.exports.getVlersimiById = function(vlersimiID, callback){
    Vlersimi.findById(vlersimiID, callback);
}
