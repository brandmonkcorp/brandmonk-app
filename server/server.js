const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const publicPath = path.join(__dirname, '../public');

var port = 3000;
var app = express();

app.use(bodyParser.json());
app.use(express.static(publicPath));

app.post('/register', (req, res) => {
  console.log(req.body);
  var newUser = new User(req.body);
  newUser.save().then((doc) => {
    res.send({
      "status": "success",
      "name": doc.name
    });
  }, (e) =>{
    res.status(400).send(e);
  });
});
app.post('/login', (req, res) => {

});

app.get('/userExist', (req, res) => {

});

app.listen(port, () =>{
  console.log(`Server deployed on port ${port}`);
});
