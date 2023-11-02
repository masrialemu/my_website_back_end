const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoSchema = new Schema({
  name: { type: String, required: true, unique: true },
  value: { type: String,required: true },
}, { timestamps: true });

const Info = mongoose.model('info', infoSchema);

module.exports = Info;
