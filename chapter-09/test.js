function a(nonexistValue) {
  if (nonexistValue) {
    console.log(nonexistValue);
    console.log('1');
    return 'nonexistValue가 존재합니다.';
  } else {
    console.log(nonexistValue);
    return 'nonexistValue가 존재하지 않습니다.';
  }
}

function b() {
  return 'called b()';
}

var obj = { 
    foo: 'this is foo'
  , bar: 'this is bar' 
}
a();
