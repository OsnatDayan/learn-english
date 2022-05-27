const express = require('express');
const userCtrl = express.Router();



userCtrl.get('/api/stats', function (req, res) {
  const token = req.headers.authorization.split('.')[1];
  const userId = JSON.parse(this.atob(token)).id;

  const ststistic = require(`../data/user${userId}.json`);
  //let rightAnswer = 0;
  //let wrongAnswer = 0;
  //ststistic.forEach(s => {
  //    rightAnswer += s.correctCounter;
  //  wrongAnswer += s.wrongCounter;
  //});
  //let resultString = `You answer ${rightAnswer} right answers and, ${wrongAnswer} wrong answers`;
  //console.log(resultString)
  res.send(ststistic);
})


module.exports = userCtrl;

