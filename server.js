var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var blacklist = {
  selfie: 'self-portrait',
  yummers: 'delicious',
  outchea: 'are out here',
  bruh: 'wow',
  doge: 'pug',
  cilantro: 'soap',
  bae: 'loved one',
  swag: 'style',
  yolo: 'carpe diem'
};

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  var message = req.body.message.toLowerCase();
  var messageArr = message.split(' ');
  for (var i = 0; i < messageArr.length; i++) {
    for (var keys in blacklist){
      if (messageArr[i] === keys){
        messageArr[i] = blacklist[keys];
      }
    }
  }
  message = messageArr.join(' ');
  req.body.message = message;
  next();
});

app.post('/message', function (req, res) {
  var message = req.body.message;
  res.send('This message has been sent:\n' + message);
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});