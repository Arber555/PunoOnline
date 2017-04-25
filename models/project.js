const mongoose = require('mongoose');
const config = require('../config/database');

//Projekti Schema
const ProjectSchema = mongoose.Schema({
    emri_projektit: 
    {
        type: String,
        required: true
    },
    pershkrimi_projektit: 
    {
        type: String,
        required: true,
    },
    buxheti_projektit: 
    {
        type: Number,
       required: true
    },
    koha_projektit: 
    {
        type: String //koha qe nevojitet per me kry ni prijekt e kom lon string duhet me diskutu ma shume 
    },

    /*menyra_pageses: 
    {
        lloji_pageses:  
        {  // lloji pageses mundet me kon me ore, me dit, me jave, me muaj apo i tere projektit (fiks)
            name: String,
            required: true
        }
    },*/

    pagesa_fikse: {
        type: Boolean,
        default: false,
        required: false,
    },

    pagesa_ore: {
        type: Boolean,
        default: false,
        required: false
    },

    pagesa_ditore: {
        type: Boolean,
        default: false,
        required: false
    },

    pagesa_javore: {
        type: Boolean,
        default: false,
        required: false
    },

    pagesa_mujore: {
        type: Boolean,
        default: false,
        required: false
    },
    kategoria: 
    [{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Category'
    }],
    userID:
    [{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User'
    }]

});

const Project = module.exports = mongoose.model('Project', ProjectSchema);

module.exports.getProjectByUserId = function(userID, callback){
    Project.find({userID: mongoose.Types.ObjectId(userID)},callback);
}

module.exports.getProjectByCategory = function(kategoria, callback){
    Project.find({kategoria: mongoose.Types.ObjectId(kategoria)},callback);
}

module.exports.getProjectByName = function(emri_projektit, callbeck){
    Project.find({emri_projektit: emri_projektit}, callbeck);
}

module.exports.addProject = function(newProject, callback){
    newProject.save(callback);
}

module.exports.getProjectById = function(projectID, callback){
    Project.findById(projectID, callback);
}

module.exports.updateProject = function(id, updateProject, callback){
    Project.update({_id: mongoose.Types.ObjectId(id)}, updateProject, callback);
}

module.exports.removeProject = function(id, removeProject, callback){
    Project.remove({_id: mongoose.Types.ObjectId(id)}, removeProject, callback);
}