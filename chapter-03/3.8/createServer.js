var net = require('net');

var server = net.createServer(function(socket) {
  console.log('서버에 연결되었습니다.');
  socket.on('end', function() {
    console.log('연결이 종료되었습니다.');
  });

  socket.write('Hello\r\n');
});

server.listen(8124, '127.0.0.1', function() {
  console.log('서버가 %d포트로 연결되었습니다.', server.address().port);
});
