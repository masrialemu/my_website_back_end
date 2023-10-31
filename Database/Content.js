const mongo = require('mongoose')
const Port = new mongo.Schema({
    public_id:{type:Number,default: 1 ,unique: true},
    c1:{type:String,unique: true},
    c2:{type:String ,unique: true},
    c3:{type:String ,unique: true},
    c4:{type:String ,unique: true},
    cv:{type:String ,unique: true},
    desc:{type:String,unique: true},
    image:{type:String}
},{timestamps:true})

module.exports= new mongo.model('content',Port)