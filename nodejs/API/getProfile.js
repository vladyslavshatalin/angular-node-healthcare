let user = require('../models/user');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient



module.exports = function (req, res) {

  /*write your code here*/
  user.findOne({ _id: req.query.uid }, (error, attemptedUser) => {
    console.log(attemptedUser, "attemptedUser")
    /* if (!attemptedUser || req.body.pwd !== attemptedUser.pwd) {
       return res.status(400).json({ error: 'Username or password is wrong' });
    } */

    // Generate JWT token
    const loggedInUser = {
      uid: attemptedUser._id,
      userName: attemptedUser.userName,
      email: attemptedUser.email,
      location: attemptedUser.location,
      mobile: attemptedUser.mobile
    };
    console.log("loggedInUser", loggedInUser);
    res.json(loggedInUser);
  })

}