let mongo = require('./mongo');
let ObjectId = require('mongodb').ObjectId;

function handle_request( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));

    const pid = msg.pid;
    const o_id = new ObjectId(pid);

    mongo.connect( (err, db) => {
        if(err) throw err;
        else {
            db.collection('projects').aggregate([
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
                if(err) throw err;
                else {
                    callback(null, result)
                }
            })
        }
    })
}

exports.handle_request = handle_request;