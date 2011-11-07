// 리스트 4.7
var net = require('net');

var server = net.createServer(function(socket) {
  socket.write('Hello World\n');
  socket.end('Good Bye\n');
});

server.listen(8000);
console.log('TCP 채팅 서버가 시작되었습니다.');
