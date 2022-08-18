const mongoose = require('mongoose');

const medicalSubSchema = mongoose.Schema({
    name:{
        type: String, sparse:true
    },
    type: {
        type: String,
        enum:['otc', 'condition', 'prescription']
    }
})

const medicalItems = mongoose.model('MedicalItem',medicalSubSchema);

const contraSchema = mongoose.Schema({
    item1: medicalSubSchema,
    item2: medicalSubSchema
})

module.exports = {
    contraSchema,
    medicalItems,
    contraindications : mongoose.model('Contraindication', contraSchema)
}