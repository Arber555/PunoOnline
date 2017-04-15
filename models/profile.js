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
    foto_name : String,
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
    userID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User'
    }
});

const Profile = module.exports = mongoose.model('Profile', ProfileSchema);

module.exports.getProfileByUserId = function(userId, callback){
    Profile.findOne({userID: mongoose.Types.ObjectId(userId)},callback);
}

module.exports.addProfile = function(newProfile, callback){
    newProfile.save(callback);
}

module.exports.getProfileById = function(profileID, callback){
    Profile.findById(profileID, callback);
}