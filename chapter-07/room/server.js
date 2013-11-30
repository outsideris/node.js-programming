var http = require('http')
  , fs = require('fs')
  , path = require('path')
  , io = require('socket.io');

var server = http.createServer(function(req, res) {
  var filename = path.join(process.cwd(), req.url);

  fs.exists(filename, function(exists) {
    if(!exists) {
      res.writeHead(404, {"Content-Type": "text/plain"});
      res.write("404 Not Found\n");
      res.end();
      return;
    }

    fs.readFile('./index.html', encoding='utf-8', function(err, data) {
      if (err) {
        res.writeHead(500, {"Content-Type": "text/plain"});  
        res.write(err + "\n");  
        res.end();  
        return;  
      } 
      res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"}); 
      res.end(data);
    }); 
  }); 
});

server.listen(3000);

io = io.listen(server);

io.configure(function(){
  io.enable('browser client etag');
  io.set('log level', 3);
  io.set('transports', [
    'websocket'
    , 'flashsocket'
    , 'htmlfile'
    , 'xhr-polling'
    , 'jsonp-polling'
    ]);

});

io.sockets.on('connection', function(socket) {
  console.log('connected');
  socket.on('disconnect', function() {
    console.log('Good-bye'); 
  });

  socket.on('message', function(msg) {
    console.log(msg);
    socket.send('서버쪽 메시지 테스트');
  });

  socket.send('send로 보내는 메시지', function() {
    console.log('메시지가 전달되었습니다.');
  });

  socket.on('from client', function(data) {
    console.log(data.text);
    socket.emit('from server', {text:'서버에서 보낸 emit'}, function(res) {
      console.log('from server 이벤트:' + res); 
    });
  });

  var timer = setInterval(function() {
     socket.volatile.emit('as volatile', new Date()); 
  }, 2000);

  setTimeout(function() {
    clearInterval(timer);
  }, 10000);
});

var another = io.of('/another').on('connection', function(socket) {
  socket.send('another네임스페이스로 보낸 send 메시지');

  socket.on('nickname', function(nickname) {
    socket.set('nickname', nickname, function() {
       console.log('닉네임이 저장되었습니다.');
    });
    socket.get('nickname', function(err, nickname) {
      socket.emit('nickname', '닉네임: ' + nickname);
    });
  });

  socket.on('joinroom', function(msg) {
    console.log(msg);
    socket.join('some room'); 
  });

  socket.on('leaveroom', function(msg) {
    console.log(msg);
    socket.leave('some room'); 
  });
  
  var timer = setInterval(function() {
     var time = new Date();
     socket.broadcast.to('some room').emit('in room', time); 
  }, 2000);
});

console.log("서버가 시작되었습니다. http://localhost:3000");
