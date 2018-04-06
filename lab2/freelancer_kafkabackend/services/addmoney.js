let mongo = require('./mongo');

function handle_request( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect( (err, db) => {
        if(err) throw err;
        else {
            db.collection('users').updateOne( { username : msg.username }, { $set : { balance : msg.amount } }, (err, result) => {
                if(err) throw err;
                else {
                    callback(null, result)
                }
            });

            //Updating Transactions Table
            db.collection('transaction').insertOne({
                id : msg.id,
                pname : msg.pname,
                amount : msg.credit,
                transType : 'credit',
                username : msg.username,
                date : new Date()
            }, (err, result) => {
                if(err) throw err;
                console.log('Updated Transaction History')
            })
        }
    })
}

exports.handle_request = handle_request;