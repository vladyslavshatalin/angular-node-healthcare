let user = require('../models/user');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('../config');
const mongo = require('mongodb').MongoClient

module.exports = function (req, res) {

    /*write your code here*/
    console.log("edit profile entry", req.body);
    user.updateOne({ _id: req.body.uid }, { email: req.body.email, mobile: req.body.mobile, location: req.body.location }, { runValidators: true })
        .then(function (updatedData) {
            var data = { message: "success", data: updatedData };
            // const userWithoutPassword = (({ pwd, ...o }) => o)(updatedData)
            const userWithoutPassword = {};
            for (const key in updatedData) {
                // if (key !== 'pwd') {
                userWithoutPassword[key] = updatedData[key];
                // }
            }
            return res.status(200).json(userWithoutPassword);
        });
}
