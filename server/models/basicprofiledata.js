const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/config.json');

var UserProfiledataSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    unique: true
  },
  current_position:{
    type: String,
    required: true,
  },
  current_company:{
    type: String,
    required: true,
  },
  last_degree:{
    type: String,
    default: false
  },
  last_school:{
    type: String,
    required: true
  },
  rel_stat:{
    type: String,
  }
});
var UserProfileData = mongoose.model('UserProfileData', UserProfiledataSchema);
module.exports = {UserProfileData};
