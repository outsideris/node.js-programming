
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , routes = require('./routes')

var app = module.exports = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);
app.get('/join', routes.form);
app.post('/join', routes.join);

var server = http.createServer(app);
server.listen(3000);
console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
