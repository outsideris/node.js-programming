process.stdin.resume();

process.on('SIGINT', function() {
  console.log('Got SIGINT. Press Control-D to exit.');
});
