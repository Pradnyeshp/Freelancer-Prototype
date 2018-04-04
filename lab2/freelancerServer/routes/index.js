const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongo = require('mongodb');
const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const ObjectId = require('mongodb').ObjectId;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fileUpload = require('express-fileupload');
const email = require('nodemailer');
const kafka = require('./kafka/client')

let transporter = email.createTransport({
    service: 'gmail',
    auth: {
        user: 'pradnyesh.patil07@gmail.com',
        pass: 'Pr@d16071993'
    }
});

  algorithm = 'aes192',
  password = '!QAZ@WSX';

// Connection URL
let url = 'mongodb://localhost:27017';

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
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/checksession', (req, res) => {
    console.log(req.body)

})

router.post('/signup', function(req, res) {
  console.log(req.body);
 
  const name = req.body.name;
  const usr = req.body.username;
  const email = req.body.email;
  const pwd = req.body.password;

    kafka.make_request( 'signup_topic', req.body , (err, result) => {
        if(err) throw err;
        if( result.length > 0 ) {
            console.log("Username already exists")
            res.json("Username");
        }
        else {
            console.log("User Details Inserted Successfully");
            console.log(result);
            res.json('SIGNUP_SUCCESS');
        }
    }  )

    // MongoClient.connect( url, (err, connection) => {
    //   if(err) throw err
    //     else {
    //     bcrypt.hash( pwd, saltRounds, (err, resultpass) => {
    //         console.log("Hashed password is :", resultpass)
    //         console.log("Connected to mongodb...");
    //
    //         let dbo = connection.db("freelancer");
    //
    //         dbo.collection('users').find( { username : req.body.username } ).toArray( (err, result1) => {
    //             if(err) throw err
    //             else {
    //                 if( result1.length > 0 ) {
    //                     console.log("Username already exists")
    //                     res.json("Username");
    //                 }
    //                 else {
    //                     dbo.collection('users').insertOne({
    //                         name : req.body.name,
    //                         username: req.body.username,
    //                         password: resultpass,
    //                         email: req.body.email,
    //                         balance : 10000
    //                     }).then( (result) => {
    //                         console.log("User Details Inserted Successfully");
    //                         console.log(result.insertedId);
    //                         connection.close();
    //                         res.json('SIGNUP_SUCCESS');
    //                     })
    //                 }
    //             }
    //         } )
    //     })
    //   }
    // })

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

    kafka.make_request('login_topic', { username:username, password:password }, (err,results) => {
        console.log('in result');
        console.log("After our result from kafka backend",results);
        if(err) {
            return done(err, {});
        }
        // console.log(results[0].username);
        if(results.length > 0) {
            console.log("Inside result.length",results[0].username);
            return done(null, results[0]);
        }
        else {
            return done( null, false );
        }
    });

    // MongoClient.connect( url, function(err, connection) {
    //     if (err) throw err;
    //     else {
    //         let dbo = connection.db("freelancer");
    //         var query = { username : username };
    //         dbo.collection("users").find(query).toArray(function(err, result) {
    //             if (err) throw err;
    //             else {
    //               if(result.length > 0)
    //               {
    //                 console.log(result)
    //                 var hash = result[0].password
    //                 bcrypt.compare(password, hash , (err, match) => {
    //                       if (err)  return done(err);
    //                       if(match) {
    //                         console.log("In Password Match..", result[0].username)
    //                         return done(null, result[0] )
    //                       }
    //                       else {
    //                         return done(null, false)
    //                       }
    //                 })
    //             }}});
    //     }});
    }
));

router.post('/upload', (req, res) => {
    // console.log(req.data);
    let imageFile = req.files.file;

    imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function(err) {
        if (err) {
            console.log(err.name)
            return res.status(500).send(err);
        }
        res.json({file: `public/${req.body.filename}.jpg`});
    });

})

