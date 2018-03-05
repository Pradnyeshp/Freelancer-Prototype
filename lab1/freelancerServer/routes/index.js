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
 
  const usr = req.body.username;
  const email = req.body.emailid;
  const pwd = req.body.password;
  
  con.getConnection((err, connection) => {
    if(err) {
      res.json({
        code : 100,
        status : "Not able to connect to database"
      });
    }

    else {
      var sql = 'INSERT INTO user (Username, Email, Password ) VALUES ( ?, ?, ?)';
      con.query(sql , [usr, email, pwd] , (err,result) => {
        
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

module.exports = router;
