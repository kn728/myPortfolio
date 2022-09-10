import mongoose from 'mongoose'

const characterProfile = mongoose.Schema({
    name: String,
    age: String,
    photo: String,
    description: String
})

const charProfile = mongoose.model('charProfile', characterProfile)
export default charProfile;