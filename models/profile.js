const mongoose = require('mongoose');
const config = require('../config/database');
//const user = require('');

const ProfileSchema = mongoose.Schema({
    profesioni: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'profesioni'
        }
    ],
    telefoni: {
        type: String, 
    }, 
    foto_name : {
        type: String,
        required: false,
        default: "default"
    },
    ora :{
        type: Number,
        required: true,
    },
    edukimi: {
        type: String,
        required: true
    },
    mesatarja_vlersimit: {
        type: Number,
    },
    pershkrimi: {
        type: String, 
        required: true
    },

    shteti: {
        type: String,
        required: true
    },
    qyteti: {
        type: String,
        required: true
    },
    adresa: {
        type: String,
        required: true
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User'
    },
    /*portfolioID: [{ //testuese
        type: mongoose.Schema.Types.ObjectId,
        ref: 'portfolio',
        required: false
    }]*/
});

const Profile = module.exports = mongoose.model('Profile', ProfileSchema);

module.exports.getProfileByUserId = function(userId, callback){
    Profile.findOne({userID: mongoose.Types.ObjectId(userId)},callback);
}

/*module.exports.getProfileByUsername = function(username, callback){
    Profile.findOne({UserName})
}*/

module.exports.addProfile = function(newProfile, callback){
    newProfile.save(callback);
}

module.exports.getProfileById = function(profileID, callback){
    Profile.findById(profileID, callback);
}

module.exports.updateProfile = function(id, updateProfile, callback){
    Profile.update({_id: mongoose.Types.ObjectId(id)}, updateProfile, callback);
}

module.exports.removeProfile = function(id, callback){
    Profile.remove({_id: mongoose.Types.ObjectId(id)}, callback);
}