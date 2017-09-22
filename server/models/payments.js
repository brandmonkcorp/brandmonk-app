const mongoose = require('mongoose');

var PaymentSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    unique: true
  },
  adtrack:{
    video:{
      type : Number,
      default: 0
    },
    tv:{
      type : Number,
      default: 0
    },
    radio:{
      type : Number,
      default: 0
    },
    magazine:{
      type : Number,
      default: 0
    },
    billboard:{
      type : Number,
      default: 0
    },
    internet:{
      type : Number,
      default: 0
    },
  },
  revenue:{
    totalearning:{
      type : Number,
      default: 0
    },
    discountcoupon:{
      type : Number,
      default: 0
    },
    redeemed:{
      type : Number,
      default: 0
    },
    remaining:{
      type : Number,
      default: 0
    }
  },
  sharerevenue:{
    referrals:{
      type : Number,
      default: 0
    },
    giftvoucher:{
      type : Number,
      default: 0
    },
    share:{
      type : Number,
      default: 0
    }
  }
});
var PaymentStat = mongoose.model('PaymentStat', PaymentSchema);
module.exports = {PaymentStat};
