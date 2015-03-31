var express       = require('express');
var compress      = require('compression');
var bodyParser    = require('body-parser');
var session       = require('express-session');
var cookieParser  = require('cookie-parser');
var cfg           = require('./../config/environment/server');

module.exports = function (app) {
  app.use(compress());
  app.use(bodyParser());
  app.use(cookieParser());
  app.use(session(cfg.session));

  app.use('/css', express.static('client/dest/css', { maxAge : 10000 }));
  app.use('/lib', express.static('client/dest/lib', { maxAge : 10000 }));
  app.use('/i18n', express.static('client/dest/i18n', { maxAge : 10000 }));
  app.use(express.static(cfg.static, { maxAge : 10000 }));
  console.log('[BHIMA Installer] Express Framework Loaded');
};
