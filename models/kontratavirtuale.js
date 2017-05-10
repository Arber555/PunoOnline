const mongoose = require('mongoose');
const config = require('../config/database');

const KontrataVirtualeSchema = mongoose.Schema({
    data_pranimit: {
        type: Date,
        required: true
    },
    data_dorzimit: {
        type: Date,
        required: true
    },
    projectID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
        required: false
    },
    ofertaID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'oferta',
        required: false
    }
});

const KontrataVirtuale = module.exports = mongoose.model('KontrataVirtuale', KontrataVirtualeSchema);


module.exports.addKontrataVirtuale = function(newKontrataVirtuale, callback){
    newKontrataVirtuale.save(callback);
}

module.exports.updateKontrataVirtuale = function(id, updateKontrataVirtuale, callback){
    KontrataVirtuale.update({_id: mongoose.Types.ObjectId(id)}, updateKontrataVirtuale, callback);
}

module.exports.removeKontrataVirtuale = function(id, removeKontrataVirtuale, callback){
    KontrataVirtuale.remove({_id: mongoose.Types.ObjectId(id)}, removeKontrataVirtuale, callback);
}

module.exports.getKontrataVirtualeById = function(KontrataVirtualeID, callback){
    KontrataVirtuale.findById(KontrataVirtualeID, callback);
}


module.exports.getKontrataVirtualeByProjectId = function(projectID, callback)
{
    KontrataVirtuale.find({projectID: mongoose.Types.ObjectId(projectID)},callback);
}

module.exports.getKontrataVirtualeByOfertaIDAndProjectID = function(ofertaID, projectID, callback)
{
    KontrataVirtuale.findOne
    (
        {
            ofertaID: mongoose.Types.ObjectId(ofertaID),
            projectID: mongoose.Types.ObjectId(projectID)
        },
        callback
    );
}
