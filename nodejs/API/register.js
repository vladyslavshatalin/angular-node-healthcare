let user = require('../models/user');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports = function (req, res) {

  /*write your code here*/
  console.log("register entry", req.body)

  user.find({ uname: req.body.uname }, function (err, data) {
    console.log('inside find user', req.body.uname)
    /* if (err) {
      console.log('error')
      return res.status(400).json({ error: err });
    }
    if (data && data.length > 0) {
      console.log('user with same uname exist')
      return res.status(400).json({ error: "user already exists" });
    } */
    // const userWithoutuname = (({ uname, ...o }) => o)(req.body)
    const attemptedUser = req.body;
    const userWithoutuname = {};
    for (const key in attemptedUser) {
      if (key !== 'pwd') {
        userWithoutuname[key] = attemptedUser[key];
      }
    }
    const newUser = {
      _id: new mongoose.Types.ObjectId(),
      userName: req.body.uname,
      userWithoutuname
    }
    console.log('about to create', newUser)
    user.create(newUser, function (error, createdData) {
      /* if (error) {
        return res.status(400).json({ error: err });
      } */
      return res.status(200).json({ status: "success" });
    })
  });

}