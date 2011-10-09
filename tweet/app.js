var rest = require('restler')
  , fs = require('fs')

var Tweet = {
  sinceId: '1' 
, getTweets: function(search, callback) {
    search = encodeURIComponent(search);
    
    var setting = {
      resultType: 'recent'
    , rpp: 100
    };

    rest.get(
      'http://search.twitter.com/search.json?q=' + search +
      '&result_type=' + setting.result_type +
      '&rpp=' + setting.rpp +
      '&since_id=' + this.sinceId
    ).on('complete', function(data) {
        callback(data);
    });
  }
, setSinceId: function(id) {
    this.sinceId = id;
  }
}

var isOpened = false;

fs.readFile('./maxid.txt', function(err, data) {
  if (err) { Tweet.setSinceId(1); }

  Tweet.setSinceId(data);

  Tweet.getTweets('#love', function(data) {
    var text = "";
    data.results.forEach(function(elem, index, array) {
      text += elem.from_user + ': ' + elem.text + ' at' + elem.created_at + '\n';
    });

    fs.open('./tweets.txt', 'a', 0666, function(err, fd) {
      if(err) { throw err; }
      isOpened = true;
      fs.write(fd, new Buffer(text), null, null, null, function(err) {
        fs.close(fd, function() {
          isOpened = false; 
          fs.writeFile('./maxid.txt', data.max_id.toString(), function(err) {});
        }); 
      });
    });
  });

});
