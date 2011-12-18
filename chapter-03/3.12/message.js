var cluster = require('cluster');
var http = require('http');
var numReqs = 0;

if (cluster.isMaster) {
  // 워커 생성
  for (var i = 0; i < 2; i++) {
    var worker = cluster.fork();
    
    worker.on('message', function(msg) {
      if (msg.cmd && msg.cmd == 'notifyRequest') {
        numReqs++;
      }
    });
  }

  setInterval(function() {
    console.log("numReqs =", numReqs);
  }, 1000);
} else {
  // 워커프로세스는 HTTP 서버를  생성한다.
  http.Server(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
    // 마스터 프로세스로 메세지를 보낸다. 
    process.send({ cmd: 'notifyRequest' });
  }).listen(8000);
}
