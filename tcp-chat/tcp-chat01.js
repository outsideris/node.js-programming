var net = require('net');

var server = net.createServer(function(socket) {
  socket.write('Hello World\n');
  socket.end('Good Bye\n');
});

server.listen(8000);
