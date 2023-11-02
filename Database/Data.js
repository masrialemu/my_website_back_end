const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  bg: {
    burl: { type: String, required: true },
    burl_id: { type: String, required: true }
  },
  about: {
    aurl: { type: String, required: true },
    aurl_id: { type: String, required: true },
    def: { type: String, required: true }
  }
}, { timestamps: true });

const User = mongoose.model('About', userSchema);
module.exports = User;
