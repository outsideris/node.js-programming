var cluster = require('cluster')
  , http = require('http')
  , numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    var worker = cluster.fork();
  }
} else {
  http.Server(function(req, res) {
    res.writeHead(200);
    for (var i = 0; i < 1000000000; i++) {
    }
    
    res.end("hello world\n");
  }).listen(8000);
}
