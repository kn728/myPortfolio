const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    admin_id: {
        type: String,
        unique: true
    },
    password_hash: String
})

module.exports = mongoose.model('Admin', adminSchema);