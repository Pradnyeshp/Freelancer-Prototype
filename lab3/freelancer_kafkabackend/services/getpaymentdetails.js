let mongo = require('./mongo');
let ObjectId = require('mongodb').ObjectId;

function handle_request( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));

    const pid = msg.pid;
    const o_id = new ObjectId(pid);

    mongo.connect( (err, db) => {
        if(err) throw err;
        else {

            db.collection('projects').find( { _id : o_id } ).toArray( (err, result) => {
                db.collection('bids').find({ projectid : result[0]._id, freelancer : result[0].worker }).toArray((err, result1) => {
                    if (err) throw err;
                    console.log("In get Payment Details", result1);
                    let array = {
                        employer : result[0].employer,
                        worker : result1[0].freelancer,
                        bidamt : result1[0].bid,
                        projectname : result[0].projectname
                    };
                    console.log(array);
                    callback(null, array)
                })
            } );

            // db.collection('projects').aggregate([
            //     { $match : { _id : o_id } },
            //     {
            //         $lookup: {
            //             from: "bids",
            //             let: { pid: "$_id", worker: "$worker" },
            //             pipeline: [
            //                 { $match:
            //                         { $expr:
            //                                 { $and:
            //                                         [
            //                                             { $eq: [ "$projectid",  "$$pid" ] },
            //                                             { $eq: [ "$freelancer", "$$worker" ] }
            //                                         ]
            //                                 }
            //                         }
            //                 }
            //             ],
            //             as: "payment"
            //         }
            //     },
            //     {
            //         $unwind:{
            //             path:"$payment",
            //             preserveNullAndEmptyArrays: true
            //         }
            //     },
            //     {
            //         $project : {
            //             employer : 1,
            //             worker : 1,
            //             bidamt : '$payment.bid',
            //             projectname : 1
            //         }
            //     }
            // ]).toArray( (err, result) => {
            //     if(err) throw err;
            //     else {
            //         callback(null, result)
            //     }
            // })
        }
    })
}

exports.handle_request = handle_request;