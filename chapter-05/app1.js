var rest = require('restler');

var Tweet = {
    sinceId: '1' 
  , getTweets: function(search, callback) {
      search = encodeURIComponent(search);
    
      rest.get(
        'http://search.twitter.com/search.json?q=' + search +
        '&result_type=recent' +
        '&rpp=100' +
        '&since_id=' + Tweet.sinceId
      ).on('complete', function(data) {
        console.log(data);
      });
    }
}

Tweet.getTweets('#nodejs');
