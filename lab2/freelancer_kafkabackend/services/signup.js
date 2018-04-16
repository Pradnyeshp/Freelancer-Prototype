let mongo = require('./mongo');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

function handle_request( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect( (err, connection) => {
        if(err) throw err;
        else {
            bcrypt.hash( msg.password, saltRounds, (err, resultpass) => {
                console.log("Hashed password is :", resultpass);
                console.log("Connected to mongodb...");
                let dbo = connection.db("freelancer");

                dbo.collection('users').find( { username : msg.username } ).toArray( (err, result) => {
                    if(err) throw err;
                    else {
                        if( result.length > 0 ) {
                            console.log("Username already exists");
                            // res.json("Username");
                            callback(null, "username" )

                        }
                        else {
                            dbo.collection('users').insertOne({
                                name : msg.name,
                                username: msg.username,
                                password: resultpass,
                                email: msg.email,
                                balance : 10000,
                                image_name : "default",
                            }).then( (result) => {
                                // console.log("User Details Inserted Successfully");
                                // console.log(result.insertedId);
                                // connection.close();
                                // res.json('SIGNUP_SUCCESS');
                                callback(null, result)
                            })
                        }
                    }
                } )
            })
        }
    })

}

exports.handle_request = handle_request;