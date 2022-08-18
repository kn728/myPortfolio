# API Endpoints
Feel free to message the team a request for another endpoint that you might need, including what you will send and what you will need back (incl. datatypes).
Please mention whether authorization etc is required.

## Patient
POST `/patient/login`
Description: returns a JWT token, to be stored in local storage and sent back in authorization header, google how to do that if unsure.  
Authorization: no  
Body 
```
{
medicare_id: String,
password: String
}
```
Returns on status 200
```
{
jwt: String,
name: String,
age: String,
email: String,
medicare_id: String,
phone: String
}
```
<br/>

POST `/patient/register`  
Description: for the doctor to register the patient when they visit the office and get their first script with the system.   
Authorization: no  
Body
```
{
name: String,
medicare_id: String,
password: String,
phone: String,
email: String,
age: Number,

}
```
returns status 200 on success
<br/>

GET `/patient/otc`
Description: get list of otc for a patient
Authorization: yes  

Returns on status 200:
```
{
    otc: String[]
}
```
<br/>

POST `/patient/otc/add`
Description: patient adds otc medication that they take. This medication must be in the system for it to be accepted.  
Authorization: yes  
Body:
```
{
otc: String
}
```
Returns a status 200 on success
<br/>

POST `/patient/otc/search`  
Description: patient searches through their otc history by name  
Authorization: yes  
Body: 
```
{
query: String
}
```

Returns on status 200
```
{
payload: String[{
              name: String
              purchase_date: Date
          }]
}
```
<br/>

POST `/patient/prescription/add`  
Authorization: yes (doctor)
Body:
```
{
    prescription_name: String,
    repeats: Number,
    expiration: Date,
    medicare_id: String
}
```
returns a status 200 on success
<br/>

POST `/patient/prescription/search`  
Authorization: yes  
Body: 
```
{
query: String
}
```

Returns on status 200
```
{
name: String,
expiration: Date,
repeats: Number
}
```
<br/>

GET `/patient/prescription`  
Authorization: yes
Description: get all prescriptions for a patient  
Body:
```
{
    prescriptions: [{name:String, expiration: Date, repeats: Number}]
}
```

POST `/patient/condition/add`  
Description: patient adds a physical condition that they have to the system  
Authorization: yes  
Body:
```
{
condition: String
}
```
Returns status 200 on success
<br/>

POST `/patient/reaction/add`  
Description: patient adds an allergy or adverse reaction that they have to the system. type can be one of these values: ['otc', 'prescription']
Authorization: yes  
Body:
```
{
name: String,
type: String,
}
```
Returns status 200 on success

## Pharmacist



## Doctor

POST `/doctor/register`  
Description: for the admin user to register a doctor  
Authorization: no  
Body:
```
{
email: String,
password: String
}
```
Return status 200 on success

<br/>

POST `/doctor/login`  
Description: doctor login, returns jwt token to be stored in local storage and sent in authorization header, google how to do that.
Authorization: no  
Body:
```
{
email: String
password: String
}
```
Returns on status 200
```
{
jwt: String
}
```


## Admin

POST `/admin/register`  
Description: register an admin user  
Authorization: no  
Body:
```
{
admin_id: String,
password: String
}
```
Return status 200 on success
<br/>

POST `/admin/login`  
Description: admin login, returns jwt token to be stored in local storage and sent in authorization header, google how to do that.  
Authorization: no  
Body:
```
{
admin_id: String
password: String
}
```
Returns on status 200
```
{
jwt: String
}
```
<br/>


GET `/admin/medical`  
Description: get all otc treatments, prescription treatments, and conditions that are registered in the system currently  
Authorization: no  

Return on status 200:
```
{
    items: [{name:String, type:String}]
}
```
<br/>

GET `/admin/contraindication`  
Description: get all contraindications, which are tuples. Members are either otc, prescription or condition
Authorization: no  

Return on status 200:
```
{
    sets: [{
        item1:{name:String, type:String},
        item2:{name:String, type:String}
    }]
}
```
<br/>

POST `/admin/medical/add`  
Description: add a medical otc, prescription or condition to the system. type can be one of those values.
Authorization: yes  
Body:
```
{
name: String
type: String
}
```
Return status 200 on success
<br/>

POST `/admin/contraindication/add`  
Description: add a contraindication set. type can be otc, prescription or condition.
Authorization: yes  
Body:
```
{
    item1:{name:String, type:String},
    item2:{name:String, type:String}
}
```
Return status 200 on success
<br/>