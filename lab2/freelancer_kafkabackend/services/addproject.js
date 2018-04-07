let mongo = require('./mongo');

function handle_request( msg, callback) {

    console.log("In handle request : "+ JSON.stringify(msg));

    mongo.connect( (err, db) => {
        if(err) throw err;
        else {
            db.collection('projects').insertOne({
                employer : msg.username,
                projectname : msg.projectname,
                desc : msg.projectdesc,
                skillsreq : msg.skillsreq,
                budget : msg.budgetrange,
                startdate : Date(),
                worker : '',
                status : 'Open'
            }).then( (result) => {
                if(err) throw err;
                else {
                    callback(null, result)
                }
            })
        }
    })
}

exports.handle_request = handle_request;