var data            = require('./../controllers/data');
var test            = require('./../controllers/test');
var uncategorized   = require('./../controllers/uncategorized');

exports.initialise = function (app) {
  console.log('[BHIMA Installer] Server Route Configuration setted');

  app.get('/', uncategorized.exposeRoot);

  app.post('/data/', data.create);
  app.get('/data/', data.read);
  app.put('/data/', data.update);
  app.delete('/data/:table/:column/:value', data.deleteRecord);

  app.get('/test/', test.run);
};
