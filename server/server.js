const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mailgun = require('mailgun-js');
const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');
const publicPath = path.join(__dirname, '../public');
var config = require('../config/config.json');

var api_key = config.mailgun_api_key;
var domain = config.mailgun_main_domain;
var from_who = "BrandMonk Team<support@brandmonk.online>";

var port = 3000;
var app = express();

app.use(bodyParser.json());
app.use(express.static(publicPath, {extensions:['html']}));

app.get('/auth', authenticate, (req, res) => {
  res.send();
});

app.post('/registerUser', (req, res) => {
  var newUser = new User(req.body);
  var nameUser;
  newUser.save().then((user) => {
    nameUser = user.name;
    console.log(user.name, 'registered activated:',user.activated, ' setup:',user.setupCompleted);
    return user.generateAuthToken('register').then((token) => {
      res.header('x-auth', token).send({
        "status": "success"
      });
      sendActivateMail(user, token);
    });
  }).catch((e) =>{
    console.log('Registration failed for', nameUser );
    res.status(400).send(e);
  });
});

var sendActivateMail = (user, token) => {
  var mail = new mailgun({apiKey: api_key, domain: domain});
  var mailBody = {
      from: from_who,
      to: user.email,
      subject: 'Activate your BrandMonk account!',
      html: `Hi,${user.name}! A very hearty welcome at BrandMonk Family.
      You are just one step away.<a href="https://www.brandmonk.online/activate?auth=${token}">Activate your account</a>
       and start earning.`
    };
    mail.messages().send(mailBody, function (err, body) {
        if (err) {
            console.log("Mail sent failed to", user.email);
        }
        else {
            console.log('Mail Sent to', user.email);
        }
    });
};
app.get('/activateUser', authenticate, (req, res) => {
  var user = req.user;
    console.log('activation request arrived from',user.name, ' Activation Status:', user.activated);
    if(!user.activated){
      user.activated = true;
      user.save().then( function () {
        console.log('User activation success for', user.name);
        res.send({'message': 'done'});
      }).catch((e) => {
        console.log('user activation failed for', user.name);
        res.status(400).send();
      });
    }else{
      res.send({'message': 'activated'});
      console.log(user.name,'is already activated');
    }
});

app.get('/profileData', authenticate,  (req, res) => {
  var profileActivated = req.user.activated;
  var setupCompleted = req.user.setupCompleted;
  var sendData = {
    "username": req.user.username,
    "name" : req.user.name,
    "email": req.user.email,
    "mobile": req.user.phone
  };
  if(profileActivated){
    if(!setupCompleted)
      res.send({"message": 'activated', sendData});
    else {
      res.send({'message': 'redirect'});
    }
  }else{
    var sendData = {
      'username': req.user.username,
      'name': req.user.name,
      'email': req.user.email
    };
    res.send({'message': 'deactivated', sendData});
  }
});

app.post('/loginUser', (req, res) => {
  User.findByCredentials(req.body.username, req.body.password).then((user) => {
    console.log(user.name, ' logged in');
    return user.generateAuthToken('login').then((token) => {
      if(user.activated){
        if(user.setupCompleted){
          res.header('x-auth', token).send({'message': 'home'});
        }else{
          res.header('x-auth', token).send({'message': 'profile'});
        }
      }else{
          res.header('x-auth', token).send({'message': 'activate'});
      }

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
      console.log('password recovery request from', user.name);
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
      console.log('password recovery successfull for', user.name);
      res.send({"status": "success"});
    }).catch((e) => {
      res.status(401).send(e);
    });
  });
});

app.post('/postProfileData', authenticate, (req, res) => {
  console.log('setup profile data sent from', req.user.name);
  var user = req.user;
  user.setupCompleted = true;
  user.save().then(() => {
    res.send({'message': 'done'});
  }).catch((e) => {
    res.status(401).send();
  });
});



app.listen(port, () =>{
  console.log(`Server deployed on port ${port}`);
});
