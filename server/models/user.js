const mongoose = require('mongoose');

var User = mongoose.model('User', {
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
  password:{
    type: String,
    required: true,
    minlength: 4
  }
});

module.exports = {User};