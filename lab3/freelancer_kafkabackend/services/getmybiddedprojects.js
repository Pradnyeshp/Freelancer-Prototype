let mongo = require('./mongo');

function handle_request( msg, callback) {

    console.log("In handle request : "+ JSON.stringify(msg));

    mongo.connect( (err, db) => {
        if(err) throw err;
        else {
            db.collection('projects').aggregate([
                {
                    $lookup:{
                        from : 'bids',
                        localField : '_id',
                        foreignField : 'projectid',
                        as : 'a'
                    }
                },
                {
                    $unwind:{
                        path:"$a",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group: {
                        _id :{
                            _id : '$_id',
                            employer : '$employer',
                            projectname : '$projectname',
                            desc : '$desc',
                            budget :'$budget',
                            skillsreq : '$skillsreq',
                            status:'$status',
                            bids:'$bids',
                            worker : '$worker'
                        },
                        average : { $avg : '$a.bid' }
                    }
                },
                {
                    $project : {
                        _id : 0,
                        id : '$_id._id',
                        employer : '$_id.employer',
                        projectname : '$_id.projectname',
                        desc : '$_id.desc',
                        budget :'$_id.budget',
                        skillsreq : '$_id.skillsreq',
                        status:'$_id.status',
                        bids:'$_id.bids',
                        worker : '$_id.worker',
                        average : { $ifNull : ['$average' , 0] }
                    }
                },
                {
                    $lookup:{
                        from : 'bids',
                        localField : 'id',
                        foreignField : 'projectid',
                        as : 'a1'
                    }
                },
                {
                    $unwind:{
                        path:"$a1",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $match : { 'a1.freelancer' : msg.username }
                },
                {
                    $project : {
                        id : 1,
                        employer : 1,
                        projectname :1,
                        desc:1,
                        budget:1,
                        skillsreq:1,
                        status:1,
                        bids:1,
                        worker:1,
                        average:1,
                        bid : '$a1.bid',
                        deliverydays : '$a1.deliverydays'
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