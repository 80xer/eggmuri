// server.js - 2015.05.20 - 80xer

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// set all environments
app.set('port', process.env.PORT || 3000);
app.set('veiws', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// pages route

// index page
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});