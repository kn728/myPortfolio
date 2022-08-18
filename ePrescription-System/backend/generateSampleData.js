const AdminController = require("./controllers/AdminController");
const DoctorController = require("./controllers/DoctorController");
const PatientController = require("./controllers/PatientController");
const Patients = require('./mongo_models/patientModel')
const bcrypt = require('bcryptjs')

const generateOTCs = () =>{
    const admin = new AdminController();
    for(i=1;i<=100;i++){
        try{
            admin.addMedicalItem({body:{name:`otc ${String(i)}`, type:'otc'}},null)
        }catch(e){
            continue;
        }
    }
}

const generatePrescriptions = () =>{
    const admin = new AdminController();
    for(i=1;i<=100;i++){
        try{
            admin.addMedicalItem({body:{name:`prescription ${String(i)}`, type:'prescription'}},null)
        }catch(e){
            continue;
        }
    }
}

const generateConditions = () =>{
    const admin = new AdminController();
    for(i=1;i<=100;i++){
        try{
            admin.addMedicalItem({body:{name:`condition ${String(i)}`, type:'condition'}})
        }catch(e){
            continue;
        }
    }
}

const generateSamplePatient = async() => {
    const doctor = new DoctorController();
    const admin = new AdminController();
    const patient = new PatientController();

    //hash password - security
    const salt = await bcrypt.genSalt();
    const hash = bcrypt.hashSync("pw",salt)

    //add user to collection
    const p = await Patients.create({
        name: "John Markwell",
        medicare_id: "10987654321",
        password_hash: hash,
        phone: "0412312312",
        email: "markwell@gmail.com",
        age: 77
    })

    await admin.addContraindication({body:{
        item1:{
            name: "prescription 9",
            type: "prescription"
        },
        item2:{
            name: "prescription 10",
            type: "prescription"
        }
    }}).catch(err=>{})

    await admin.addContraindication({body:{
        item1:{
            name: "prescription 7",
            type: "prescription"
        },
        item2:{
            name: "otc 1",
            type: "otc"
        }
    }}).catch(err=>{})

    await admin.addContraindication({body:{
        item1:{
            name: "prescription 6",
            type: "prescription"
        },
        item2:{
            name: "condition 100",
            type: "condition"
        }
    }}).catch(err=>{})

    
    await Patients.findByIdAndUpdate(p._doc._id, {$push:{conditions:"condition 100"}})
    await Patients.findByIdAndUpdate(p._doc._id, {$push:{otc:"otc 1"}})
    await Patients.findByIdAndUpdate(p._doc._id, {$push:{reactions:    {
        name: "prescription 10",
        type: "prescription"
    }}})

    await Patients.findByIdAndUpdate(p._doc._id, {prescriptions: [
        {
            name:"prescription 100",
            repeats: 0,
            expiration: new Date('03/22/1999')
        },{
            name:"prescription 100",
            repeats: 0,
            expiration: new Date('03/22/2000')
        },{
            name:"prescription 100",
            repeats: 0,
            expiration: new Date('03/22/2001')
        },{
            name:"prescription 68",
            repeats: 0,
            expiration: new Date('06/22/2001')
        },{
            name:"prescription 70",
            repeats: 0,
            expiration: new Date('03/30/2002')
        },{
            name:"prescription 100",
            repeats: 0,
            expiration: new Date('04/04/2005')
        },{
            name:"prescription 40",
            repeats: 0,
            expiration: new Date('03/22/2019')
        },{
            name:"prescription 100",
            repeats: 6,
            expiration: new Date('02/13/2023')
        }
    ]})
}

const generate = () => {
    generateOTCs();
    generateConditions();
    generatePrescriptions();
    console.log('generation done')
}

module.exports = {generate, generateSamplePatient};