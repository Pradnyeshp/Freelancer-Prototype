let mongo = require('./mongo');
let fs = require('fs');

function handle_request( msg, callback) {

    console.log("In handle request : "+ JSON.stringify(msg));

    let imageFile = msg.file;

    // imageFile.mv(`$/public/${msg.username}.jpg`, function(err) {
    //     if (err) {
    //         callback(null, false);
    //         // return res.status(500).send(err);
    //     }
    //     mongo.connect( (err, db) => {
    //         if(err) throw err;
    //         else {
    //             var data = fs.readFileSync(`public/${msg.username}.jpg`);
    //             var insert_data = {};
    //             insert_data.file_data= Binary(data);
    //             let dbo = db.db('freelancer');
    //             dbo.collection('users').updateOne( { username : msg.username } , {  $set : { file_data : insert_data}  });
    //             // dbo.collection('users').find({username : req.body.username}).toArray((err, result) => {
    //             //     if(err) throw err;
    //             //     fs.writeFile('abc', result[0].file_data.buffer, function(err){
    //             //         if (err) throw err;
    //             //         console.log('Sucessfully saved!');
    //             //     });
    //             // })
    //         }
    //     });
    //     callback(null, {file: `public/${msg.username}.jpg`} );
    //     // res.json({file: `public/${msg.username}.jpg`});
    // });
}

exports.handle_request = handle_request;