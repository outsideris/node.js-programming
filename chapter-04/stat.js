// 리스트 4.3
var fs = require('fs');

fs.stat('./stat.js', function(err, stats) {
  if (err) throw err;
  console.log(stats);
  console.log('isFile: ' + stats.isFile());
});
