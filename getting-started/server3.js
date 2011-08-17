var server = require('http');
    
server.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type':'text/plain'});
  setTimeout(function() {
    res.end('World\n');
  },2000);
  res.write('Hello\n');
}).listen(3000);
