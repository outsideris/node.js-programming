var net = require('net');

var client = net.connect(8124, function() {
  console.log('클라이어트가 연결되었습니다.');
  client.write('world!\r\n');
});

client.on('data', function(data) {
  console.log(data.toString());
  client.end();
});
client.on('end', function() {
  console.log('클라이언트 연결이 종료되었습니다.');
});
