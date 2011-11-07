// 리스트 3.6
var server = require('http');
    
server.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end('Hello World\n');
}).listen(3000);
