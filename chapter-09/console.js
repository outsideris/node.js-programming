var util = require('util'),
    clog = require('clog');

console.log('로그용 메시지입니다.');
console.info('정보성 메시지입니다.');
console.warn('경고용 메시지입니다.');
console.error('오류메시지입니다.');

util.log('로그용 메시지');
util.debug('디버그용 메시지');

var testObj = { a: 1, b: function() {} };
console.log('console.log로 출력');
console.log(testObj);
console.log('util.inspect로 출력');
console.log(util.inspect(testObj, true, null));

clog('example', '커스텀 헤더 사용');
clog.log('로그성 메시지');
clog.info('정보성 메시지');
clog.warn('경고성 메시지');
clog.error('오류 메시지');
clog.debug('디버깅용 메시지');
