process.nextTick(function() {
  console.log('nextTick으로 호출되었습니다.');
});
console.log('이 메시지가 먼저 출력됩니다.');
