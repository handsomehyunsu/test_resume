// mongoose use

const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({

    mainTitle : {type: String, required : true},
    extraTitle : {type: String, required : true},
    date : {type: String, required : true},
    contents : {type: String, required : true},
    boardCategory : {type: String, required: true},
    createdBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

//module exports
module.exports = mongoose.model('Board', boardSchema);