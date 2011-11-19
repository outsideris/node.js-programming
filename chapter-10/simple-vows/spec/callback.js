var vows = require('vows')
  , fs = require('fs')
  , assert = require('assert');
     
var suite = vows.describe('콜백테스트');

suite.addBatch({
  '파일 읽기: ': {
    topic: function () { 
      fs.readFile('./example.js', encoding='utf8', this.callback);
    },
    'example.js가 존재해야 한다.': function (err, data) {
      assert.isNull(err);
    }
  }
}).export(module);
