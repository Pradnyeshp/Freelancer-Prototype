let mongo = require('./mongo');
const ObjectId = require('mongodb').ObjectId;

function handle_request( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));

    let updatedbalanceEmployer = msg.employerbal - msg.bidamt;
    let date = new Date();

    mongo.connect( (err, db) => {
        if(err) throw err;
        else {
            db.collection('users').updateOne( {username : msg.employer }, { $set : { balance : updatedbalanceEmployer} },  (err, result) => {
                if(err) throw err;
                console.log('Employer Balance Updated', result.result);

                //Worker Balance Updation
                let updatedbalanceWorker = msg.workerbal + msg.bidamt;
                db.collection('users').updateOne( {username : msg.worker }, { $set : { balance : updatedbalanceWorker } },  (err, result) => {
                    if(err) throw err;
                    console.log('Worker Balance Updated',result.result );

                    //Employer Transaction Updation
                    db.collection('transaction').insertOne({
                        id : msg.transactionidEmployer,
                        projectid : msg.pid,
                        pname : msg.projectname,
                        amount : msg.bidamt,
                        transType : 'debit',
                        username : msg.employer,
                        date : date
                    }, (err, result) => {
                        if(err) throw err;
                        console.log('Updated Employer Transaction History')
                    });

                    //Worker Transaction Updation
                    db.collection('transaction').insertOne({
                        id : msg.transactionidWorker,
                        projectid : msg.pid,
                        pname : msg.projectname,
                        amount : msg.bidamt,
                        transType : 'credit',
                        username : msg.worker,
                        date : date
                    }, (err, result) => {
                        if(err) throw err;
                        console.log('Updated Worker Transaction History', result.result)
                    });

                    // Status Updation in Project Table
                    const projectid = msg.pid;
                    const o_id = new ObjectId(projectid);
                    db.collection('projects').updateOne( { _id : o_id } , { $set : { status : 'closed', date : date } }, (err, result) => {
                        if(err) throw err;
                        console.log("Status Updated in Projects", result.result);
                        callback( null, "Transaction Successful");
                    } )
                })
            } )
        }
    })
}

exports.handle_request = handle_request;