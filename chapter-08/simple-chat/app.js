
/**
 * Module dependencies.
 */

var express = require('express')
  , Chat = require('./chat');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'secret key'}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index');
});

app.post('/enter', function(req, res) {
  var isSuccess = false
    , nickname = req.body.nickname;

  if (nickname && nickname.trim() !== '') { 
    if (!Chat.hasUser(nickname)) {
      Chat.addUser(nickname);
      req.session.nickname = nickname;
      isSuccess = true;  
    }
  }

  res.render('enter', {
      isSuccess: isSuccess 
    , nickname: nickname
    , roomList: Chat.getRoomList()
  });
});

app.get('/enter', function(req, res) {
  if (req.session.nickname) {
    res.render('enter', {
        isSuccess: true 
      , nickname: req.session.nickname
      , roomList: Chat.getRoomList()
    });
  } else { 
    res.render('enter', {
        isSuccess: false 
      , nickname: ''
    });

  }
});

app.post('/makeRoom', function(req, res) {
  var isSuccess = false
    , roomName = req.body.roomname;

  if(roomName && roomName.trim() != '') {
    if (!Chat.hasRoom(roomName)) {
      Chat.addRoom(roomName);
      isSuccess = true;
    }
  }

  res.render('makeRoom', {
      isSuccess: isSuccess
    , roomName: roomName
  });
});

app.get('/join/:id', function(req, res) {
  var isSuccess = false
    , roomName = req.params.id;

  if (Chat.hasRoom(roomName)) {
    isSuccess = true; 
  }

  res.render('room', {
      isSuccess: isSuccess
    , roomName: roomName
    , nickName: req.session.nickname
    , attendants: Chat.getAttendantsList(roomName)
  });
});

app.listen(3000);

// Socket.io
require('./rooms')(app);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
