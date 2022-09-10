import mongoose from'mongoose'
import userAccounts from '../models/user.js'
import campaignModels from '../models/campaign.js'
import charProfile from '../models/characterProfile.js'
import bcrypt from 'bcrypt'

export const login = async (req, res)  => {
    const {userName, password} = req.body
    try {
        const loggedUser = await userAccounts.findOne({userName: userName})

        const valid = await bcrypt.compare(password, loggedUser.password)
        if(valid) {
            res.json(loggedUser)
        } else {
            throw "incorrect password"
        }
    } catch(err) {
        res.json({message: err})
    }
}

export const RegisterUser = async (req, res) => {
    const {name, userName, email, password} = req.body
      

    const newUser = new userAccounts({name, userName, email, password})

    try {
        const theSalt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, theSalt)
        newUser.password = hashedPass
        const nUser = await newUser.save()
        res.json(nUser)
    }catch(err){
        res.json({message: err})
    } 
   
}

export const deleteAll = async (req, res) => {
    try{
        const user = await userAccounts.deleteMany()
        const camp = await campaignModels.deleteMany()
        const char = await charProfile.deleteMany()
        res.json({message: 'it is done'})
    }catch(err) {
        res.json({message:' icant even delete write or use the right write, damn i did it again'})
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await userAccounts.find()
        res.json(users)
    } catch (error) {
        res.json({message:err})
    }
}