router.post('/signin', function (req, res, next) {

  console.log("In Sign In",req.body)

    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err); }
        if (!user) {
            res.json('ERROR'); }
         if(user) {
            console.log("In Authenticate", user );
            req.session.username = user.username;
             console.log("Session Started", req.session);
             const jsonresp = { "session": user.username };
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

router.post('/searchtext', (req, res) => {
    console.log('In Search Text', req.body)

    MongoClient.connect( url, (err, db) => {
        if(err) throw err
        else {
            let dbo = db.db('freelancer')
            dbo.collection('projects').find(
                { $text: { $search: req.body.search } }
                ).toArray( (err, result) => {
                    if(err) throw err
                    if( result.length === 0 ) {
                        res.json("No Project found in database")
                    }
                    else {
                        console.log("Searched Projects from database are :", result)
                        res.json(result)
                        db.close()
                    }
            })
        }
    })
})

router.post('/searchtextemployer', (req, res) => {
    console.log('In Search Text', req.body )

    MongoClient.connect( url, (err, db) => {
        if(err) throw err
        let searcharray = []
        let dbo = db.db('freelancer')
        dbo.collection('projects').aggregate([
            {$match: { employer : req.body.username }},
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
                        id:'$_id',
                        employer:'$employer',
                        projectname: '$projectname',
                        desc : '$desc',
                        skillsreq : '$skillsreq',
                        budget : '$budget',
                        startdate : '$startdate',
                        bids : '$bids',
                        status : '$status',
                        worker : '$worker'
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
                    worker : '$_id.worker',
                    average : { $ifNull: [ "$average",0 ] }
                }
            }
        ]).toArray((err, result)=>{
            if(err) throw err
            else {
                for(let i = 0 ; i < result.length ; i++) {
                    let n = result[i].projectname[0].toLocaleLowerCase().search( (req.body.search).toLocaleLowerCase() )
                    let m = result[i].skillsreq[0].toLocaleLowerCase().search( (req.body.search).toLocaleLowerCase() )
                    if( n!== -1 || m !== -1 ) {
                        searcharray.push(result[i])
                    }
                }
                res.json(searcharray)
            }
        })
    })
})

