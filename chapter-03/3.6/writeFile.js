// 리스트 3.9
var fs = require('fs');

fs.writeFile('./example.txt', 'Hello World', encoding='utf-8', function(err) {
  if (err) throw err;
  console.log('파일을 작성하였습니다.');
});
