var repo = require('./repository');

module.exports = function(app) {
  app.get('/', function(req, res){
    res.render('index', {
      title: 'Express'
    });
  });

  app.get('/join', function(req, res) {
    res.render('join-form', {
      title: 'Express'
    });
  });

  app.post('/join', function(req, res) {
    repo.insertUser(req.body);
    repo.findUserByName(req.body.name, res);
  });

  return app;
}
