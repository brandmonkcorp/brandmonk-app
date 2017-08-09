const express = require('express');
const path = require('path');
var fs = require('fs');

var app = express();
var port = 3000;

const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));


app.listen(port, () =>{
  console.log(`Server deployed on port ${port}`);
});
