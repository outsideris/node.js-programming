var assert = require('assert')
  , server = require('../app');

module.exports = {
  'index 페이지 테스트': function() {
    assert.response(server, {
        url: '/'
      , method: 'GET'
    }, {
        status: '200'
      , headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
  }
}


