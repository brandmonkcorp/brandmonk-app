const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/config.json');

var UserSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    unique: true
  },
  email:{
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    validate:{
      validator: validator.isEmail,
      message: '{VALUE} is not an valid Email id!'
    }
  },
  phone:{
    type: String,
    required: true,
    length: 10
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  tokens:[{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, config.JWT_TOKEN).toString();

  user.tokens.push({access, token});
  return user.save().then(()=> {
    return token;
  });
};
UserSchema.statics.findByToken = function (token) {
  var User = this;
};
UserSchema.statics.findByCredentials = function (username, password) {
  var User = this;
  return User.findOne({username}).then((user) => {
    if(!user){
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res){
          resolve(user);
        }else{
          reject();
        }
      });
    });
  });
};
UserSchema.pre('save', function (next){
  var user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(20, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  }else{
    next();
  }
});
var User = mongoose.model('User', UserSchema);
module.exports = {User};
