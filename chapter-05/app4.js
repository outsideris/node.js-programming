var rest = require('restler')
  , fs = require('fs')
  , schedule = require('node-schedule');

var Tweet = {
    sinceId: '1' 
  , isOpened: false
  , getTweets: function(search, callback) {
      search = encodeURIComponent(search);
    
      fs.readFile('./maxid.txt', 'utf8', function(err, maxId) {
        if (err) { Tweet.sinceId = 1; }
        else { Tweet.sinceId = maxId; }

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

          if (!Tweet.isOpened) {
            fs.open('./tweets.txt', 'a', 0666, function(err, fd) {
              if(err) { throw err; }

              Tweet.isOpened = true;
              var buffer = new Buffer(text);
              fs.write(fd, buffer, 0, buffer.length, null
                , function(err) {
                    fs.close(fd, function() {
                      Tweet.isOpened = false; 
                      fs.writeFile('./maxid.txt'
                        , data.max_id.toString()
                        , function(err) {}
                      );
                    }); 
              });
            });
          }
        });
      });
    }
}

var rule = new schedule.RecurrenceRule();
rule.hour = new schedule.Range(0, 23);
rule.minute = [0, 10, 20, 30, 40, 50];

var j = schedule.scheduleJob(rule, function(){
  Tweet.getTweets('#nodejs');
  console.log('Backup is completed at ' + new Date());
});

