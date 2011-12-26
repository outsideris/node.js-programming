var mysql = require('mysql')
  , DATABASE = 'node_test'
  , TABLE = 'members'
  , client = mysql.createClient({
      user: 'node'
    , password: 'pass'
  });

client.query('USE ' + DATABASE);

var mysqlUtil = module.exports = {
    insertUser: function(user, res) {
      client.query(
          'INSERT INTO ' + TABLE + ' SET name = ?, email = ?'
        , [user.name, user.email]
        , function(err) {
            client.query(
                'SELECT * FROM ' + TABLE + ' WHERE name = ?'
              , [user.name]
              , function(err, results, fields) {
                  if (err) {
                    throw err; 
                  } 
                  res.render('join-result', {
                      username: results[0].name
                    , useremail: results[0].email
                    , title: 'Express'
                  });
            });
          }
      );
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
              res.render('join-fail', {
                  title: 'Express'
              });
            } else {
              mysqlUtil.insertUser(user, res);
            }
      });
    }
};
