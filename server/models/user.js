const mongoose = require('mongoose');

var User = mongoose.model('User', {
  name:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  email:{
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  phone:{
    type: String,
    required: true,
    length: 10
  },
  password:{
    type: String,
    required: true,
    minlength: 4
  }
});

module.exports = {User};
