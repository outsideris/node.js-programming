var fs = require('fs');

fs.readFile('./test.txt', encoding='utf-8', function(err, data) {
  if (err === null) {
    console.log(data);
  } else {
    console.log('파일을 읽는 중에 오류가 발생했습니다.');
  }
});

console.log('파일의 내용 : ');

while(true) {}