router.post('/getrelevantprojects', (req, res) => {
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
                    console.log('User Skills : ', userSkillsArray)
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

router.post('/searchtextfreelancer', (req, res) => {
    console.log('in Search Freelancer', req.body)
    MongoClient.connect(url, (err, db)=> {
        if(err) throw err
        else {
            let searcharray = []
            let dbo = db.db('freelancer')
            dbo.collection('projects').aggregate([
                {
                    $lookup:{
                        from : 'bids',
                        localField : '_id',
                        foreignField : 'projectid',
                        as : 'a'
                    }
                },
                {
                    $unwind:{
                        path:"$a",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group: {
                        _id :{
                            _id : '$_id',
                            employer : '$employer',
                            projectname : '$projectname',
                            desc : '$desc',
                            budget :'$budget',
                            skillsreq : '$skillsreq',
                            status:'$status',
                            bids:'$bids',
                            worker : '$worker'
                        },
                        average : { $avg : '$a.bid' }
                    }
                },
                {
                    $project : {
                        _id : 0,
                        id : '$_id._id',
                        employer : '$_id.employer',
                        projectname : '$_id.projectname',
                        desc : '$_id.desc',
                        budget :'$_id.budget',
                        skillsreq : '$_id.skillsreq',
                        status:'$_id.status',
                        bids:'$_id.bids',
                        worker : '$_id.worker',
                        average : { $ifNull : ['$average' , 0] }
                    }
                },
                {
                    $lookup:{
                        from : 'bids',
                        localField : 'id',
                        foreignField : 'projectid',
                        as : 'a1'
                    }
                },
                {
                    $unwind:{
                        path:"$a1",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $match : { 'a1.freelancer' : req.body.username }
                },
                {
                    $project : {
                        id : 1,
                        employer : 1,
                        projectname :1,
                        desc:1,
                        budget:1,
                        skillsreq:1,
                        status:1,
                        bids:1,
                        worker:1,
                        average:1,
                        bid : '$a1.bid',
                        deliverydays : '$a1.deliverydays'
                    }
                }
            ]).toArray( (err, result) => {
                if(err) throw err
                else {
                    console.log(result)
                    for(let i = 0 ; i < result.length ; i++) {
                        let n = result[i].projectname[0].toLocaleLowerCase().search( (req.body.search).toLocaleLowerCase() )
                        if( n!== -1) {
                            searcharray.push(result[i])
                        }
                    }
                    res.json(searcharray)
                }
            } )
        }
    })
})

router.post('/getprofile', (req, res) => {
  const username = req.body.username
  console.log(username);

  kafka.make_request('getprofile', req.body, (err, result) => {
      if (err) throw err;
      else {
          console.log("User Found In DB")
          console.log(result)
          res.json(result)
      }
  })

  // MongoClient.connect(url, (err, connection) => {
  //   if(err) throw  err
  //     else {
  //     let dbo = connection.db("freelancer")
  //       let query = { username : username}
  //       dbo.collection('users').find(query).toArray( (err, result) => {
  //           if(err) throw err
  //           else {
  //               console.log("User Found In DB")
  //               console.log(result)
  //               res.json(result)
  //               connection.close()
  //           }
  //       }
  //      )
  //   }
  // })

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

router.post('/postcomment' , (req, res) => {
    console.log('In post Comment',req.body)

    const pid = req.body.pid
    const o_id = new ObjectId(pid)

    MongoClient.connect(url, (err, db) => {
        if(err) throw err
        else {
            let dbo = db.db('freelancer')
            dbo.collection('projects').updateOne( { _id : o_id }, { $set : { comment : req.body.comment }}, (err, result) => {
                if(err) throw err
                else {
                    console.log('Comment Updated', result.result)
                }
            })
        }
    })
})

router.post('/getuserid', (req, res) => {
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

router.post('/getprojectid', (req, res) => {
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

router.post('/updateprofile', (req, res) => {
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

router.post('/getprojects', (req, res) => {
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

router.post('/getprojectdetails', (req, res) => {
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
                            worker : '$worker',
                            status : '$status',
                            bids : '$bids',
                            comment : '$comment'},
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
                        worker : '$_id.worker',
                        status : '$_id.status',
                        comment : '$_id.comment',
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

router.post('/getpaymentdetails', (req, res) => {
    console.log('in payment details ', req.body)

    const pid = req.body.pid
    const o_id = new ObjectId(pid)

    MongoClient.connect( url, (err, db) => {
        if(err) throw err
        else {
            let dbo = db.db('freelancer')
            dbo.collection('projects').aggregate([
                { $match : { _id : o_id } },
                {
                    $lookup: {
                        from: "bids",
                        let: { pid: "$_id", worker: "$worker" },
                        pipeline: [
                            { $match:
                                    { $expr:
                                            { $and:
                                                    [
                                                        { $eq: [ "$projectid",  "$$pid" ] },
                                                        { $eq: [ "$freelancer", "$$worker" ] }
                                                    ]
                                            }
                                    }
                            }
                        ],
                        as: "payment"
                    }
                },
                {
                    $unwind:{
                        path:"$payment",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project : {
                        employer : 1,
                        worker : 1,
                        bidamt : '$payment.bid',
                        projectname : 1
                    }
                }
            ]).toArray( (err, result) => {
                    console.log('found details',result)
                res.json(result)
                db.close()
            } )
        }
    })
})

router.post('/getbalance', (req, res) => {
    console.log('Employer balance',req.body)

    MongoClient.connect( url, (err, db) => {
        if(err) throw err
        else {
            let dbo = db.db('freelancer')
            dbo.collection('users').find( { username : req.body.u } ).toArray( (err,result) => {
                if (err) throw err
                else {
                    console.log('Employer Found',result)
                    res.json(result)
                }
            })
        }
    })
} )

router.post('/withdrawmoney', (req, res) => {
    console.log(req.body)

    MongoClient.connect( url, (err, db) => {
        if(err) throw err
        else {
            let dbo = db.db('freelancer')
            dbo.collection('users').updateOne( { username : req.body.username },
                { $set : { balance : req.body.amount } }, (err, result) => {
                    if(err) throw err
                    else {
                        console.log("Balance Updated", result.result)
                        res.json(result)
                        db.close()
                    }
                } )

            //Updating Transactions= Table
            dbo.collection('transaction').insertOne({
                id : req.body.id,
                pname : req.body.pname,
                amount : req.body.debit,
                transType : 'debit',
                username : req.body.username,
                date : new Date().toLocaleDateString()
            }, (err, result) => {
                if(err) throw err
                console.log('Updated Transaction History', result.result)
            })
        }
    })
})

router.post('/addmoney', (req, res) => {
    console.log(req.body)

    MongoClient.connect( url, (err, db) => {
        if(err) throw err
        else {
            let dbo = db.db('freelancer')
            dbo.collection('users').updateOne( { username : req.body.username },
                { $set : { balance : req.body.amount } }, (err, result) => {
                    if(err) throw err
                    else {
                        console.log("Balance Updated", result.result)
                        res.json(result)
                        db.close()
                    }
                } )

            //Updating Transactions Table
            dbo.collection('transaction').insertOne({
                id : req.body.id,
                pname : req.body.pname,
                amount : req.body.credit,
                transType : 'credit',
                username : req.body.username,
                date : new Date().toLocaleDateString()
            }, (err, result) => {
                if(err) throw err
                console.log('Updated Transaction History', result.result)
            })
        }
    })
})

router.post('/assignedprojects', (req, res) => {
    console.log('In Assigned Projects', req.body)

    MongoClient.connect( url, (err, db) => {
        if(err) throw err
        else {
            let dbo = db.db('freelancer')
            dbo.collection('projects').find( { worker : req.body.username } ).toArray((err, result) => {
                if(err) throw err
                else {
                    console.log('Assigned Projects Found', result)
                    res.json(result)
                }
            })
        }
    })
})

router.post('/transaction', (req, res) => {
    console.log('In Transaction : ', req.body)
    let updatedbalanceEmployer = req.body.employerbal - req.body.bidamt
    // console.log('Updated balance Emp',updatedbalanceEmployer)

    MongoClient.connect(url, (err, db) => {
        if(err) throw err
        else {
            let dbo = db.db('freelancer')
            dbo.collection('users').updateOne( {username : req.body.employer }, { $set : { balance : updatedbalanceEmployer} },  (err, result) => {
                if(err) throw err
                console.log('Employer Balance Updated', result.result)

                //Worker Balance Updation
                let updatedbalanceWorker = req.body.workerbal + req.body.bidamt
                dbo.collection('users').updateOne( {username : req.body.worker }, { $set : { balance : updatedbalanceWorker } },  (err, result) => {
                    if(err) throw err
                    console.log('Worker Balance Updated',result.result)

                    //Employer Transaction Updation
                    dbo.collection('transaction').insertOne({
                        id : req.body.transactionidEmployer,
                        projectid : req.body.pid,
                        pname : req.body.projectname,
                        amount : req.body.bidamt,
                        transType : 'debit',
                        username : req.body.employer
                    }, (err, result) => {
                        if(err) throw err
                        console.log('Updated Employer Transaction History')
                    })

                    //Worker Transaction Updation
                    dbo.collection('transaction').insertOne({
                        id : req.body.transactionidWorker,
                        projectid : req.body.pid,
                        pname : req.body.projectname,
                        amount : req.body.bidamt,
                        transType : 'credit',
                        username : req.body.worker
                    }, (err, result) => {
                        if(err) throw err
                        console.log('Updated Worker Transaction History', result.result)

                    });

                    // Status Updation in Project Table
                    const projectid = req.body.pid
                    const o_id = new ObjectId(projectid)
                    dbo.collection('projects').updateOne( { _id : o_id } , { $set : { status : 'closed' } }, (err, result) => {
                        if(err) throw err
                        console.log("Status Updated in Projects", result.result)
                        res.json("Transaction Successful")
                    } )
                })
            } )
        }
    })
});

router.post('/gettranshistory', (req, res) => {
    console.log('In trans history', req.body)

    MongoClient.connect(url, (err, db) => {
        if(err) throw err
        else {
            let dbo = db.db('freelancer')
            dbo.collection('transaction').find( { username : req.body.u } ).toArray( (err, result) => {
                if (err) throw err
                else {
                    console.log('trans details', result)
                    res.json(result)
                    db.close()
                }
            } )
        }
    })
});

router.post('/gettranstypeDebit', (req, res) => {

    MongoClient.connect(url, (err, db) => {
        if(err) throw err
        else {
            let dbo = db.db('freelancer')
            dbo.collection('transaction').find( { username : req.body.u  ,  transType : 'debit' } ).toArray( (err, result) => {
                if (err) throw err
                else {
                    console.log('trans details', result)
                    res.json(result)
                    db.close()
                }
            } )
        }
    })

});

router.post('/gettranstypeCredit', (req, res) => {

    MongoClient.connect(url, (err, db) => {
        if(err) throw err
        else {
            let dbo = db.db('freelancer')
            dbo.collection('transaction').find( { username : req.body.u  ,  transType : 'credit' } ).toArray( (err, result) => {
                if (err) throw err
                else {
                    console.log('trans details', result)
                    res.json(result)
                    db.close()
                }
            } )
        }
    })

});

router.post('/setworker', (req, res) => {
  console.log('In Set Worker', req.body);
    const projectid = req.body.pid
    const o_id = new ObjectId(projectid)

    MongoClient.connect( url, (err, db) => {
        if(err) throw err
        else {
            let dbo = db.db('freelancer')
            dbo.collection('projects').updateOne( { _id : o_id },
                { $set : {worker : req.body.freelancer}} , (err, result) => {
                    if(err) throw err
                    else {
                        console.log('Worker Set : ', result.result )
                        res.json("Worker set for this project");
                        dbo.collection('projects').aggregate([
                            {$match: { _id : o_id }},
                            {
                                $lookup:{
                                    from: 'users',
                                    localField : 'worker',
                                    foreignField : 'username',
                                    as : 'hire'
                                }
                            },
                            {
                                $unwind:{
                                    path:"$hire",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $project:{
                                    projectname : 1 ,
                                    employer : 1 ,
                                    desc : 1 ,
                                    freelancerEmail : '$hire.email',
                                }
                            }
                        ]).toArray( (err, result) => {
                            if (err) throw err
                            else {
                                console.log('freelancer details', result)

                                let mailOptions = {
                                    from: 'pradnyesh.patil07@gmail.com',
                                    to: result[0].freelancerEmail[0] ,
                                    subject: 'Congratulation !!! You Are Hired',
                                    html:   '<h3> Project Name: </h3>'+ result[0].projectname +
                                                '<h3> Description:</h3>' + result[0].desc +
                                                '<h3> Employer:</h3>' + result[0].employer
                                };

                                transporter.sendMail(mailOptions, function(error, info){
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent : ' + info.response);
                                    }
                                });

                            }
                        })
                    }
                }
                )
        }
    })


  // connectionPool.getConnection((err, connection) => {
  //   if (err) {
  //     res.json('Error connecting to database...')
  //   } else {
  //     var sql = 'update project set Employee = ' + mysql.escape(req.body.freelancer) + ' where ProjectId = ' + mysql.escape(req.body.pid);
  //     connection.query(sql, (err, result) => {
  //       if (err) {
  //         res.json('Error updating the worker for this project');
  //       }
  //       else {
  //         res.json('Worker set successfully for this project');
  //       }
  //     });
  //   }
  // })
});

router.post( '/getallbids', (req, res) => {
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
});

router.post('/getemployer', (req, res) => {
    console.log('In get employer', req.body)
    let pid = req.body.projectid
    let o_id = new ObjectId(pid)

    MongoClient.connect(url, (err, db) => {
        if (err) throw err
        else {
            let dbo = db.db('freelancer')
            dbo.collection('projects').find({ _id : o_id }).toArray((err, result) => {
                if(err) throw err
                else {
                    console.log('In get project name', result)
                    res.json(result[0].employer)
                }
            })
        }
    })
});

router.post('/addproject', (req, res) => {
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
            compdate: req.body.compdate,
            worker : ''
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
});

router.post('/getmypostedprojects', (req, res) => {
  console.log(req.body);
  
  // let username = req.body.username

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
                           id:'$_id',
                           employer:'$employer',
                           projectname: '$projectname',
                           desc : '$desc',
                           skillsreq : '$skillsreq',
                           budget : '$budget',
                           startdate : '$startdate',
                           bids : '$bids',
                           status : '$status',
                           worker : '$worker'
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
                       worker : '$_id.worker',
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

router.post('/getmybiddedprojects', (req, res) => {
  console.log(req.body);
    // let username = req.body.userid

    MongoClient.connect(url, (err, db) => {
        if(err) throw err
        else {
            let dbo = db.db("freelancer")
            dbo.collection('projects').aggregate([
                {
                    $lookup:{
                        from : 'bids',
                        localField : '_id',
                        foreignField : 'projectid',
                        as : 'a'
                    }
                },
                {
                    $unwind:{
                        path:"$a",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group: {
                        _id :{
                            _id : '$_id',
                            employer : '$employer',
                            projectname : '$projectname',
                            desc : '$desc',
                            budget :'$budget',
                            skillsreq : '$skillsreq',
                            status:'$status',
                            bids:'$bids',
                            worker : '$worker'
                        },
                        average : { $avg : '$a.bid' }
                    }
                },
                {
                    $project : {
                        _id : 0,
                        id : '$_id._id',
                        employer : '$_id.employer',
                        projectname : '$_id.projectname',
                        desc : '$_id.desc',
                        budget :'$_id.budget',
                        skillsreq : '$_id.skillsreq',
                        status:'$_id.status',
                        bids:'$_id.bids',
                        worker : '$_id.worker',
                        average : { $ifNull : ['$average' , 0] }
                    }
                },
                {
                    $lookup:{
                        from : 'bids',
                        localField : 'id',
                        foreignField : 'projectid',
                        as : 'a1'
                    }
                },
                {
                    $unwind:{
                        path:"$a1",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $match : { 'a1.freelancer' : req.body.username }
                },
                {
                    $project : {
                        id : 1,
                        employer : 1,
                        projectname :1,
                        desc:1,
                        budget:1,
                        skillsreq:1,
                        status:1,
                        bids:1,
                        worker:1,
                        average:1,
                        bid : '$a1.bid',
                        deliverydays : '$a1.deliverydays'
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

router.post('/updatebid', (req, res) => {

    console.log('In Update Bid', req.body);

  let bid = req.body.bid;
  let date = new Date;
  // let userid = req.body.userid
  let pid = req.body.projectid;
  let o_id = new ObjectId(pid);
  let dd = req.body.deliveryDays;

  console.log(date);

  MongoClient.connect(url, (err, connection) => {
      if(err) throw err;
      else {
          let dbo = connection.db("freelancer")
          let query = {
              projectid : o_id ,
              freelancer : req.body.username,
              bid : Number(bid),
              date : date,
              deliverydays : dd
          };
          dbo.collection('bids').find( { projectid: o_id, freelancer : req.body.username } ).toArray( (err,result) => {
              if(err) throw err;
              if( result.length === 0) {
                  dbo.collection("bids").insertOne(query, (err, result) => {
                          if(err) {
                              res.json("ERROR")
                          }
                          else {
                              console.log("In Bids Table, Bid Updated");
                              let bidnum = { projectid: o_id };
                              dbo.collection("bids").count(bidnum, (err, result) => {
                                  if(err) throw err;
                                  else {
                                      console.log("Number of bids :" , result);
                                      dbo.collection("projects").updateOne( {_id : o_id}, { $set:{ bids : result }} , (err, result) => {
                                          if (err) throw err;
                                          else {
                                              console.log("Number of bids Updated in projects" );
                                              res.json("BID_PLACED")
                                          }
                                      } )
                                  }
                              })
                          }
                      }
                  )
              }
              else {
                  res.json("ERROR")
              }
          } )

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

router.post('/projectsbystatusdashboard', (req, res)=>{
    console.log('in open projects', req.body)

    MongoClient.connect(url, (err, connection) => {
        if(err) throw  err
        else {
            const dbo = connection.db("freelancer");
            dbo.collection("projects").find({ status : req.body.status,  employer : req.body.username }).toArray(function(err, result) {
                if (err) throw err;
                console.log( 'All the Projects from Database are as follows ' ,result);
                res.json(result)
                connection.close();
            });
        }
    })
});

module.exports = router;