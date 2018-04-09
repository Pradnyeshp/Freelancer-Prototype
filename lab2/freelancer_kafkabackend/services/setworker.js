let mongo = require('./mongo');
const ObjectId = require('mongodb').ObjectId;
const email = require('nodemailer');
let transporter = email.createTransport({
    service: 'gmail',
    auth: {
        user: 'pradnyesh.patil07@gmail.com',
        pass: 'Pr@d16071993'
    }
});

function handle_request( msg, callback ) {

    console.log("In handle request:"+ JSON.stringify(msg));

    const projectid = msg.pid;
    const o_id = new ObjectId(projectid);

    var dat = new Date();
    dat.setDate(dat.getDate() + Number(msg.deliverydays) );

    mongo.connect( (err, db) => {
        if(err) throw err;
        else {
            db.collection('projects').updateOne( { _id : o_id }, { $set : {worker : msg.freelancer, estimate : dat }} , (err, result) => {
                if(err) throw err;
                else {
                    console.log('Worker Set : ', result.result )
                    // res.json("Worker set for this project");
                    db.collection('projects').aggregate([
                        {$match: { _id : o_id }},
                        {
                            $lookup:{
                                from: 'users',
                                localField : 'worker',
                                foreignField : 'username',
                                as : 'hire'
                            }
                        },
                        {
                            $unwind:{
                                path:"$hire",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $project:{
                                projectname : 1 ,
                                employer : 1 ,
                                desc : 1 ,
                                freelancerEmail : '$hire.email',
                            }
                        }
                    ]).toArray( (err, result) => {
                        if (err) throw err;
                        else {
                            console.log('freelancer details', result);
                            callback(null, result);

                            //E-Mail Notification to Freelancer
                            let mailOptions = {
                                from: 'pradnyesh.patil07@gmail.com',
                                to: result[0].freelancerEmail[0] ,
                                subject: 'Congratulation '+ msg.freelancer +'!!! You Are Hired',
                                html:   '<h3> Project Name: </h3>'+ result[0].projectname +
                                '<h3> Description:</h3>' + result[0].desc +
                                '<h3> Employer:</h3>' + result[0].employer
                            };

                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent : ' + info.response);
                                }
                            });
                        }
                    })
                }
            })
        }
    })

}

exports.handle_request = handle_request;