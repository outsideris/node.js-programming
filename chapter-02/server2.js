// 리스트 2.6
var server = require('http');
    
server.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end('Hello World\n');
}).listen(3000, 'localhost');

console.log('서버가 http://localhost:3000으로 시작되었습니다.');
