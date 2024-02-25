let appointments = require('../models/appointments');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports = function (req, res) {

  /*write your code here*/
  if (req.body.patientId) {
    appointments.findOne({ patientId: req.body.patientId }).then(appointmentFound => {
      console.log("single appointment", req.body.patientId, appointmentFound)
      res.status(200).json([appointmentFound])
    });
    return;
  }
  appointments.find().then(appointmentsFound => {
    console.log("single appointment", req.body.patientId, appointmentsFound)
    res.status(200).json(appointmentsFound)
  });
}