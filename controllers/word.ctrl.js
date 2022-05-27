const express = require('express');
const wordsCtrl = express.Router();
const fs = require('fs');
const os = require('os');
const englishWords = (fs.readFileSync('./data/nouns-50.txt', 'utf-8')).split(os.EOL);
const hebrewhWords = (fs.readFileSync('./data/nouns-50-he.txt', 'utf-8')).split(os.EOL);
wordsCtrl.get('/', function (req, res) {
    let query = req.query.count;
    let words = [];
    if (query) {
        for (let i = 1; i <= Number(query); i++) {
            let random = englishWords[Math.floor(Math.random() * englishWords.length)];
            let flag = words.findIndex(w => w == random);
            if (flag !== -1) {
                while (words.findIndex(w => w == random) !== -1) {
                    random = englishWords[Math.floor(Math.random() * englishWords.length)];
                }
            }
            words.push(random);
        }
    }
    else {
        words.push(englishWords[Math.floor(Math.random() * englishWords.length)]);
    }
    console.log(words);
    res.send(words);
})
wordsCtrl.post('/', function (req, res) {
    let bodyEntries = Object.entries(req.body);
    bodyEntries.forEach(b => {
        let eIndex = englishWords.findIndex(e => e == b[0]);
        let hIndex = hebrewhWords.findIndex(e => e == b[1]);
        let user = require(`../data/user1.json`, 'utf-8');
        let userIndex = user.findIndex(u => u.sourceWord == b[0]);
        if (userIndex == -1) {
            let translate = {
                "sourceWord": b[0],
                "correctCounter": 0,
                "wrongCounter": 0
            }
            user.push(translate);
        }
        if (eIndex != -1 && hIndex != -1 && eIndex == hIndex) {
            userIndex = user.findIndex(u => u.sourceWord == b[0]);
            user[userIndex].correctCounter++;
            res.send('you answer right');
        }
        else {
            userIndex = user.findIndex(u => u.sourceWord == b[0]);
            user[userIndex].wrongCounter++;
            res.send('you answer wrong');
        }
        fs.writeFileSync(`../data/user1.json`, JSON.stringify(user));
    }
    )
}

)

module.exports = wordsCtrl;