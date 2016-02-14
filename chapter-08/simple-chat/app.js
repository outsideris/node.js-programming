
/**
 * Module dependencies.
 */

var http = require('http')
  , path = require('path')
  , express = require('express')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , session = require('express-session')
  , Chat = require('./chat');

var app = module.exports = express();

// Configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'secret key'}))
app.use(express.static(path.join(__dirname, 'public')));


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

// error handlers
// 404 오류
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var server = http.createServer(app);
server.listen(3000);
server.on('listening', function() {
  console.log("Express server listening on port %d in %s mode", server.address().port, app.get('env'));
});

// Socket.io
require('./rooms')(server);
