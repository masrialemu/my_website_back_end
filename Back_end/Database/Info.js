const mongo = require('mongoose')
const Port = new mongo.Schema({
    name:{type:String,unique: true},
    value:{type:String},
},{timestamps:true})

module.exports= new mongo.model('info',Port)