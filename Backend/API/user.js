const express = require('express');
const joi = require('joi');
const User = require('../model/user');

const router = express.Router();


//Creating API for users

router.post('/API/v1/users', (req, res, next) => {
    const id = User.users.length;

    const order = {
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        othername: joi.string(),
        title: joi.string(),
        email: joi.string().required(),
        username: joi.string().required(),
        phoneNumber: joi.string().required(),
        registered: joi.string(),
    };
    // Trying to validate entries (datas)
    const user = {
        id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        othername: req.body.othername,
        phoneNumber: req.body.phonenumber,
        registered: req.body.date,
        username: req.body.username,
        email: req.body.email,
    };
    const orderReturn = joi.validate(req.body, order);
    if (orderReturn.error) {
        next();
        return;
    }
    User.users.push(user);
    res.json({
        status: res.statusCode,
        users: [{
            id,
            message: 'User has been successfully registered',
        }, ],
    });
});

module.exports = router;