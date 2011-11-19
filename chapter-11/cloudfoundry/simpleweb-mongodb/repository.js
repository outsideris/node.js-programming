var Mongolian = require('mongolian');
if (process.env.VCAP_SERVICES) {
  var env = JSON.parse(process.env.VCAP_SERVICES)
    , mongo = env['mongodb-1.8'][0]['credentials']
    , MONGO_URL = 'mongodb://' + mongo.username + ':' + 
                  mongo.password + '@' + mongo.hostname + ':' + 
                  mongo.port + '/' + mongo.db
    , db = new Mongolian(MONGO_URL)
    , users = db.collection('simpleweb');

} else {
  var server = new Mongolian
    , db = server.db('node_test')
    , users = db.collection('simpleweb');

}

var mysqlutil = module.exports = {
  insertUser: function(user) {
    users.insert({
      name: user.name
    , email: user.email
    });
  }
, findUserByName: function(name, res) {
    users.findOne({name:name}, function(err, user) {
      if (err) {
        throw err;
      }
      res.render('join-result', {
        username: user.name
      , useremail: user.email
      , title: 'Express'
      , joinSuccess: true
      });
    });
  }
, hasNameAndEmail: function(user, res) {
    users.findOne({'$or': [{'name':user.name}, {'email':user.email}]}, function(err, result) {
      if (err) {
        throw err; 
      } 
      if (result) {
        res.render('join-result', {
          title: 'Express'
        , joinSuccess: false
        });
      } else {
        mysqlutil.insertUser(user);
        mysqlutil.findUserByName(user.name, res);
      }
    });
  }
};
