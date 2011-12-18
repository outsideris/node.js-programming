// 리스트 2.4
var fs = require('fs');

fs.readFile('./test.txt', encoding='utf-8', function(err, data) {
  if (err) {
    throw err;
  }
  console.log(data);
});

console.log('파일의 내용 : ');

while(true) {}
