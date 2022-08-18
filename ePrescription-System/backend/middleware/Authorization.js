const jwt = require('jsonwebtoken')
const Doctors = require('../mongo_models/doctorModel');
const Patients = require('../mongo_models/patientModel');
const Pharmacists = require('../mongo_models/pharmacistModel');
const Admins = require('../mongo_models/adminModel');
const asyncHandler = require('express-async-handler')

class Authorization{

    static checkJWToken(allowedUsers=['doctor','admin','pharmacist','patient']){
        //this function returns a function that is the middleware.
        return asyncHandler(async (req, res, next) => {
            if(!req.headers.authorization){
                throw new Error('no authorization')
            }
            const token = req.headers.authorization.split(' ')[1]; 
            if(token){
                const decode = jwt.verify(token, process.env.SECRET)
                if(allowedUsers.includes('patient')){
                    const user = await Patients.findById(decode.id);
                    if(user){
                        req.user_id = decode.id;
                        next()
                        return;
                    }
                }
                if(allowedUsers.includes('pharmacist')){
                    const user = await Pharmacists.findById(decode.id);
                    if(user){
                        req.user_id = decode.id;
                        next()
                        return;
                    }
                }
                if(allowedUsers.includes('doctor')){
                    const user = await Doctors.findById(decode.id);
                    if(user){
                        req.user_id = decode.id;
                        next()
                        return;
                    }
                }
                if(allowedUsers.includes('admin')){
                    const user = await Admins.findById(decode.id);
                    if(user){
                        req.user_id = decode.id;
                        next()
                        return;
                    }
                }
    
                throw new Error('not authorized');
            }else{
                throw new Error('not authorized')
            }
        })
        
    }

    static generateJWToken(id){
        const token = jwt.sign({id}, process.env.SECRET);
        return token;
    }
}

module.exports = Authorization