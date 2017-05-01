const mongoose = require('mongoose');
const config = require('../config/database');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    categoryID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: false
    }
});

const Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.addCategory = function(newCategory, callback){
    newCategory.save(callback);
}

module.exports.getCateguryByName = function(name, callback){
    Category.findOne({name: name}, callback);
}

module.exports.getCategoryById = function(categoryID, callback){
    Category.findById(categoryID, callback);
}

module.exports.removeCategory = function(id, callback){
    Category.remove({_id: mongoose.Types.ObjectId(id)}, callback);
}

module.exports.updateCategory = function(id, updateCategory, callback){
    Category.update({_id: mongoose.Types.ObjectId(id)}, updateCategory, callback);
}