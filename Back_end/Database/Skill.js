const mongo = require('mongoose')
const Port = new mongo.Schema({
    name:{type:String,unique: true},
    value:{type:Number}
},{timestamps:true})

module.exports= new mongo.model('skill',Port)