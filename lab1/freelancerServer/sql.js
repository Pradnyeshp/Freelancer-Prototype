var mysql = require('mysql');

var con = mysql.createPool({
    connectionLimit : 500,
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database : "freelancer_db"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    
    var sql = "INSERT INTO user (username, email, password ) VALUES ('prad','pradnyeshpatil@gmail.com', '123')";
    
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 user inserted");
    });

});