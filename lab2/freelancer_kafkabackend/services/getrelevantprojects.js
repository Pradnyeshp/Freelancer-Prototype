let mongo = require('./mongo');

function handle_request( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect( (err, db) => {
        if(err) throw err;
        else {
            db.collection('users').findOne( {username: msg.username}, (err, result) => {
                if(err) throw err;
                else {
                    console.log("User Details in relevant projects",result);
                    let count = 0;
                    const userSkills = result.skills.toString();
                    const userSkillsArray = userSkills.split(",");
                    const relevantProjectArray = [];
                    console.log('User Skills : ', userSkillsArray);
                    db.collection('projects').find({}).toArray( (err,result) => {
                        if(err) throw err
                        else {
                            const allProjectsArray = result;
                            console.log("Skills required in Projects",allProjectsArray);
                            for( let i=0; i < userSkillsArray.length ; i++) {
                                for( let j=0; j < allProjectsArray.length; j++) {
                                    let allProjectSkillsArray = allProjectsArray[j].skillsreq.toString().split(',');
                                    for( let k=0; k < allProjectSkillsArray.length ; k++) {
                                        if(userSkillsArray[i].toLocaleLowerCase() === allProjectSkillsArray[k].toLocaleLowerCase()) {
                                            count++;
                                            console.log('Count is : ' , count )
                                        }
                                    }
                                    if(count>=3) {
                                        relevantProjectArray.push(allProjectsArray[j]);
                                        console.log("final Relevant project array", relevantProjectArray)
                                    }
                                }
                            }
                            callback(null, relevantProjectArray)
                            // res.json(relevantProjectArray)
                        }
                    });
                }
            })
        }
    })
}

exports.handle_request = handle_request;