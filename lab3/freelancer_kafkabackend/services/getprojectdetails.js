let mongo = require('./mongo');
const ObjectId = require('mongodb').ObjectId;

function handle_request( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));

    const pid = msg.projectid;
    const o_id = new ObjectId(pid);

    mongo.connect( (err, db) => {
        if(err) throw err;
        else {
            db.collection("projects").aggregate([
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
                if(err) throw err;
                else {
                    console.log('Project Details from Database' , result);
                    callback(null, result)
                }
            })
        }
    })
}

exports.handle_request = handle_request;