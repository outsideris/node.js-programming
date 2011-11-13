module.exports = {
  callFailMethod: function() {
    this.doFailure(); 
  }
, doFailure: function() {
    conole.log('it\'s fail'); 
  }
};
