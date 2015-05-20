
'use strict';

var express = require('express');
var config = require('./environment');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
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

  if ('production' === env) {
    app.use(express.static(path.join(config.root, 'public')));
    app.use(morgan('dev'));
  } else {
    app.use(express.static(path.join(config.root, 'client')));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
  
}