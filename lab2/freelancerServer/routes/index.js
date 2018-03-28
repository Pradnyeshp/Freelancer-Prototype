const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongo = require('mongodb');
const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const saltRounds = 10
const ObjectId = require('mongodb').ObjectId;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


  algorithm = 'aes192',
  password = '!QAZ@WSX';

// Connection URL
var url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'freelancerdb';

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Mongodb Connected successfully to server");
    const db = client.db("freelancerdb");
    client.close();
});

const con = mysql.createConnection({
  connectionLimit: 100,
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "freelancer_db"
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/checksession', (req, res, next) => {
    console.log(req.body)

})

router.post('/signup', function(req, res, next) {
  console.log(req.body);
 
  const name = req.body.name;
  const usr = req.body.username;
  const email = req.body.email;
  const pwd = req.body.password;

  //validations
  //   req.checkBody('name', 'Name is required').notEmpty()
  //
  //   const errors = req.validationErrors()
  //
  //   if(errors) {
  //       res.json( {errors : errors} )
  //   }
  //   else {
  //    }

  // function encrypt(pwd) {
  //   var cipher = crypto.createCipher(algorithm, password)
  //   var crypted = cipher.update(pwd, 'utf8', 'hex')
  //   crypted += cipher.final('hex');
  //   console.log("Encrypted Password :",crypted);
  //   return crypted;
  // }
  //
  // let encryptpwd = encrypt(pwd)

    MongoClient.connect( url, (err, connection) => {
      if(err) throw err
        else {
        bcrypt.hash( pwd, saltRounds, (err, result) => {
            console.log("Hashed password is :", result)
            console.log("Connected to mongodb...");

            let dbo = connection.db("freelancer");

            dbo.collection('users').insertOne({
                username: req.body.username,
                password: result,
                email: req.body.email
            }).then( (result) => {
                console.log("User Details Inserted Successfully");
                console.log(result.insertedId);
                connection.close();
                res.json('SIGNUP_SUCCESS');
            })
        })
      }
    })
  // con.getConnection((err, connection) => {
  //   if(err) {
  //     res.json({
  //       code : 100,
  //       status : "Not able to connect to database"
  //     });
  //   }
  //   else {
  //     var sql = 'INSERT INTO user (Name, Username, Email, Password ) VALUES (?, ?, ?, ?)';
  //     con.query(sql , [name, usr, email, encryptpwd] , (err, result) => {
  //
  //       if(err) {
  //         console.log(err.name);
  //         console.log(err.message);
  //         res.json('ERROR');
  //     }
  //     else {
  //         console.log("New user added in database");
  //         res.json('SIGNUP_SUCCESS');
  //     }
  //   });
  // }
  // })
}
);

passport.use( new LocalStrategy( (username, password, done) => {
    MongoClient.connect( url, function(err, connection) {
        if (err) throw err;
        else {
            let dbo = connection.db("freelancer");
            var query = { username : username };
            dbo.collection("users").find(query).toArray(function(err, result) {
                if (err) throw err;
                else {
                  if(result.length > 0)
                  {
                    console.log(result)
                    var hash = result[0].password
                    bcrypt.compare(password, hash , (err, match) => {
                          if (err)  return done(err);
                          if(match) {
                            console.log("In Password Match..", result[0].username)
                            return done(null, result[0] )
                          }
                          else {
                            return done(null, false)
                          }
                    })
                }}});
        }});
    }
));

