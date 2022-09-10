import mongoose from 'mongoose'
import campaignModels from '../models/campaign.js'
import charProfile from '../models/characterProfile.js'
import userAccounts from '../models/user.js'

export const launchCampaign = async (req, res) => {
    const {campaignName, dungeonMaster} = req.body

    const campaign = new campaignModels({campaignName, dungeonMaster})
    try {
        const c = await campaign.save()
        res.json(c)
    } catch(err) {
        res.json({message: err})
    }
}

export const getDungeonMasterInfo= async (req, res) => {
    const {_id} = req.body
    try {
        const campaign = await campaignModels.findById(_id)
        const dm = await userAccounts.findById(campaign.dungeonMaster)
        res.json(dm)
    }catch(err) {
        res.json({message: 'could not find dm'})
    }
}

export const getCampaign = async (req, res) => {
    try {
        const camp = await campaignModels.find()
        res.json(camp)
    } catch(err) {
        res.json({message:'didnt work this time'})
    }
} 

export const addPlayer = async (req, res) => {
    const {playerId, id:_id} = req.body
    const updatedUser = await userAccounts.updateOne({_id: playerId}, {$push: {campaigns: _id}})
    const added = await campaigns.updateOne({_id}, {$push: {users: playerId}})
    res.json(added)
}

export const removePlayer= async (req, res) => {
    
}