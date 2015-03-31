
var q = require('q');

var cfg = require('./../config/environment/server').db;
var uuid = require('./guid');

var db, con, supportedDatabases, dbms;

// Initiliase module on startup - create once and allow db to be required anywhere
function initialise() {
  'use strict';

  cfg = cfg || {};

  dbms = cfg.dbms || 'mysql';

  supportedDatabases = {
    mysql    : mysqlInit
  };
  con = supportedDatabases[dbms](cfg);

  flushUsers(con);
}

function exec(sql, params) {
  var defer = q.defer();

  console.log('[db] [execute]: ', sql);
  con.getConnection(function (err, connection) {
    if (err) { return defer.reject(err); }
    connection.query(sql, params, function (err, results) {

      if (err) { return defer.reject(err); }
      connection.release();
      defer.resolve(results);
    });
  });

  return defer.promise;
}

function execute(sql, callback) {
  // This fxn is formated for mysql pooling, not in all generality
  console.log('[DEPRECATED] [db] [execute]: ', sql);

  con.getConnection(function (err, connection) {
    if (err) { return callback(err); }
    connection.query(sql, function (err, results) {
      connection.release();
      if (err) { return callback(err); }
      return callback(null, results);
    });
  });
}


function getSupportedDatabases() {
  return Object.keys(supportedDatabases);
}

function mysqlInit (config) {
  'use strict';
  var db = require('mysql');
  return db.createPool(config);
}

function flushUsers (db_con) {
  'use strict';
  var permissions, reset;

  permissions = 'SET SQL_SAFE_UPDATES = 0;';
  reset = 'UPDATE `user` SET `logged_in`=\'0\' WHERE `logged_in`=\'1\';';

  db_con.getConnection(function (err, con) {
    if (err) { throw err; }
    con.query(permissions, function (err) {
      if (err) { throw err; }
      con.release();
      db_con.getConnection(function (err, con) {
        if (err) { throw err; }
        con.query(reset, function (err) {
          if (err) { throw err; }
        });
      });
    });
  });
}

function promiseQuery(connection, sql) {
  var deferred = q.defer();

  console.log('[db] [Transaction Query]', sql);
  connection.query(sql, function (error, result) {
    if (error) { return deferred.reject(error); }
    return deferred.resolve(result);
  });
  return deferred.promise;
}

function sanitize(x) {
  return con.escape(x);
}

module.exports = {
  initialise : initialise,
  exec : exec,
  execute : execute,
  sanitize : sanitize
};

