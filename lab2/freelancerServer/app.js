var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var session = require('express-session')
var cors = require('cors');
var fs = require('fs');
const kafka = require('./routes/kafka/client');
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017';

mongoose.connect('mongodb://localhost/27017');
var db = mongoose.connection;
var Binary = require('mongodb').Binary;

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//bodyparser middleware
app.use(logger('dev'));

//cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));

app.post('/upload', (req, res, next) => {

    req.body.file = req.files.file;

    // kafka.make_request('upload', req.body,  (err, result) => {
    //     if(err) throw err;
    //     else {
    //         console.log(result)
    //     }
    // })

    let imageFile = req.files.file;
    imageFile.mv(`${__dirname}/public/${req.body.username}.jpg`, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        MongoClient.connect(url, (err, db) => {
            if(err) throw err;
            else {
                var data = fs.readFileSync(`public/${req.body.username}.jpg`);
                var insert_data = {};
                insert_data.file_data= Binary(data);
                let dbo = db.db('freelancer');
                dbo.collection('users').updateOne( { username : req.body.username } , {  $set : { file_data : insert_data}  });
                // dbo.collection('users').find({username : req.body.username}).toArray((err, result) => {
                //     if(err) throw err;
                //     fs.writeFile('abc', result[0].file_data.buffer, function(err){
                //         if (err) throw err;
                //         console.log('Sucessfully saved!');
                //     });
                // })
            }
        });
        res.json({file: `public/${req.body.username}.jpg`});
    });
});



app.use(session({
//cookieName: 'session',
    secret: 'secret',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    resave: false,
    saveUninitialized: false
}));

//Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// app.use(function (req, res, next) {
//     // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*');
//
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);
//
//   // Pass to next layer of middleware
//   next();
// });

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
