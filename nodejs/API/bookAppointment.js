let appointments = require('../models/appointments');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports = function (req, res) {
   /*write your code here*/
   console.log("book appopintment entry", req.body)

   appointments.find({ fname: req.body.fname, lname: req.body.lname, AppointmentDate: req.body.AppointmentDate }, function (err, data) {
      console.log('inside find appointment', req.body.fname)
      /* if (err) {
         console.log('error')
         return res.status(400).json({ error: err });
      }
      if (data && data.length > 0) {
         console.log('user with same appointment exist')
         return res.status(400).json({ error: "appointment already exists" });
      } */
      const newAppointment = {
         _id: new mongoose.Types.ObjectId(),
         fname: req.body.fname,
         lname: req.body.lname,
         disease: req.body.disease,
         priority: req.body.priority,
         AppointmentDate: req.body.AppointmentDate,
         patientId: req.body.patientId,
         bookingTime: req.body.bookingTime
      }

      /* const newAppointment = {
         _id: new mongoose.Types.ObjectId(),
         ...req.body
      } */
      console.log('about to create appointment', newAppointment)
      appointments.create(newAppointment, function (error, createdData) {
         if (error) {
            return res.status(400).json({ error: err });
         }
         return res.status(200).json({ status: "success" });
      })
   });

}