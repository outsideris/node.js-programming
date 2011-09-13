var mysql = require('mysql')
  , DATABASE = 'node_test'
  , TABLE = 'simpleweb'
  , client = mysql.createClient({
    user: 'node'
  , password: 'pass'
  });

client.query('USE ' + DATABASE);

var mysqlutil = module.exports = {
  insertUser: function(user) {
    client.query(
      'INSERT INTO ' + TABLE +
      ' SET name = ?, email = ?'
    , [user.name, user.email]
    );
  }
, findUserByName: function(name, res) {
    client.query(
      'SELECT * FROM ' + TABLE + ' WHERE name = ?'
    , [name]
    , function(err, results, fields) {
      if (err) {
        throw err; 
      } 
      res.render('join-result', {
        username: results[0].name
      , useremail: results[0].email
      , title: 'Express'
      , joinSuccess: true
      });
    });
  }
, hasNameAndEmail: function(user, res) {
    client.query(
      'SELECT * FROM ' + TABLE + ' WHERE name = ? OR email = ?'
    , [user.name, user.email]
    , function(err, results, fields) {
      if (err) {
        throw err;
      }
      if (results.length > 0) {
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
