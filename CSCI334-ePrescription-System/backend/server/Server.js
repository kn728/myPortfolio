const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')

const ErrorHandler = require('../middleware/ErrorHandler');

const DoctorController = require('../controllers/DoctorController');
const PatientController = require('../controllers/PatientController');
const AdminController = require('../controllers/AdminController');
const PharmacistController = require('../controllers/PharmacistController')


class Server {
    constructor(){

        //setup
        dotenv.config(); //.env
        mongoose.connect(process.env.MONGO_URI)//connect database
        this.app = express(); //express is for endpoint routing to controllers
        
        //global middlewares
        this.app.use(cors())
        this.app.use(express.json()) 

        //connect routes
        const patientController = new PatientController();
        const doctorController = new DoctorController();
        const adminController = new AdminController();
        const pharmacistController = new PharmacistController();


        this.app.use('/api/patient', patientController.router);
        this.app.use('/api/doctor', doctorController.router);
        this.app.use('/api/admin', adminController.router);
        this.app.use('/api/pharmacist', pharmacistController.router);

        //catch errors
        this.app.use(ErrorHandler.handle);
        
    }

    listen(){
        this.app.listen(process.env.PORT)
		console.log(`Server listening on ${process.env.PORT}`);
    }
}

module.exports = Server;