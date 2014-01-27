var rest = require('restler')
  , fs = require('fs')
  , auth = require('./auth');

var Tweet = {
    sinceId: '1' 
  , getTweets: function(search, callback) {
      search = encodeURIComponent(search);
    
      // auth()에서 엑세스토큰을 얻어오고 API 요청을 할 때 헤더로 전달한다
      auth(function(err, accessToken) {
        rest.get(
          'https://api.twitter.com/1.1/search/tweets.json?q=' + search +
          '&result_type=recent' +
          '&count=100' +
          '&since_id=' + Tweet.sinceId
          , {
            'headers': {
              'Authorization': accessToken
            }
          }
        ).on('complete', function(data) {
          var text = "";
          data.statuses.forEach(function(elem, index, array) {
            text += elem.user.screen_name + ': ' +
              elem.text + ' at' + elem.created_at + '\n';
          });

          fs.open('./tweets.txt', 'a', 0666, function(err, fd) {
            if(err) { throw err; }
            var buffer = new Buffer(text);
            fs.write(fd, buffer, 0, buffer.length, null
              , function(err) {
                  fs.close(fd, function() {
                  }); 
            });
          });
        });
      });
    }
}

Tweet.getTweets('#nodejs');

