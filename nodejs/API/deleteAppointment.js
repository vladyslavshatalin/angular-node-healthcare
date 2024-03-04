let singlePatientAppointments = require('../models/appointments');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports = function (req, res) {

  /*write your code here*/

  singlePatientAppointments.findOneAndRemove({ _id: req.query.appointmentId }, function (error, createdData) {
    if (error) {
      return res.status(400).json({ error: err });
    }
    return res.status(200).json({ status: "success" });
  })

}