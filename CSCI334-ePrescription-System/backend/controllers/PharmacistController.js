const express = require('express')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Pharmacists = require('../mongo_models/pharmacistModel')
const Patients = require('../mongo_models/patientModel');
const Authorization = require('../middleware/Authorization')

class PharmacistController{

    constructor(){
        this.router = express.Router();
        this.router.route('/login').post(asyncHandler(this.login))
        this.router.route('/dispense').post(Authorization.checkJWToken(['pharmacist']), asyncHandler(this.handleDispensation))
        this.router.route('/scripts').post(Authorization.checkJWToken(['pharmacist']), asyncHandler(this.getCurrentScripts))
        this.router.route('/reactions').post(Authorization.checkJWToken(['pharmacist']), asyncHandler(this.getReactions))
    }

    async login(req,res){
        const {pharmacist_id, password} = req.body;
        //check user exists
        const pharmacist = await Pharmacists.findOne({pharmacist_id});
        if(!pharmacist){
            res.status(400)
            throw new Error('incorrect details')
        }

        //compare password
        const passwordMatch = await bcrypt.compare(password, pharmacist._doc.password_hash);
        if(!passwordMatch){
            res.status(400)
            throw new Error('incorrect details')
        }

        const returnData = {
            jwt: Authorization.generateJWToken(pharmacist._doc._id)
        }
        res.status(200).json(returnData)
    }

    async getCurrentScripts(req, res){
        const {medicare_id} = req.body;
        //check the patient's token
        const exists = await Patients.findOne({medicare_id});
        if(exists.length==0){
            throw new Error('invalid patient code');
        }
        //get the active prescriptions for the patient
        const {prescriptions} = exists._doc;
        const activeScripts = prescriptions.filter(p=>{
            const date = p.expiration.getTime() > Date.now();
            const repeats = p.repeats > 0;
            return (date && repeats)
        })
        
        res.status(200).json({activeScripts});
    }

    async handleDispensation(req, res){
        const {dispensations, medicare_id} = req.body;

        const patient = await Patients.findOne({medicare_id});

        const returnData = []
        for(const d of dispensations){
            const updated = await Patients.findOneAndUpdate({_id:patient._doc._id, prescriptions: {$elemMatch:{_id:d._id}}},
                {$inc: {"prescriptions.$.repeats":-1}})       
            returnData.push(updated)
        }
        res.status(200).json({returnData});
    }

    async getReactions(req,res){
        const {medicare_id} = req.body;

        const patient = await Patients.findOne({medicare_id});
        res.status(200).json({reactions:patient._doc.reactions});
    }
}

module.exports = PharmacistController;