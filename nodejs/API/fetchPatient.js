let patientDetails = require('../models/patients');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports = function (req, res) {

  /*write your code here*/
  patientDetails.find().then(response =>
    res.status(200).json(response)
  );
}