var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var crypto = require('crypto'),

  algorithm = 'aes192',
  password = '!QAZ@WSX';



function decrypt(text) {
  var decipher = crypto.createDecipher(algorithm, password)
  var dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8');
  return dec;
}


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
  
  function encrypt(pwd) {
    console.log("asdfghjkk");
    
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(pwd, 'utf8', 'hex')
    crypted += cipher.final('hex');
    console.log(crypted);
    
    return crypted;
  }

  const encryptpwd = encrypt(pwd)

  console.log(encryptpwd);
  

  con.getConnection((err, connection) => {
    if(err) {
      res.json({
        code : 100,
        status : "Not able to connect to database"
      });
    }

    else {
      var sql = 'INSERT INTO user (Name, Username, Email, Password ) VALUES (?, ?, ?, ?)';
      con.query(sql , [name, usr, email, encryptpwd] , (err,result) => {
        
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

router.post('/getprofile', (req, res, next) => {
  const username = req.body.username
  console.log(username);
  
  con.getConnection((err, connection) => {
    if (err) {
      res.json(
        { code: 100,
          status: "Not able to connect to database"
        });
    }
    else {
      var sql = 'SELECT * FROM user WHERE username = ?' ;
      con.query(sql, [username], (err, result) => {
        if(err) {
          console.log(err.message);
          res.json('Error')
        }
        else {
          console.log("Found user in database");
          console.log(result);
          res.json(result);
        }
      });
    }
  })
});

router.post('/updateprofile', (req, res, next) => {
  console.log("hello");
  
  console.log(req.body);
  const usr = req.body.username;
  console.log(usr);
  


  var sql = 'INSERT INTO user (name, email, phone, about me, skills) VALUES (?,?,?,?,?) WHERE username = ? ';
  con.query(sql, [user], [  ], (err, results) => {
      if(err){
        return res.json('ERROR')
      }
      else{
        console.log("Profile Details Inserted");
        return res.json({
          data : results
        })
      }
    })
  console.log(req.body);

})

module.exports = router;
