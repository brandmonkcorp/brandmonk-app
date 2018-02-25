const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mailgun = require('mailgun-js');
const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {UserData} = require('./models/basicdata');
const {UserProfileData} = require('./models/basicprofiledata');
const {PaymentStat} = require('./models/payments');
const {authenticate} = require('./middleware/authenticate');
const publicPath = path.join(__dirname, '../public');
var config = require('../config/config.json');
var multer = require('multer')
var api_key = config.mailgun_api_key;
var domain = config.mailgun_main_domain;
var from_who = "BrandMonk Team<support@brandmonk.online>";
var cloudinary = require('cloudinary');
var port = 3000;
var app = express();
app.use(bodyParser.json());

app.use(express.static(publicPath, {extensions:['html']}));
app.use('/Fuck_You_For_Inspecting_My_Code', express.static('HoriBol'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/auth', authenticate, (req, res) => {
  if(!req.user.isLoggedIn){
    return res.status(401).send();
  }
  res.send();
});

app.get('/resetPass', authenticate, (req, res) => {
  if(req.user.passChangeRequest){
    sendPassChangeMail(req.user, req.token);
    res.send();
  }else{
    res.status(401).send();
  }
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

var sendPassChangeMail = (user, token) => {
  var mail = new mailgun({apiKey: api_key, domain: domain});
  var mailBody = {
      from: from_who,
      to: user.email,
      subject: 'Password Reset Request',
      html: `Hi,${user.name}! Follow the link to
      <a href="https://www.brandmonk.online/reset-password?auth=${token}">reset your password</a>
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
app.post('/resend-activation', authenticate, (req, res) => {
  var user = req.user;
  var token = req.token;
  sendActivateMail(user, token);
  res.send();
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
  if(!req.user.isLoggedIn){
    return res.status(401).send();
  }
  var profileActivated = req.user.activated;
  var setupCompleted = req.user.setupCompleted;
  var sendData = {
    "name" : req.user.name,
    "email": req.user.email,
    "mobile": req.user.phone
  };
  var data = req.user;
  if(profileActivated){
    if(!setupCompleted)
      res.send({"message": 'activated', sendData});
    else {
      res.send({'message': 'redirect', data});
    }
  }else{
    var sendData = {
      'name': req.user.name,
      'email': req.user.email
    };
    res.send({'message': 'deactivated', sendData});
  }
});

app.post('/logoutUser', authenticate, (req, res) => {
  var user = req.user;
  user.isLoggedIn = false;
  User.removeToken(req.token).then(() =>{
    user.save().then(() => {
      console.log(user.name,'logged out.')
      res.send();
    });
  });
});

app.post('/loginUser', (req, res) => {
  User.findByCredentials(req.body.email, req.body.password).then((user) => {
    console.log(user.name, ' logged in');
    user.isLoggedIn = true;
    user.save().then(() => {
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
  User.findOne({"email":req.body.username}).then((user) => {
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
  var email = req.user.email;
  console.log(password, ' ', email);
  if(!req.user.passChangeRequest){
    return res.status(401).send(e);
  }
  User.findOne({"email": email}).then((user) => {
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
  console.log(req.body);
  var basicData = req.body.basicdata;
  var basicProfileData = req.body.basicprofiledata;
  basicData.email = req.user.email;
  basicProfileData.email = req.user.email;
  var user = req.user;
  var newUserData = new UserData(basicData);
  newUserData.save().then( (data) => {
    var newProfileData = new UserProfileData(basicProfileData);
    newProfileData.save().then( () => {
      user.setupCompleted = true;
      user.save().then(() => {
        res.send({'message': 'done'});
      }).catch((e) => {
        res.status(400).send();
      });
    }).catch((e) => {
      res.status(400).send();
    });;
  });
});
var em;
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './HoriBol')
	},
	filename: function(req, file, callback) {

		callback(null, em + '.png');
	}
})

app.post('/api/file',authenticate, function(req, res) {
  console.log('req arrived');
  em = req.user.email;
  //console.log(em);
	var upload = multer({
		storage: storage,
		 fileFilter: function(req, file, callback) {
		 	var ext = path.extname(file.originalname)
		 	if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.JPEG' && ext !== '.JPG' && ext !== '.PNG') {
		 		return callback(res.end('Only images are allowed'), null);
		 	}
		 	callback(null, true);
		 }
	}).single('userFile');
	upload(req, res, function(err) {
		res.send({'message': 'success'});
    console.log('file uploaded', err);
	})
})

app.listen(port, () =>{
  console.log(`Server deployed on port ${port}`);
});
app.get('/paymentData', authenticate, function(req, res){
  var email = req.user.email;
  var name  = req.user.name;
  PaymentStat.findOne({'email': email}).then( (data) => {
    //console.log(data);
    res.send({"name": name, data});
  }).catch( () => {
    res.status(400).send();
  });

});
app.get('/getNameAndEmail', authenticate, function(req, res){
  var email = req.user.email;
  var name  = req.user.name;
  PaymentStat.findOne({'email': email}).then( (data) => {
    //console.log(data);
    res.send({"name": name, "email": email});
  }).catch( () => {
    res.status(400).send();
  });

});
app.get('/mobData', authenticate, function(req, res){
  var email = req.user.email;
  var name  = req.user.name;
  User.findOne({'email': email}).then( (data) => {
    //console.log(data);
    res.send({"name": name, data});
  }).catch( () => {
    res.status(400).send();
  });

});
