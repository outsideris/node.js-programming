// 리스트 3.7
var fs = require('fs');

fs.rename('./test.txt', './demo.txt', function(err) {
  if (err) throw err;
  console.log('수정되었습니다.');
});
