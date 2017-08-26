const {User} = require('../models/user');

var authenticate = (req, res, next) => {
  var userName = 'NLI';
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    userName = user.name;
    if(!user){
      return Promise.reject();
    }
    console.log(userName, ' :connected status: authorized ip:',req.ip);
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    console.log(userName, ' :connected status: unauthorized ip:',req.ip);
    res.status(401).send();
  });
}

module.exports = {authenticate};
