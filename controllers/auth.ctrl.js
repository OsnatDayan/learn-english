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
    const jwtKey = jwt.sign(usersArr, "myKey");
    res.type('.txt').send(jwtKey);

})

module.exports = authCtrl;