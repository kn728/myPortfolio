const express = require('express')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const Admins = require('../mongo_models/adminModel')
const Doctors = require('../mongo_models/doctorModel')
const Pharmacists = require('../mongo_models/pharmacistModel')
const Authorization = require('../middleware/Authorization')
const {medicalItems, contraindications} = require('../mongo_models/contraModel')

class AdminController{

    constructor(){
        this.router = express.Router();
        this.router.route('/login').post(asyncHandler(this.login))
        this.router.route('/register').post(asyncHandler(this.register))
        this.router.route('/registerDoctor').post(Authorization.checkJWToken(['admin']), asyncHandler(this.registerDoctor))
        this.router.route('/registerPharmacist').post(Authorization.checkJWToken(['admin']), asyncHandler(this.registerPharmacist))
        this.router.route('/medical/add').post(Authorization.checkJWToken(['admin']), asyncHandler(this.addMedicalItem))
        this.router.route('/contraindication/add').post(Authorization.checkJWToken(['admin']), asyncHandler(this.addContraindication))
        this.router.route('/medical').get(this.getMedicalItems)
        this.router.route('/contraindication').get(this.getContraindications)
    }

    async login(req,res){
        const {admin_id, password} = req.body;
        //check user exists
        const admin = await Admins.findOne({admin_id});
        if(!admin){
            res.status(400)
            throw new Error('incorrect details')
        }

        //compare password
        const passwordMatch = await bcrypt.compare(password, admin._doc.password_hash);
        if(!passwordMatch){
            res.status(400)
            throw new Error('incorrect details')
        }

        const returnData = {
            jwt: Authorization.generateJWToken(admin._doc._id)
        }
        res.status(200).json(returnData)
    }
    
    async register(req,res){
        const {admin_id, password} = req.body;

        //check if user exists
        const exists = await Admins.findOne({admin_id});
        if(exists){
            res.status(400)
            throw new Error('user already exists')
        }

        //hash password - security
        const salt = await bcrypt.genSalt();
        const hash = bcrypt.hashSync(password,salt);

        //add user to collection
        await Admins.create({password_hash:hash, admin_id})

        //return a http response on success
        res.status(200).json()
    }

    async addMedicalItem(req, res){
        const {name, type} = req.body;

        //check for duplicates
        const items = await medicalItems.find({});
        const duplicates = items.filter((item)=>{return name.localeCompare(item.name)==0});
        if(duplicates.length!=0){
            throw new Error('medical item already exists');
        }

        //add to database
        await medicalItems.create({
            name, type
        })
        res.status(200).json();

    }

    async getMedicalItems(req,res){
        const items = await medicalItems.find({});
        res.status(200).json(items);
    }

    async addContraindication(req,res){
        const {item1, item2} = req.body;

        //check for duplicates
        const contras = await contraindications.find({});
        const duplicates = contras.filter((contra)=>{
            const item1Match1 = item1.name.localeCompare(contra.item1.name)==0;
            const item1Match2 = item1.name.localeCompare(contra.item2.name)==0;
            const item2Match1 = item2.name.localeCompare(contra.item1.name)==0;
            const item2Match2 = item2.name.localeCompare(contra.item2.name)==0;

            const duplicate = (item1Match1 && item2Match2) || (item1Match2 && item2Match1);
            return duplicate;
        })

        if(duplicates.length!=0){
            throw new Error('contraindication already exists');
        }

        await contraindications.create({
            item1, item2
        })

        res.status(200).json();
    }

    async getContraindications(req,res){
        const sets = await contraindications.find({})
        res.status(200).json(sets)
    }

    async registerDoctor(req,res){
        const {email, password} = req.body;

        //check if user exists
        const exists = await Doctors.findOne({email});
        if(exists){
            res.status(400)
            throw new Error('user already exists')
        }

        //hash password - security
        const salt = await bcrypt.genSalt();
        const hash = bcrypt.hashSync(password,salt)

        //add user to collection
        await Doctors.create({password_hash:hash, email})

        //return a http response on success
        res.status(200).json()
    }

    async registerPharmacist(req, res){
        const {pharmacist_id, password} = req.body;

        //check if user exists
        const exists = await Pharmacists.findOne({pharmacist_id});
        if(exists){
            res.status(400)
            throw new Error('user already exists')
        }

        //hash password - security
        const salt = await bcrypt.genSalt();
        const hash = bcrypt.hashSync(password,salt)

        //add user to collection
        await Pharmacists.create({password_hash:hash, pharmacist_id})

        //return a http response on success
        res.status(200).json()
    }
}

module.exports = AdminController;