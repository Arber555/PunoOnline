const mongoose = require('mongoose');
const config = require('../config/database');

const OfertaSchema = mongoose.Schema({
    shuma: {
        type: Number,
        required: true
    },
    pershkrimi: {
        type: String,
        required: true
    },
    projectID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
        required: false
    },
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false
    }
});

const Oferta = module.exports = mongoose.model('Oferta', OfertaSchema);

module.exports.addOferta = function(newOferta, callback){
    newOferta.save(callback);
}

module.exports.updateOferta = function(id, updateOferta, callback){
    Oferta.update({_id: mongoose.Types.ObjectId(id)}, updateOferta, callback);
}

module.exports.removeOferta = function(id, removeOferta, callback){
    Oferta.remove({_id: mongoose.Types.ObjectId(id)}, removeOferta, callback);
}

module.exports.getOfertaById = function(ofertaID, callback){
    Oferta.findById(ofertaID, callback);
}


module.exports.getOfertaByUserId = function(userID, callback)
{
    Oferta.find({userID: mongoose.Types.ObjectId(userID)},callback);
}

module.exports.getOfertaByUserIDAndProjectID = function(userID, projectID, callback)
{
    Oferta.findOne
    (
        {
            userID: mongoose.Types.ObjectId(userID),
            projectID: mongoose.Types.ObjectId(projectID)
        },
        callback
    );
}
