var assert = require('assert')
  , sum = require('../src-cov/sum');

module.exports = {
  '2+3은 5가 되어야 한다': function() {
    assert.equal(sum(2, 3), 5);
  },
  '10+(-1)은 9가 되어야 한다': function() {
    assert.equal(sum(10, -1), 9);
  },
  'sum은 함수여야 한다': function() {
    assert.type(sum, 'function');
  }
}
