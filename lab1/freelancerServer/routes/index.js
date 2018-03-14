var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var crypto = require('crypto'),

  algorithm = 'aes192',
  password = '!QAZ@WSX';

// function decrypt(text) {
//   var decipher = crypto.createDecipher(algorithm, password)
//   var dec = decipher.update(text, 'hex', 'utf8')
//   dec += decipher.final('utf8');
//   return dec;
// }

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
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(pwd, 'utf8', 'hex')
    crypted += cipher.final('hex');
    console.log(crypted);
    return crypted;
  }

  let encryptpwd = encrypt(pwd)

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

  function encrypt(pwd) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(pwd, 'utf8', 'hex')
    crypted += cipher.final('hex');
    console.log(crypted);
    return crypted;
  }

  let encryptpwd = encrypt(pwd)

  con.getConnection((err, connection) => {
    if (err) {
      res.json({
        code: 100,
        status: "Not able to connect to database"
      });
    }
    else {
      var sql = 'SELECT * from user WHERE username = ? AND password = ?';
      con.query(sql, [usr, encryptpwd], (err, result) => {

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

router.post('/getuserid', (req, res, next) => {
  console.log("In GetUserID", req.body);

  let username = req.body.username

  con.getConnection((err, connection) => {
    if (err) {
      res.json({
        code: 100,
        status: "Not able to establish a connection"
      }
      )
    }
    else {
      let sql = "SELECT UserId FROM user WHERE username = ?"
      con.query(sql, [username], (err, result) => {
        if (err) {
          console.log(err.message);
          res.json("Error");
        }
        else {
          console.log("Found ID in Database", result);
          res.json(result)
        }
      })
    }
  })
})

router.post('/getprojectid', (req, res, next) => {
  console.log("In GetProjectID", req.body);

  // let username = req.body.username

  // con.getConnection((err, connection) => {
  //   if (err) {
  //     res.json({
  //       code: 100,
  //       status: "Not able to establish a connection"
  //     }
  //     )
  //   }
  //   else {
  //     let sql = "SELECT UserId FROM user WHERE username = ?"
  //     con.query(sql, [username], (err, result) => {
  //       if (err) {
  //         console.log(err.message);
  //         res.json("Error");
  //       }
  //       else {
  //         console.log("Found ID in Database", result);
  //         res.json(result)
  //       }
  //     })
  //   }
  // })
})

router.post('/updateprofile', (req, res, next) => {
  console.log("In Update profile");
  console.log("request ", req.body);
  
  let user = req.body.username
  let name = req.body.name
  let email = req.body.email
  let phone = req.body.phone
  let aboutme = req.body.aboutme
  let skills = req.body.skills

  var sql = ' UPDATE user SET Name=?, Email=?, Phone=?, AboutMe=?, Skills=? WHERE Username = ? ';
  con.query(sql, [name, email, phone, aboutme, skills, user], (err, results) => {
      if(err){
        return res.json('ERROR')
      }
      else{
        console.log("Profile Details Inserted")
        return res.json ({
          data : results
        })
      }
    })
  console.log(req.body);

})

router.post('/getprojects', (req, res, next) => {
    console.log(req.body);

    con.getConnection((err, connection) => {
      if(err) {
        console.log("Can't Establish a Connection to the Database");
        res.json ({
          code : 100,
          status : 'notable to connect to database'
        })
      }
      else {
        let sql = "SELECT * FROM project LEFT JOIN user ON project.Employer=user.UserId"
        con.query(sql, (err,result) => {
          if(err) {
            console.log(err.message);
            res.json('ERROR')
          }
          else{
            console.log("Project from Database in getprojects",result);
            res.json(result)
          }
        })
      }
    })
  
})

router.post('/addproject', (req, res, next) => {
  console.log("In AddProject, Received Request for Posting a new Project", req.body);
  console.log(req.body.skillsreq);

  let id = req.body.userid;
  let title = req.body.projectname;
  let desc = req.body.projectdesc;
  let skill = req.body.skillsreq;
  let budmin = req.body.budgetrange;
  let startdt = req.body.startdate;
  let compdt = req.body.compdate;

  con.getConnection((err, connection) => {
    if (err) {
      res.json({
        code: 100,
        status: "Not able to connect to database"
      })
    }
    else {
      let sql = 'INSERT INTO project (Employer, Title, Description, SkillsReq, BudgetMin, StartDate, CompletionDate) VALUES (?, ?, ?, ?, ?, ?, ?)'
      con.query(sql, [id, title, desc, skill, budmin, startdt, compdt], (err, result) => {
        if (err) {
          console.log(err.name);
          console.log(err.message);
          res.json('ERROR');
        }
        else {
          console.log("New Project added in database");
          res.json('PROJECTPOST_SUCCESS');
        }
      })
    }
  })
})

router.post('/updatebid', (req, res, next) => {
  console.log('In Update Bid', req.body);
  
  let bid = req.body.bid

  let sql = 'UPDATE bid SET UserId = ?, ProjectId = ?, Bid = ?, Date = ?'

  con.query(sql, [], (err, result) => {
    if(err) {
      console.log(err.message);
      res.json("Error");
    }
    else{
      console.log("Bid Table updated",result);
      res.json(result);
    }
  } )
})

module.exports = router;