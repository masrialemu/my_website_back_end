const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const userSchema = new Schema({
     bg:{
        burl:{type:String},
        burl_id:{type:String}
     },
     about:{
        aurl:{type:String},
        aurl_id:{type:String},
        def:{type:String},
     }

},{timestamps:true})
const User = mongoose.model('About', userSchema);
module.exports = User;