router.post('/signin', function (req, res, next) {

  console.log("In Sign In",req.body)

    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err); }
        if (!user) {
            res.json('ERROR'); }
         if(user) {
            console.log("In Authenticate", user )
            req.session.username = user.username
             console.log("Session Started", req.session)
             const jsonresp = { "session": user.username }
             res.json(jsonresp);
         }
    })(req, res, next);

  // const usr = req.body.username;
  // const pwd = req.body.password;

  // function encrypt(pwd) {
  //   var cipher = crypto.createCipher(algorithm, password)
  //   var crypted = cipher.update(pwd, 'utf8', 'hex')
  //   crypted += cipher.final('hex');
  //   console.log(crypted);
  //   return crypted;
  // }
  //
  // let encryptpwd = encrypt(pwd)
  // MySQL Connection for Lab 1
  // con.getConnection((err, connection) => {
  //   if (err) {
  //     res.json({
  //       code: 100,
  //       status: "Not able to connect to database"
  //     });
  //   }
  //   else {
  //     var sql = 'SELECT * from user WHERE username = ? AND password = ?';
  //     con.query(sql, [usr, encryptpwd], (err, result) => {
  //       if (err) {
  //         console.log(err.name);
  //         console.log(err.message);
  //         res.json('ERROR');
  //       }
  //       else {
  //         console.log("User details found in database");
  //         console.log(result);
  //         res.json(result);
  //       }
  //     });
  //   }
  // })
});

router.post('/getrelevantprojects', (req, res, next) => {
    console.log("In Get Relevant Projects", req.body)

    MongoClient.connect(url, (err, db) => {
        if(err) throw err
        else {
            let dbo = db.db('freelancer')
            dbo.collection('users').findOne( {username: req.body.username}, (err, result) => {
                if(err) throw err
                else {
                    console.log("User Details in relevant projects",result);
                    let count = 0
                    const userSkills = result.skills.toString()
                    const userSkillsArray = userSkills.split(",")
                    const relevantProjectArray = []
                    // let userSkillsArray = userSkills.toArray()
                    console.log('User Skills : ',userSkillsArray)
                    dbo.collection('projects').find({}).toArray( (err,result) => {
                        if(err) throw err
                        else {
                            // console.log('In rel projects, all projects:',result)
                            const allProjectsArray = result;
                            console.log("Skills required in Projects",allProjectsArray)
                            for( let i=0; i < userSkillsArray.length ; i++) {
                                for( let j=0; j < allProjectsArray.length; j++) {
                                    let allProjectSkillsArray = allProjectsArray[j].skillsreq.toString().split(',')
                                    for( let k=0; k < allProjectSkillsArray.length ; k++) {
                                        if(userSkillsArray[i].toLocaleLowerCase() === allProjectSkillsArray[k].toLocaleLowerCase()) {
                                            count++;
                                            console.log('Count is : ' , count )
                                        }
                                    }
                                    if(count>=3) {
                                        relevantProjectArray.push(allProjectsArray[j]);
                                        console.log("final Relevant project array", relevantProjectArray)
                                    }
                                }
                            }
                            res.json(relevantProjectArray)
                        }
                    })
                }
            } )
        }
    })
})

router.post('/getprofile', (req, res, next) => {
  const username = req.body.username
  console.log(username);

  MongoClient.connect(url, (err, connection) => {
    if(err) throw  err
      else {
      let dbo = connection.db("freelancer")
        let query = { username : username}
        dbo.collection('users').find(query).toArray( (err, result) => {
            if(err) throw err
            else {
                console.log("User Found In DB")
                console.log(result)
                res.json(result)
                connection.close()
            }
        }
       )
    }
  })

  //SQL Part Commented
  // con.getConnection((err, connection) => {
  //   if (err) {
  //     res.json(
  //       { code: 100,
  //         status: "Not able to connect to database"
  //       });
  //   }
  //   else {
  //     var sql = 'SELECT * FROM user WHERE username = ?' ;
  //     con.query(sql, [username], (err, result) => {
  //       if(err) {
  //         console.log(err.message);
  //         res.json('Error')
  //       }
  //       else {
  //         console.log("Found user in database");
  //         console.log(result);
  //         res.json(result);
  //       }
  //     });
  //   }
  // })
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
      let sql = "SELECT UserId,Username FROM user WHERE username = ?"
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

    MongoClient.connect(url, (err, connect) => {
    if(err) throw err
        else {
      let dbo = connect.db("freelancer")
        const query = {username : user }
        const newvalues  =  { $set : {name : name, email : email, phone: phone, aboutme: aboutme, skills: skills } }
        dbo.collection('users').updateOne( query, newvalues, (err, result) => {
          if(err) throw  err
            else {
            console.log("1 Profile Details Updated")
              return res.json({
                  data: result
              })
              connect.close()
           }
          }
        )
      }
    }
   )

//   con.getConnection((err, connection) => {
//     if (err) {
//       res.json({
//         code: 100,
//         status: "Not able to connect to database"
//       });
//     }
//     else {
//       var sql = ' UPDATE user SET Name=?, Email=?, Phone=?, AboutMe=?, Skills=? WHERE Username = ? ';
//       con.query(sql, [name, email, phone, aboutme, skills, user], (err, results) => {
//         if (err) {
//           return res.json('ERROR')
//         }
//         else {
//           console.log("Profile Details Inserted")
//           return res.json({
//             data: results
//           })
//         }
//       })
//     }
//   })
})

