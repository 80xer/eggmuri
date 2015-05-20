
'use strict';

var express = require('express');
var config = require('./environment');
var compression = require('compression'); //Gzip
var bodyParser = require('body-parser');  //Post body
var methodOverride = require('method-override'); //바디파싱후 메서드 재정의
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var path = require('path');

module.exports = function (app) {
  var env = app.get('env');

  app.set('port', process.env.PORT || 3000);
  app.set('views', config.root + '/server/views');
  app.set('view engine', 'ejs');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(morgan('dev'));

  app.use(favicon(path.join(config.root, 'client', 'favicon.png')));
  app.use(express.static(path.join(config.root, 'client')));
  app.use(errorHandler()); // Error handler - has to be last

  // if ('production' === env) {
  //   app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
  //   app.use(express.static(path.join(config.root, 'public')));
  // } else {
  //   app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
  //   app.use(express.static(path.join(config.root, 'client')));
  //   app.use(errorHandler()); // Error handler - has to be last
  // }
  
}