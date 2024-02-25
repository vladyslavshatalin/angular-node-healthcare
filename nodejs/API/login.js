let user = require('../models/user');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const { response } = require('express');
const mongo = require('mongodb').MongoClient



module.exports = function (req, res) {

   /*write your code here*/
   console.log("login entry", req.body)

   user.findOne({ userName: req.body.uname, pwd: req.body.pwd }, (error, attemptedUser) => {
      console.log(attemptedUser, "attemptedUser")
      /* if (!attemptedUser || req.body.pwd !== attemptedUser.pwd) {
         return res.status(400).json({ error: 'Username or password is wrong' });
      } */

      // Generate JWT token
      const token = jwt.sign({ _id: attemptedUser._id }, config.secret, {
         expiresIn: '1h', // Set token expiration time
      });
      const loggedInUser = {
         token,
         uid: attemptedUser._id,
         success: true,
         message: "Authentication successful!",
         userName: attemptedUser.userName,
         email: attemptedUser.email,
         location: attemptedUser.location,
         mobile: attemptedUser.mobile
      };
      console.log("loggedInUser", loggedInUser);
      res.json(loggedInUser);
   })

   /* catch (error) {
         console.error(error);
         res.status(400).json({ message: 'Server error.' });
      } */


}