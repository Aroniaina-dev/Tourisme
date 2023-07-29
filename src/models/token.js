const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    idToken: {type: String, required: true,},
    idAgence: {type: String, required: true,},
    token: { type: String, required: true, },
}, { timestamps: true });

module.exports = Token = mongoose.model('Token', schema)