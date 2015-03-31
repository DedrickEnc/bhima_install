// Export the same configuration object for use throughout modules
var config = {
  "static": "client/dest/",
  "rootFile" : "/index.html",
  "port" : 5050,
  "db" : {
    "host"     : "localhost",
    "user"     : "bhima",
    "password" : "HISCongo2013",
    "database" : "bhima"
  },
  "log" : {
    "type" : "html",
    "file" : "log"
  },
  "session" : {
    "secret" : "xopen blowfish"
  },
  "auth" : {
    "paths" : [
      "/js",
      "/assets",
      "/data"
    ]
  }
};

module.exports = config;
