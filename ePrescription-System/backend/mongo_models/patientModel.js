const mongoose = require('mongoose');

const Prescription = { //a type for the schema
    name: String,
    repeats: Number,
    expiration: Date
}

const Reaction = {
    name: String,
    type: {
        type: String,
        enum:['otc', 'prescription']
    }
}

const patientSchema = mongoose.Schema({
    medicare_id: {
        type: String,
        unique: true
    },
    name: String,
    password_hash: String,
    email: String,
    phone: String,
    age: String,
    otc: [String],
    prescriptions: [Prescription],
    conditions: [String],
    reactions: [Reaction]
})

module.exports = mongoose.model('Patient', patientSchema);