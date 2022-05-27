const express = require('express');
const jwt = require('jsonwebtoken');
const authCtrl = express.Router();

authCtrl.post('/login', function (req, res) {
    const detail = {
        email: req.body["email"],
        password: req.body["password"],
    };
    const usersArr = require('../data/users.json').find(u => u.email == detail.email && u.password == detail.password);
    usersArr && delete usersArr['password'];
    const jwtKey = jwt.sign(usersArr, "f40c189314dafd35aab9d71a29ee32cc");
    res.type('.txt').send(jwtKey);

})

module.exports = authCtrl;
