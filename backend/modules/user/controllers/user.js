'use strict'
const path = require('path'),
    helperLib = require(path.resolve('./utils')),
    UserProfileModel = require('../models/user.profile.model');



exports.register = (req, res) => {
    let userProfileModel = new UserProfileModel(req.body);
    //@ save object to database
    userProfileModel.save((err, saved) => {

        let resObj = {};
        let Common = new helperLib.common.common();
        if (err) {
            let message = err.code == '11000' ? `${req.body.emailId} ${helperLib.messages.alreadyTaken}` : 'Registration failed';
            resObj = Common.generateResponses(400, 'failed', message, err.code == '11000' ? null : err);
        } else {
            let result = {
                emailId: saved.emailId,
                created_at: saved.created_at
            }
            resObj = Common.generateResponses(200, 'success', helperLib.messages.accoundCreated, null, result);
        }

        res.status(resObj.statusCode).json(resObj);

    });
}


exports.login = (req, res) => {

    let conditions = { 'emailId': req.body.emailId },
        requiredParams = ['emailId', 'password'],
        resObj = {},
        fields = { __v: 0, created_at: 0, updated_at: 0, };

    let Common = new helperLib.common.common();

    //@ check if required properties are missing
    let validator = Common.validateArgument(req.body, requiredParams);

    if (validator.length > 0) {
        resObj = Common.generateResponses(400, 'failed', `${validator.join(', ')} ${helperLib.messages.absent}`);
        return res.status(resObj.statusCode).json(resObj);
    }

    UserProfileModel.findOne(conditions, fields, (err, user) => {

        let Crypt = new helperLib.crypt.crypt();

        //@ compare password with hash
        let isValid = Crypt.compareHash(req.body.password, user ? user.password : '');

        if (user && isValid) {

            //@ delete password from user object for security
            user.password = undefined;

            let Jwt = new helperLib.jwt();
            let buf = new Buffer.from(JSON.stringify(user));

            resObj = Common.generateResponses(200, 'success', helperLib.messages.loggedInSuccess, null, user);

            //@ sign token with user data
            resObj.auth = Jwt.sign(buf);
            var currentDate = new Date();
            var minutesToAdd = 30;

            var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);

            resObj.expiryTime = futureDate;

        } else if (err) {

            resObj = Common.generateResponses(500, 'failed', helperLib.messages.unableTologin, err);

        } else {

            //@ incorrect login credentials
            resObj = Common.generateResponses(400, 'failed', helperLib.messages.incorrectLoginDetail);

        }

        res.status(resObj.statusCode).json(resObj);
    });

}


exports.list = (req, res) => {
    //@ get all users
    UserProfileModel.find({}, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(result);
        }
    });
}

exports.deleteById = (req, res) => {
    //@ get all products
    UserProfileModel.deleteOne({ _id: req.params.id }, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(result);
        }
    });
}

exports.getById = (req, res) => {
    //@ get all products
    UserProfileModel.findById({ _id: req.params.id }, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(result);
        }
    });
}

exports.update = (req, res) => {
    //@ get all products
    UserProfileModel.findById({ _id: req.params.id }, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            result.first_name = req.body.first_name;
            result.last_name = req.body.last_name;
            result.emailId = req.body.emailId;
            result.gender = req.body.gender;
            result.isAdmin = req.body.isAdmin;



            var query = { '_id': req.params.id };

            UserProfileModel.findOneAndUpdate(query, result, function (err, doc) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });
        }
    });
}