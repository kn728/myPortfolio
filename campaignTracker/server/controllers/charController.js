import mongoose from 'mongoose'
import charProfile from '../models/characterProfile.js'

export const getCharacter = async(req, res) => {
    const {name} = req.body;
    try{
        const character = await  charProfile.find()
        res.json(character)
    } catch(err) {
        res.json({message: err})
    }
}

export const createCharacter = async (req, res) => {
    const {name, age, photo, description} = req.body

    const newChar = new charProfile({name, age, photo, description})
    try {
        const c = await newChar.save()
        res.json(c)
    }catch(err){
        res.json({message: err})
    } 
}