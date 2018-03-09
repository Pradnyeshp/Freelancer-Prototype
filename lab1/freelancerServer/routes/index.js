var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createPool({
  connectionLimit: 500,
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "freelancer_db"
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', function(req, res, next) {
  console.log(req.body);
 
  const name = req.body.name;
  const usr = req.body.username;
  const email = req.body.email;
  const pwd = req.body.password;
  
  con.getConnection((err, connection) => {
    if(err) {
      res.json({
        code : 100,
        status : "Not able to connect to database"
      });
    }

    else {
      var sql = 'INSERT INTO user (Name, Username, Email, Password ) VALUES (?, ?, ?, ?)';
      con.query(sql , [name, usr, email, pwd] , (err,result) => {
        
        if(err) {
          console.log(err.name);
          console.log(err.message);
          res.json('ERROR'); 
      }
      else {
          console.log("New user added in database");
          res.json('SIGNUP_SUCCESS');
      }
    });
  }
  })
 
} );

router.post('/signin', function (req, res, next) {
  console.log(req.body);

  const usr = req.body.username;
  const pwd = req.body.password;

  con.getConnection((err, connection) => {
    if (err) {
      res.json({
        code: 100,
        status: "Not able to connect to database"
      });
    }

    else {
      var sql = 'SELECT * from user WHERE username = ? AND password = ?';
      con.query(sql, [usr, pwd], (err, result) => {

        if (err) {
          console.log(err.name);
          console.log(err.message);
          res.json('ERROR');
        }
        else {
          console.log("User details found in database");
          console.log(result);
          res.json(result);
        }
      });
    }
  })
});

router.get('/profile', (req, res) => {

  var sql = 'SELECT * FROM user WHERE username = ? AND password = ?';
  con.query(sql,[], (err, results) => {
      if(err){
        return res.json('ERROR')
      }
      else{
        return res.json({
          data : results
        })
      }
    })
  console.log(req.body);

})

module.exports = router;
