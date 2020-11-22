
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({

    email : {type: String, unique: true, required : true},
    username : {type: String, required : true},
    password : {type: String, required : true},

});

//for preventing duplication user information events 
userSchema.plugin(mongooseUniqueValidator);

//module exports
module.exports = mongoose.model('User', userSchema);