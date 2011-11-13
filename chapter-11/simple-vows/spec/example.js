var vows = require('vows')
  , assert = require('assert');
     
var suite = vows.describe('Test Suite 이름');

suite.addBatch({
  'context name A': {
    topic: function () { return 42 },
    '42가 되어야 한다.': function (topic) {
      assert.equal (topic, 42);
    },
    '더하기 1': {
      topic: function (val) { return val + 1 },
      '43이 되어야 한다': function (topic) {
        assert.equal (topic, 43);
      }
    }
  }
}).export(module);
