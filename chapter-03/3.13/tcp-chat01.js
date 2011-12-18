// 리스트 3.17
var net = require('net')
  , sockets = [];

var server = net.createServer(function(socket) {
  sockets.push(socket);
});

server.listen(8000);
console.log('TCP 채팅 서버가 시작되었습니다.');
