let patientDetailsObj = require('../models/patients');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports = function (req, res) {

   /*write your code here*/
   console.log("add patient entry", req.body);
   const body = req.body;
   const newPatient = Object.assign({}, { _id: new mongoose.Types.ObjectId() }, body)
   /* const newPatient = {
      _id: new mongoose.Types.ObjectId(),
      ...req.body
   } */
   console.log('about to create patient', newPatient)
   patientDetailsObj.create(newPatient, function (error, createdData) {
      return res.status(200).json({ status: "success" });
   })
}