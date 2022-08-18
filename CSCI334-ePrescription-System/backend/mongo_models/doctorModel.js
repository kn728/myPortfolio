const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password_hash: String
})

module.exports = mongoose.model('Doctor', doctorSchema);