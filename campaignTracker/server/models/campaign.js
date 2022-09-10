import mongoose from 'mongoose'

const campaignSchema = mongoose.Schema({
    campaignName: {
        type: String,
        required: true
    },
    gameSession: [{
        title: { 
            type: String,
            required: true
        },
        sessionContent:[{
            contentType: {
                type: String,
                required: true
            },
            content: String
        }]
    }],
    playerCharacters: [String],
    users: [String],
    dungeonMaster: String
})

const campaigns = mongoose.model('campaigns', campaignSchema)
export default campaigns;
