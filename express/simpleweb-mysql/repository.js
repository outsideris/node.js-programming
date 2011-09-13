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
        username: results[0].name,
        useremail: results[0].email,
        title: 'Express'
      });
    });
  }
};
