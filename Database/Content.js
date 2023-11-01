const mongo = require('mongoose')
const Port = new mongo.Schema({
    public_id:{type:Number,default: 1},
    c1:{type:String},
    c2:{type:String},
    c3:{type:String},
    c4:{type:String},
    cv:{type:String},
    desc:{type:String},
    image:{type:String}
},{timestamps:true})

module.exports= new mongo.model('content',Port)