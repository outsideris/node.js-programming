// 리스트 3.19
var net = require('net')
  , sockets = [];

var server = net.createServer(function(socket) {
  sockets.push(socket);

  socket.on('data', function(data) {
    for (var i = 0; i < sockets.length; i++) {
      if (sockets[i] !== socket) {
        sockets[i].write(socket.remoteAddress + '님의 말: ' + data);
      }
    }
  });

  socket.on('end', function() {
    var i = sockets.indexOf(socket);
    sockets.splice(i, 1);
  });
});

server.listen(8000);
console.log('TCP 채팅 서버가 시작되었습니다.');
