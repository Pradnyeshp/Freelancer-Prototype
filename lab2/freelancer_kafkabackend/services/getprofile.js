var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const bcrypt = require('bcryptjs');
const saltRounds = 10;

function handle_request( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));

    MongoClient.connect( url, (err, connection) => {
        if(err) throw err
        else {
            let dbo = connection.db("freelancer")
            let query = { username : msg.username }
            dbo.collection('users').find(query).toArray( (err, result) => {
                    if(err) throw err
                    else {
                        console.log("User Found In DB")
                        console.log(result)
                        callback(null, result)
                        connection.close()
                    }
                }
            )
        }
    })

}

exports.handle_request = handle_request;