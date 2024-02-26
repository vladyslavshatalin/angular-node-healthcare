let patientDetails=require('../models/patients');
let mongoose=require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient


module.exports=function(req, res) {
    
    /*write your code here*/
    
    patientDetails.findOne({ _id: req.query.patientId }, (error, attemptedPatient) => {
      console.log(attemptedPatient, "attemptedUser")
      /* if (!attemptedUser || req.body.pwd !== attemptedUser.pwd) {
         return res.status(400).json({ error: 'Username or password is wrong' });
      } */
  
      // Generate JWT token
      console.log("patient", attemptedPatient);
      res.json(attemptedPatient);
    })
  }