const express = require('express')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const Patients = require('../mongo_models/patientModel')
const Authorization = require('../middleware/Authorization')
const {medicalItems, contraindications} = require('../mongo_models/contraModel')

class PatientController{

    constructor(){
        this.router = express.Router();
        this.router.route('/login').post(asyncHandler(this.login))
        this.router.route('/otc').get(Authorization.checkJWToken(), asyncHandler(this.getOTC));
        this.router.route('/otc/add').post(Authorization.checkJWToken(), asyncHandler(this.addOTC))
        this.router.route('/otc/remove').post(Authorization.checkJWToken(), asyncHandler(this.deleteOTC))
        this.router.route('/otc/search').post(Authorization.checkJWToken(), asyncHandler(this.OTCSearch))
        this.router.route('/prescription/search').post(Authorization.checkJWToken(), asyncHandler(this.prescriptionSearch))
        this.router.route('/prescription').get(Authorization.checkJWToken(), asyncHandler(this.getPrescriptions))
        this.router.route('/condition').get(Authorization.checkJWToken(), asyncHandler(this.getConditions))
        this.router.route('/condition/add').post(Authorization.checkJWToken(), asyncHandler(this.addCondition))
        this.router.route('/reaction').get(Authorization.checkJWToken(), asyncHandler(this.getReactions))
        this.router.route('/reaction/add').post(Authorization.checkJWToken(), asyncHandler(this.addReaction))
    }

    async login(req, res){
        const {medicare_id, password} = req.body;
        //check user exists
        const patient = await Patients.findOne({medicare_id});
        if(!patient){
            res.status(400)
            throw new Error('incorrect details')
        }

        //compare password
        const passwordMatch = await bcrypt.compare(password, patient._doc.password_hash);
        if(!passwordMatch){
            res.status(400)
            throw new Error('incorrect details')
        }

        const returnData = {
            name: patient._doc.name, 
            medicare_id: patient._doc.medicare_id,
            age: patient._doc.age,
            email: patient._doc.email,
            phone: patient._doc.phone,
            jwt: Authorization.generateJWToken(patient._doc._id)
        }
        res.status(200).json(returnData)
        
    }

   
    async getOTC(req,res){
        const returnData = await Patients.findById(req.user_id);
        res.status(200).json(returnData.otc);
    }

    async addOTC(req, res){
        const {otc} = req.body;

        //validate that the system knows of this otc
        const otcs = await medicalItems.find({type: 'otc'})
        const exists = otcs.filter((o)=>{return otc.localeCompare(o.name)==0}) 
        if(exists.length == 0){
            throw new Error('otc unknown to system')
        }

        //check for duplicates
        const patient = await Patients.findById(req.user_id);
        const duplicate = patient.otc.filter(p=>{return otc.localeCompare(p)==0});
        if(duplicate.length!=0){
            throw new Error('otc already registered')
        }

        //add this otc to the patient's document
        await Patients.findByIdAndUpdate(req.user_id, {$push:{otc}})
        res.status(200).json();

    }

    async deleteOTC(req,res){
        const {otc} = req.body;
        await Patients.findByIdAndUpdate(req.user_id, {$pull:{otc}})
        res.status(200).json();
    }

    async OTCSearch(req, res){
        const {query} = req.body;
        //search for otc by name
        const patient = await Patients.findById(req.user_id);
        const results = patient.otc.filter(o=>{return query.localeCompare(o)==0});
        res.status(200).json(results);

    }

    async getPrescriptions(req, res){
        const returnData = await Patients.findById(req.user_id);
        res.status(200).json(returnData.prescriptions);
    }



    async prescriptionSearch(req, res){
        const {query} = req.body;
        //search for prescription by name
        const patient = await Patients.findById(req.user_id);
        const results = patient.prescriptions.filter(o=>{return query.localeCompare(o.name)==0});
        res.status(200).json(results);
    }

    async getConditions(req,res){
        const returnData = await Patients.findById(req.user_id);
        res.status(200).json(returnData.conditions);
    }

    async getReactions(req,res){
        const returnData = await Patients.findById(req.user_id);
        res.status(200).json(returnData.reactions);
    }

    async addCondition(req, res){
        const {condition} = req.body;
        //check that condition is in the system before adding
        const conditions = await medicalItems.find({type: 'condition'})
        const exists = conditions.filter((o)=>{return condition.localeCompare(o.name)==0}) 
        if(exists.length == 0){
            throw new Error('otc unknown to system')
        }

        //add condition to patient document
        await Patients.findByIdAndUpdate(req.user_id, {$push:{conditions:condition}})
        res.status(200).json();
    }

    async addReaction(req, res){
        const {name, type} = req.body;
        //check that both items are in the system.
        if(!(type.toString()==="otc" || type.toString()==="prescription")){
            throw new Error('type invalid')
        }
        const items = await medicalItems.find({});
        const exists = items.filter((item)=>{return name.localeCompare(item.name)==0});
        if(exists.length!=0){
            //add reaction to system 
            await Patients.findByIdAndUpdate(req.user_id, {$push:{reactions:{name, type}}})
            res.status(200).json();
        }else{
            throw new Error('reaction includes items unknown to system')
        }
    }
}

module.exports = PatientController;