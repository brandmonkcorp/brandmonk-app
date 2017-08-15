const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const publicPath = path.join(__dirname, '../public');


var port = 3000;
var app = express();

app.use(bodyParser.json());
app.use(express.static(publicPath));

app.post('/register', (req, res) => {
  console.log(req.body);
  var newUser = new User(req.body);
  newUser.save().then((data) => {
    return newUser.generateAuthToken();
  }).then((token) => {
    console.log(token);
    res.header('x-auth', token).send({
      "status": "success"
    });
  }).catch((e) =>{
    res.status(400).send(e);
  });
});
app.post('/login', (req, res) => {
  User.findByCredentials(req.body.username, req.body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send();
    });
  }).catch(() => {
    res.status(400).send();
  });
});

app.post('/userExist', (req, res) => {
  console.log(req.body);
  User.findOne(req.body).then((data) => {
    if(data != null){
      res.send({status: 'found'});
    }else{
      res.send({status: 'not found'});
    }

  }, (e) => {
    res.send({status: "not found",e});
  });
});

app.listen(port, () =>{
  console.log(`Server deployed on port ${port}`);
});
