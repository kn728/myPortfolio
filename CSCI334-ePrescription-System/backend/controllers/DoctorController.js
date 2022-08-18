const express = require('express')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const Doctors = require('../mongo_models/doctorModel')
const Patients = require('../mongo_models/patientModel')
const {medicalItems, contraindications} = require('../mongo_models/contraModel')
const Authorization = require('../middleware/Authorization')

class DoctorController{

    constructor(){
        this.router = express.Router();
        this.router.route('/login').post(asyncHandler(this.login))
        this.router.route('/registerPatient').post(asyncHandler(this.registerPatient))
        this.router.route('/getPatient').post(Authorization.checkJWToken(), asyncHandler(this.getPatient))
        this.router.route('/prescription/update').post(Authorization.checkJWToken(), asyncHandler(this.updatePrescriptions))
        this.router.route('/contraindications').post(Authorization.checkJWToken(), asyncHandler(this.checkContraindications));
    }

    async login(req,res){
        const {email, password} = req.body;
        //check user exists
        const doctor = await Doctors.findOne({email});
        if(!doctor){
            res.status(400)
            throw new Error('incorrect details')
        }

        //compare password
        const passwordMatch = await bcrypt.compare(password, doctor._doc.password_hash);
        if(!passwordMatch){
            res.status(400)
            throw new Error('incorrect details')
        }

        const returnData = {
            jwt: Authorization.generateJWToken(doctor._doc._id)
        }
        res.status(200).json(returnData)
    }
    

    async registerPatient(req, res){
        const {name, medicare_id, password, phone, email, age} = req.body;

        //check if user exists
        const exists = await Patients.findOne({medicare_id});
        if(exists){
            res.status(400)
            throw new Error('user already exists')
        }

        //hash password - security
        const salt = await bcrypt.genSalt();
        const hash = bcrypt.hashSync(password,salt)

        //add user to collection
        const user = await Patients.create({name, medicare_id, password_hash:hash, phone, email, age})

        //return a http response on success
        const {password_hash, ...returnData} = {...user._doc} //this removes the password hash from the return data.
        res.status(200).json(returnData)

    }

    async updatePrescriptions(req,res){
        const {prescriptions, medicare_id} = req.body;
        const sys = await medicalItems.find({type: 'prescription'})

        //validate is known
        for(const p of prescriptions){
            const exists = sys.filter((o)=>{return p.name.localeCompare(o.name)==0}) 
            if(exists.length == 0){
                throw new Error('prescription unknown to system')
            }
        }

        //update prescription list
        let patient = await Patients.findOne({medicare_id});
        await Patients.findByIdAndUpdate(patient._doc._id, {prescriptions})
        
        /*const no_id = prescriptions.filter(p=>!p._id);
        for(const p of no_id){
            const result = await Patients.findByIdAndUpdate(patient._doc._id, {$push:{prescriptions:{name:p.name, repeats:p.repeats, expiration:p.expiration}}})
            console.log(result)
        }*/

        

        res.status(200).json()
    }

    async addOnePrescription(req,res){
        const {prescription_name, repeats, expiration, medicare_id} = req.body;
        await this.addPrescription(prescription_name, repeats, expiration, medicare_id);
        res.status(200).json();
    }

    async addPrescription(prescription_name, repeats, expiration, medicare_id){
        
        //validate that script is in system before adding (so that it can be checked for contraindications)
        const prescriptions = await medicalItems.find({type: 'prescription'})
        const exists = prescriptions.filter((o)=>{return prescription_name.localeCompare(o.name)==0}) 
        if(exists.length == 0){
            throw new Error('prescription unknown to system')
        }

        //add this prescription to the patient's document
        const patient = await Patients.findOne({medicare_id});
        await Patients.findByIdAndUpdate(patient._doc._id, {$push:{prescriptions:{name:prescription_name, repeats, expiration}}})
        return true;

        
    }

    async getPatient(req,res){
        const {medicare_id} = req.body;
        const patient = await Patients.findOne({medicare_id});
        const {password_hash, ...returnData} = {...patient._doc} //this removes the password hash from the return data.
        res.status(200).json(returnData)
    }

    async checkContraindications(req, res){
        let {treatments, medicare_id} = req.body;
        const returnContra = [];
        const returnWarning = [];
        const patientReactions = []

        const patient = await Patients.findOne({medicare_id});
        const patientData = patient._doc;

        //check if each treatment has any contra-indications associated
        for(const treatment of treatments){
            const associated = await contraindications.find({$or:[{"item1.name":treatment}, {"item2.name":treatment}]});
            //if there are associated contraindications
            if(associated.length>0){
                //check if there are associated items within the other prescribed treatments, and patient conditions and otcs
                for(const a of associated){
                    //treatments wished
                    for(const t of treatments){
                        if(treatment.localeCompare(t)==0){continue};
                        const match1 = a.item1.name.localeCompare(t)==0;
                        const match2 = a.item2.name.localeCompare(t)==0;
                        if(match1 || match2){
                            returnContra.push(a);
                            if(match1){
                                treatments = treatments.filter((t)=>{t.localeCompare(a.item2.name)==0})
                            }
                            if(match2){
                                treatments = treatments.filter((t)=>{t.localeCompare(a.item1.name)==0})
                            }
                        }
                    }

                    //patient conditions
                    for(const c of patientData.conditions){
                        const match1 = a.item1.name.localeCompare(c)==0;
                        const match2 = a.item2.name.localeCompare(c)==0;
                        if(match1 || match2){
                            returnContra.push(a);
                        }
                    }

                    //patient otc
                    for(const o of patientData.otc){
                        const match1 = a.item1.name.localeCompare(o)==0;
                        const match2 = a.item2.name.localeCompare(o)==0;
                        if(match1 || match2){
                            returnWarning.push(a)
                        }
                    }
                    
                }

                //then check if a treatment is in patient reactions
                for(const r of patientData.reactions){
                    if(treatments.includes(r.name)){
                        patientReactions.push({item1:r});
                    }
                }
            }
        }
        //then return what was found
        res.status(200).json({
            contraindications:returnContra,
            warnings: returnWarning,
            patientReactions
        })
    }
}

module.exports = DoctorController;