router.post('/getprojects', (req, res, next) => {
    console.log("In Get All Projects ", req.body);

    MongoClient.connect(url, (err, connection) => {
      if(err) throw  err
        else {
          const dbo = connection.db("freelancer");
          dbo.collection("projects").find({}).toArray(function(err, result) {
              if (err) throw err;
              console.log( 'All the Projects from Database are as follows ' ,result);
              res.json(result)
              connection.close();
          });
      }
    })

    // MySQL part commented
    // con.getConnection((err, connection) => {
    //   if(err) {
    //     console.log("Can't Establish a Connection to the Database");
    //     res.json ({
    //       code : 100,
    //       status : 'notable to connect to database'
    //     })
    //   }
    //   else {
    //     let sql = "SELECT * FROM project LEFT JOIN user ON project.Employer=user.UserId"
    //     con.query(sql, (err,result) => {
    //       if(err) {
    //         console.log(err.message);
    //         res.json('ERROR')
    //       }
    //       else{
    //         console.log("Project from Database in getprojects",result);
    //         res.json(result)
    //       }
    //     })
    //   }
    // })
})

router.post('/getprojectdetails', (req, res, next) => {
  console.log("In get project details",req.body);
  
  const pid = req.body.projectid
    const o_id = new ObjectId(pid)

    MongoClient.connect(url, (err, connection) => {
        if(err) throw err
        else {
            let dbo = connection.db("freelancer")
            dbo.collection("projects").aggregate([
                { $match : { _id : o_id } },
                {
                    $lookup:{
                        from : 'bids',
                        localField : '_id',
                        foreignField : 'projectid',
                        as : 'bidsforproject'
                    }
                },
                {
                    $unwind:{
                        path:"$bidsforproject",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group:{
                        _id:{
                            id:'$id',
                            employer:'$employer',
                            projectname: '$projectname',
                            desc : '$desc',
                            skillsreq : '$skillsreq',
                            budget : '$budget',
                            startdate : '$startdate',
                            bids : '$bids'},
                        average : { $avg: '$bidsforproject.bid' }
                    }
                },
                {
                    $project:{
                        id : "$_id.id",
                        projectname: '$_id.projectname',
                        employer:'$_id.employer',
                        desc : '$_id.desc',
                        skillsreq : '$_id.skillsreq',
                        budget : '$_id.budget',
                        bids : '$_id.bids',
                        average : { $ifNull: [ "$average",0 ] }
                    }
                }
            ]).toArray( (err, result) => {
                if(err) throw err
                else {
                    console.log('Project Details from Database' , result)
                    res.json(result)
                }
            })
        }
    }
   )
  // MySQL part commented
  // con.getConnection((err, connection) => {
  //   if (err) {
  //     res.json({
  //       code: 100,
  //       status: "Not able to connect to database"
  //     });
  //   }
  //   else {
  //     sql = "select * FROM project as p left join ((select ProjectId, sum(Bid)/count(ProjectId) as Average from bid group by ProjectId) as b) on p.ProjectId = b.ProjectId where p.ProjectId = ?"
  //
  //     con.query(sql, pid, (err, result) => {
  //       if (err) {
  //         console.log(err.message);
  //         res.json("ERROR");
  //       }
  //       else {
  //         console.log("Project Found in Database", result);
  //         res.json(result)
  //       }
  //     })
  //   }
  // })
})

router.post('/setworkerforproject', (req, res, next) => {
  console.log(req.body);
  connectionPool.getConnection((err, connection) => {
    if (err) {
      res.json('Error connecting to database...')
    } else {
      var sql = 'update project set Employee = ' + mysql.escape(req.body.freelancer) + ' where ProjectId = ' + mysql.escape(req.body.pid);
      connection.query(sql, (err, result) => {
        if (err) {
          res.json('Error updating the worker for this project');
        } 
        else {
          res.json('Worker set successfully for this project');
        }
      });
    }
  })
})

router.post( '/getallbids', (req, res, next) => {
  console.log("In Get All bids", req.body );
  
  let pid = req.body.projectid
    let o_id = new ObjectId(pid)

    MongoClient.connect(url, (err, connection) => {
        if(err) throw err
        else {
            let dbo = connection.db("freelancer")
            let query = { projectid : o_id }
            dbo.collection("bids").find(query).toArray( (err, result) => {
                if(err) throw err
                else {
                    console.log("Result in List All bids", result)
                    res.json(result)
                }
            })
        }
    })

    //Commented MySQL part
  // con.getConnection((err, connection) => {
  //   if (err) {
  //     res.json({
  //       code: 100,
  //       status: "Not able to connect to database"
  //     });
  //   }
  //   else {
  //     sql = "SELECT * from bid inner join user on bid.UserId = user.UserId WHERE bid.ProjectId = ? "
  //
  //     con.query(sql, [pid], (err, result) => {
  //       if (err) {
  //         console.log(err.message);
  //         res.json('ERROR')
  //       }
  //       else {
  //         console.log("Bids for Selected Projects", result);
  //         res.json(result)
  //       }
  //     })
  //   }
  // })
})

router.post('/addproject', (req, res, next) => {
  console.log("In AddProject, Received Request for Posting a new Project", req.body);
  console.log(req.body.skillsreq);

  // let id = req.body.userid;
  // let freelancer = req.body.freelancer
  // let title = req.body.projectname;
  // let desc = req.body.projectdesc;
  // let skill = req.body.skillsreq;
  // let budmin = req.body.budgetrange;
  // let startdt = req.body.startdate;
  // let compdt = req.body.compdate;

  MongoClient.connect(url, (err, connection) => {
    if(err) throw err
      else {
        let dbo = connection.db("freelancer");
        dbo.collection('projects').insertOne({
            employer : req.body.username,
            projectname : req.body.projectname,
            desc : req.body.projectdesc,
            skillsreq : req.body.skillsreq,
            budget : req.body.budgetrange,
            startdate : req.body.startdate,
            compdate: req.body.compdate
        }).then( (result) => {
            console.log("Project Details Inserted Successfully");
            console.log(result.insertedId);
            connection.close();
            res.json('PROJECTPOST_SUCCESS');
        })
    }
  })

  //Commented MySQL db part
  // con.getConnection((err, connection) => {
  //   if (err) {
  //     res.json({
  //       code: 100,
  //       status: "Not able to connect to database"
  //     })
  //   }
  //   else {
  //     let sql = 'INSERT INTO project (Employer, Freelancer, Title, Description, SkillsReq, BudgetMin, StartDate, CompletionDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  //     con.query(sql, [id, freelancer, title, desc, skill, budmin, startdt, compdt], (err, result) => {
  //       if (err) {
  //         console.log(err.name);
  //         console.log(err.message);
  //         res.json('ERROR');
  //       }
  //       else {
  //         console.log("New Project added in database");
  //         res.json('PROJECTPOST_SUCCESS');
  //       }
  //     })
  //   }
  // })
})

router.post('/getmypostedprojects', (req, res, next) => {
  console.log(req.body);
  
  let username = req.body.username

   MongoClient.connect(url, (err, db) => {
       if(err) {
           res.json("ERROR")
       }
       else {
           let dbo = db.db('freelancer');
           dbo.collection('projects').aggregate([
               {$match: { employer: req.body.username }},
               {
                   $lookup:{
                       from : 'bids',
                       localField : '_id',
                       foreignField : 'projectid',
                       as : 'projectbids'
                   }
               },
               {
                   $unwind:{
                       path:"$projectbids",
                       preserveNullAndEmptyArrays: true
                   }
               },
               {
                   $group:{
                       _id:{
                           id:'$id',
                           employer:'$employer',
                           projectname: '$projectname',
                           desc : '$desc',
                           skillsreq : '$skillsreq',
                           budget : '$budget',
                           startdate : '$startdate',
                           bids : '$bids',
                           status : '$status'
                       },
                       average : { $avg: '$projectbids.bid' }
                   }
               },
               {
                   $project:{
                       id : "$_id.id",
                       projectname: '$_id.projectname',
                       employer:'$_id.employer',
                       desc : '$_id.desc',
                       skillsreq : '$_id.skillsreq',
                       budget : '$_id.budget',
                       startdate : '$_id.startdate',
                       bids : '$_id.bids',
                       status : '$_id.status',
                       average : { $ifNull: [ "$average",0 ] }
                   }
               }
           ]).toArray( (err, result) => {
               if(err) {
                    res.json('ERROR')
               }
               else {
                   console.log("Results",result)
                   res.json(result)
               }
           } )
       }
   })


  // SQL Part Commented
  // con.getConnection((err, connection) => {
  //   if (err) {
  //     res.json({
  //       code: 100,
  //       status: "Not able to establish a connection"
  //     }
  //     )
  //   }
  //   else {
  //     let sql = "select * from project left join (select ProjectId, sum(Bid)/count(ProjectId) as Average from bid group by ProjectId ) as b on project.ProjectId = b.ProjectId where Freelancer = ? "
  //     con.query(sql, [username], (err, result) => {
  //       if (err) {
  //         console.log(err.message);
  //         res.json("ERROR");
  //       }
  //       else {
  //         console.log("Found All Posted Projects", result);
  //         res.json(result)
  //       }
  //     })
  //   }
  // })

})

router.post('/getmybiddedprojects', (req, res, next) => {
  console.log(req.body);
    // let username = req.body.userid

    MongoClient.connect(url, (err, db) => {
        if(err) throw err
        else {
            let dbo = db.db("freelancer")
            dbo.collection('bids').aggregate([
                { $match: { freelancer: req.body.username  }},
                {
                    $lookup:{
                        from: 'projects',
                        localField : 'projectid',
                        foreignField : '_id',
                        as : 'fbids'
                    }
                },
                {
                    $unwind:{
                        path:"$fbids",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group:{
                        _id:{
                            bid: '$bid',
                            projectid: '$projectid',
                            projectname: '$fbids.projectname',
                            desc: '$fbids.desc',
                            skillsreq: '$fbids.skillsreq',
                            employer : '$fbids.employer',
                            status : '$fbids.status',
                        },
                        average : { $avg: '$bid' }
                    }
                },
                {
                    $project:{
                        bid : '$_id.bid',
                        projectname : '$_id.projectname',
                        desc: '$_id.desc',
                        skillsreq: '$_id.skillsreq',
                        employer : '$_id.employer',
                        status : '$_id.status'
                    }
                }
            ]).toArray( (err, result) => {
                if(err) {
                    res.json("ERROR")
                }
                else {
                    console.log("result fbids", result)
                    res.json(result)
                }
            } )
        }
    })

  //SQL Part
  // con.getConnection((err, connection) => {
  //   if (err) {
  //     res.json({
  //       code: 100,
  //       status: "Not able to establish a connection"
  //     }
  //     )
  //   }
  //   else {
  //     let sql = "SELECT P.Title, P.Freelancer, Q1.Bid, P.Status, P.ProjectId, Q2.AvgBid FROM (SELECT * FROM bid WHERE userId = ? ) AS Q1 JOIN project P ON P.ProjectId = Q1.ProjectId JOIN(SELECT ProjectId, avg(bid) as AvgBid from bid group by ProjectId) AS Q2 ON P.ProjectId = Q2.ProjectId"
  //     con.query(sql, [username], (err, result) => {
  //       if (err) {
  //         console.log(err.message);
  //         res.json("ERROR");
  //       }
  //       else {
  //         console.log("Found All Posted Projects", result);
  //         res.json(result)
  //       }
  //     })
  //   }
  // })
})

router.post('/updatebid', (req, res, next) => {

    console.log('In Update Bid', req.body);

  let bid = req.body.bid
  let date = new Date;
  // let userid = req.body.userid
  let pid = req.body.projectid
  let o_id = new ObjectId(pid)
  let dd = req.body.deliveryDays

  console.log(date);

  MongoClient.connect(url, (err, connection) => {
      if(err) throw err
      else {
          let dbo = connection.db("freelancer")
          let query = {
              projectid : o_id ,
              freelancer : req.body.username,
              bid : Number(bid),
              date : date,
              deliverydays : dd
          }
          dbo.collection("bids").insertOne(query, (err, result) => {
              if(err) {
                  res.json("ERROR")
              }
              else {
                  console.log("In Bids Table, Bid Updated")
                  let bidnum = { projectid: o_id }
                  dbo.collection("bids").count(bidnum, (err, result) => {
                      if(err) throw err
                      else {
                          console.log("Number of bids :" , result)
                          dbo.collection("projects").updateOne( {_id : o_id}, { $set:{ bids : result }} , (err, result) => {
                              if (err) throw err
                              else {
                                  console.log("Number of bids Updated in projects" )
                              }
                          } )
                      }
                  })
              }
          }
       )
          res.json("BID_PLACED")
      }
  })

  // MySQL Bid logic Commented
  // con.getConnection((err, connection) => {
  //   if (err) {
  //     res.json({
  //       code: 100,
  //       status: "Not able to connect to database"
  //     });
  //   }
  //   else {
  //     let sql = 'INSERT INTO bid (UserId , ProjectId, Bid, Date, DeliveryDays) VALUES (?, ?, ?, ?, ?)'
  //     con.query(sql, [userid, pid, bid, date, dd], (err, result) => {
  //       if (err) {
  //         console.log(err.name);
  //         console.log(err.message);
  //         res.json("ERROR");
  //       }
  //       else {
  //         console.log("Bid Table updated");
  //         bidnum = "SELECT COUNT(bid) AS num FROM bid WHERE ProjectId = ?"
  //         con.query(bidnum, pid, (err, result) => {
  //           if (err) {
  //             console.log(err.name);
  //             console.log(err.message);
  //             res.json("ERROR");
  //           }
  //           else {
  //             console.log("Count of Bids Updated to ", result);
  //             let num = result[0].num
  //             console.log(num);
  //             con.query("UPDATE project SET bids = ? WHERE ProjectId = ? ", [num, pid], (err, result) => {
  //               if (err) {
  //                 console.log(err.name);
  //                 console.log(err.message);
  //                 res.json("ERROR");
  //               }
  //               else {
  //                 console.log("Bids value set in project", result);
  //               }
  //             })
  //           }
  //         })
  //         res.json("BID_PLACED");
  //       }
  //     })
  //   }
  // })
})


module.exports = router;