let mongo = require('./mongo');

function handle_request( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect( (err, db) => {
        if(err) throw err;
        else {
            db.collection('projects').aggregate([
                {$match: { employer : msg.username }},
                {
                    $lookup:{
                        from : 'bids',
                        localField : '_id',
                        foreignField : 'projectid',
                        as : 'projectbids'
                    }
                },
                {
                    $unwind:{
                        path:"$projectbids",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group:{
                        _id:{
                            id:'$_id',
                            employer:'$employer',
                            projectname: '$projectname',
                            desc : '$desc',
                            skillsreq : '$skillsreq',
                            budget : '$budget',
                            startdate : '$startdate',
                            bids : '$bids',
                            status : '$status',
                            worker : '$worker'
                        },
                        average : { $avg: '$projectbids.bid' }
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
                        startdate : '$_id.startdate',
                        bids : '$_id.bids',
                        status : '$_id.status',
                        worker : '$_id.worker',
                        average : { $ifNull: [ "$average",0 ] }
                    }
                }
            ]).toArray((err, result)=>{
                if(err) throw err
                if( result.length === 0 ) {
                    callback(null, "No Project found in database")
                }
                else {
                    callback(null, result)
                }
            })
        }
    })
}

exports.handle_request = handle_request;