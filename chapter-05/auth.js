// https://dev.twitter.com/apps 에서 새로운 어플리케이션을 만든 후
// 생성된 Consumer key와 Consumer secret 키를 아래 변수에
// 입력해야 함.
var rest = require('restler');

module.exports = function(callback) {
  var consumerKey = '생성한 Consumer Key',
      consumerSecret = '생성한 Consumer Secret';

  rest.post('https://api.twitter.com/oauth2/token', {
      'Content-Type': 'application/x-www-form-urlencoded'
    , 'User-Agent': 'Nodejs-programming'
    , 'data': {
           'grant_type': 'client_credentials'
         , 'client_id': consumerKey
         , 'client_secret': consumerSecret
         , 'code': ''
       }
  }).on('success', function(data) {
    var accessToken = 'Bearer ' + data.access_token;
    callback(null, accessToken);
  }).on('fail', function(data, res) {
    console.log('엑세스토큰을 얻는데 실패했습니다');
    console.log(data);
  });
};
