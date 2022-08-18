const mongoose = require('mongoose');

const pharmacistSchema = mongoose.Schema({
    pharmacist_id: {
        type: String,
        unique: true
    },
    password_hash: String
})

module.exports = mongoose.model('Pharmacist', pharmacistSchema);