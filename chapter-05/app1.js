var rest = require('restler')
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
          console.log(data);
        });
      });
    }
}

Tweet.getTweets('#nodejs');
