const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//user Schema
const UserSchema = mongoose.Schema({
    emri: {
        type: String,
        required: true
    },
    mbiemri: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    freelancer: {
        type: Boolean
    },
    klient: {
        type: Boolean
    },
    //statusi \0/
    gjinia: {
        type: String,
        required: true
    },
    datalindjes: {
        type: Date,
        required: true
    },
    statusi: {
        type: Boolean,
        required: true,
        default: true
<<<<<<< HEAD
=======
    },
    active: {
        type: Boolean,
        require: true,
        default: false
>>>>>>> 59fe86b01d2290ce30cf60c1c654bdb2a5fe4820
    }

});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback){
    User.findOne({email: email},callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            if(err){ throw err; }
            newUser.password = hash;
            newUser.save(callback);        
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.removeUser = function(id, callback){
    User.remove({_id: mongoose.Types.ObjectId(id)}, callback);
}

module.exports.updateUser = function(id, updateUser, callback){
    User.update({_id: mongoose.Types.ObjectId(id)}, updateUser, callback);
<<<<<<< HEAD
}
=======
}

/*module.exports.resetUsernameByEmail = function(email, callback){
    User.findOne({email: email}, callback);
}*/
>>>>>>> 59fe86b01d2290ce30cf60c1c654bdb2a5fe4820
