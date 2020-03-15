const express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.use('/model',express.static(__dirname + '/model'));

var server = app.listen(3001, function(){
  console.log("Express server has started on port 3001")
})