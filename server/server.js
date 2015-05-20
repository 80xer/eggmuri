// server.js - 2015.05.20 - 80xer

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

require('./config/express')(app);
require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});