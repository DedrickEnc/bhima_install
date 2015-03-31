var express       = require('express'),
    http          = require('http'),
    fs            = require('fs'),
    config        = require('./config/environment/server'),
    db            = require('./lib/db');

var app = express();

require('./config/express')(app);
require('./config/routes').initialise(app);

http.createServer(app)
.listen(config.port, logApplicationStart);

process.on('uncaughtException', forceExit);

function logApplicationStart() {
  console.log('[BHIMA Installer] BHIMA Installer started on port :', config.port);
}

function forceExit(err) {
  console.error('[uncaughtException]', err.message);
  console.error(err.stack);
  process.exit(1);
}
