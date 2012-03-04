var rest = require('restler')
  , fs = require('fs');

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
        var text = "";
        data.results.forEach(function(elem, index, array) {
          text += elem.from_user + ': ' +
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
    }
}

Tweet.getTweets('#nodejs');

