const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');
const publicPath = path.join(__dirname, '../public');



var port = 3000;
var app = express();

app.use(bodyParser.json());
app.use(express.static(publicPath));

app.post('/register', (req, res) => {
  var newUser = new User(req.body);
  newUser.save().then(() => {
    res.send({
      "status": "success"
    });
  }).catch((e) =>{
    res.status(400).send(e);
  });
});
app.post('/login', (req, res) => {
  User.findByCredentials(req.body.username, req.body.password).then((user) => {
    return user.generateAuthToken('login').then((token) => {
      res.header('x-auth', token).send();
    });
  }).catch(() => {
    res.status(400).send();
  });
});

app.post('/userExist', (req, res) => {
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

app.post('/passwordRecov', (req, res) => {
  User.findOne({"username":req.body.username}).then((user) => {
    if(user != null){
      var mobile = user.phone;
      var req_mobile = req.body.phone.trim();
      if(mobile == req_mobile){
        user.passChangeRequest = true;
        user.save();
        user.generateAuthToken('passwordReset').then((token) => {
          res.header('x-auth', token).send({message: 'match'});
        });
      }
      else{
        res.send({message: 'Mobile number doesn\'t match!'});
      }
    }else{
      res.send({message: 'Invalid Username'});
    }
  }, (e) => {
    res.send({status: "not found",e});
  });
});


app.post('/passwordReset', authenticate, (req, res) => {
  var password = req.body.password;
  var username = req.user.username;
  if(!req.user.passChangeRequest){
    return res.status(401).send(e);
  }

  User.findOne({"username": username}).then((user) => {
    user.password = password;
    user.passChangeRequest = false;
    user.save().then(() => {
      res.send({"status": "success"});
    }).catch((e) => {
    res.status(401).send(e);
  });

});

});



app.listen(port, () =>{
  console.log(`Server deployed on port ${port}`);
});
