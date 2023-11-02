const mongo = require('mongoose')
const Port = new mongo.Schema({
    name:{type:String,unique: true ,required: true},
    value:{type:Number, required: true}
},{timestamps:true})

module.exports= new mongo.model('skill',Port)