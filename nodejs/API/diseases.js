let diseases = require('../models/diseases');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports = function (req, res) {

  /*write your code here*/
  diseases.find().then(response =>{
    console.log('disease', response[0])
    console.log('diseases', response[0].diseases)
    res.status(200).json(response[0].diseases)
  }
  );
}