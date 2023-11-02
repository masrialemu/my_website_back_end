const mongo = require('mongoose')
const Port = new mongo.Schema({
    title:{type:String,unique: true,required: true},
    video:{type:String},
    github:{type:String , required: true},
    live:{type:String},
    desc:{type:String,unique: true, required: true},
    image:{type:String , required: true}
},{timestamps:true})

module.exports= new mongo.model('project',Port)