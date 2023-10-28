const mongo = require('mongoose')
const Port = new mongo.Schema({
    title:{type:String,unique: true},
    video:{type:String},
    github:{type:String},
    live:{type:String},
    desc:{type:String,unique: true},
    image:{type:String}
},{timestamps:true})

module.exports= new mongo.model('project',Port)