const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/config.json');

var UserdataSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    unique: true
  },
  address:{
    type: String,
    required: true,
  },
  dob:{
    type: String,
    required: true,
  },
  marital_status:{
    type: String,
    default: false
  },
  ad_language:[{
    type: String,
    required: true
  }],
  feedback_language:{
    type: String,
  },
  ad_preference:[{
    type: String,
    required: true
  }],
  gender:{
    type: String,
    required: true
  },
  education:{
    type: String,
    required: true
  },
  preferred_ad_type:{
    type: String,
    required: true
  },
  aadhaar:{
    type: String,
    length: 10
  },
  PAN:{
    type: String
  }
});
var UserData = mongoose.model('UserData', UserdataSchema);
module.exports = {UserData};
