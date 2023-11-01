const mongo = require('mongoose')
const Port = new mongo.Schema({
    public_id:{type:Number,default: 1 ,unique: true},
    c1:{type:String,unique: true, required: true},
    c2:{type:String ,unique: true, required: true},
    c3:{type:String ,unique: true, required: true},
    c4:{type:String ,unique: true, required: true},
    cv:{type:String ,unique: true, required: true},
    desc:{type:String,unique: true, required: true},
    image:{type:String}
},{timestamps:true})

module.exports= new mongo.model('content',Port)