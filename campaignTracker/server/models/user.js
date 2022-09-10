import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const userSchema = mongoose.Schema({
    name: String,
    userName: {
        type: String,
        unique: true,
        require: [true, 'please enter user name']
    },
    email: {
        type: String,
        require: [true, 'please enter email address']
    },
    password:{
        type: String,
        require: [true, 'please enter password']
    },
    campaigns:[String]
})



const userAccounts = mongoose.model('userAccounts', userSchema)
export default userAccounts;