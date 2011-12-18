var http = require('http');

http.Server(function(req, res) {
  res.writeHead(200);
  for (var i = 0; i < 1000000000; i++) {
  }
  
  res.end("hello world\n");
}).listen(8000);
