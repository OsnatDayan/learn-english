const wordsCtrl = require('./controllers/word.ctrl');
const express = require('express');
const userCtrl = require('./controllers/user.ctrl');
const authCtrl = require('./controllers/auth.ctrl');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 5678;
app.use(express.json());
app.use('/api/auth', authCtrl);

app.use(function (req, res, next) {
    try {
        const [type, token] = req.headers.authorization.split(' ');
        const isCorrect = jwt.verify(token, "f40c189314dafd35aab9d71a29ee32cc");
        next();
    }
    catch (ex) {
        res.status(401).send();
    }
})
app.use('/api/word', wordsCtrl);
app.use('/', userCtrl);

app.listen(PORT, () => console.log(`server started at port ${PORT}`));
