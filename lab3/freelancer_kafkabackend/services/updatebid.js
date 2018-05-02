let mongo = require('./mongo');
const ObjectId = require('mongodb').ObjectId;

function handle_request( msg, callback) {

    console.log("In handle request : "+ JSON.stringify(msg));

    let bid = msg.bid;
    let date = new Date;
    let pid = msg.projectid;
    let o_id = new ObjectId(pid);
    let dd = msg.deliveryDays;

    mongo.connect( (err, db) => {
        if(err) throw err;
        else {
            let query = {
                projectid : o_id ,
                freelancer : msg.username,
                bid : Number(bid),
                date : date,
                deliverydays : dd
            };
            db.collection('bids').find( { projectid: o_id, freelancer : msg.username } ).toArray( (err,result) => {
                if(err) throw err;
                if( result.length === 0) {
                    db.collection("bids").insertOne(query, (err, result) => {
                            if(err) throw err;
                            else {
                                console.log("In Bids Table, Bid Updated");
                                let bidnum = { projectid : o_id };
                                db.collection("bids").count(bidnum, (err, result) => {
                                    if(err) throw err;
                                    else {
                                        console.log("Number of bids :" , result);
                                        db.collection("projects").updateOne( {_id : o_id}, { $set:{ bids : result }} , (err, result) => {
                                            if (err) throw err;
                                            else {
                                                console.log("Number of bids Updated in projects" );
                                                callback(null, "BID_PLACED");
                                                // res.json("BID_PLACED")
                                            }
                                        } )
                                    }
                                })
                            }
                        }
                    )
                }
                else {
                    callback(null, "ERROR")
                    // res.json("ERROR")
                }
            } )
        }
    })
}

exports.handle_request = handle_request;