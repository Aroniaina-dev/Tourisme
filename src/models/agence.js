const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    idAgence: {type: String, required: true,},
    designation: { type: String, required: true, },
    email: { type: String, required: true, },
    password: { type: String, required: true, },
    contact: { type: String, },
    descriptionAgence: { type: String, required: true, },
    publication: [{
        description: { type: String, required: true, },
        photo: { type: [String], required: true, },
    }],    
}, { timestamps: true });

module.exports = Agence = mongoose.model('Agence', schema)