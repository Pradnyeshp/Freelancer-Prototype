var assert = require('assert');
var request = require('request');

// it('Checking Login for 200 status', function (done) {
//     request.post('http://localhost:3001/signin', { form: { username: "prad", password: "123" } },
//         function (error, response, body) {
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
// });

// it('Checking getprofile for 200 status', function (done) {
//     request.post('http://ec2-52-202-154-74.compute-1.amazonaws.com:3001/getprofile', { form: { username: "prad" } },
//         function (error, response, body) {
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
// });

// it('Checking getuserid for 200 status', function (done) {
//     request.post('http://localhost:3001/getuserid', { form: { username: "prad" } },
//         function (error, response, body) {
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
// });
//
// it('Checking getprojects for 200 status', function (done) {
//     request.post('http://ec2-52-202-154-74.compute-1.amazonaws.com:3001/getprojects', { form: {  } },
//         function (error, response, body) {
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
// });
//
// it('Checking getallbids for 200 status', function (done) {
//     request.post('http://localhost:3001/getallbids', { form: { projectname: "Mobile Game Development" } },
//         function (error, response, body) {
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
// });

// it('Checking getproject for 200 status', function (done) {
//     request.post('http://localhost:3001/getproject', { form: { projectname: "Mobile Game Development" } },
//         function (error, response, body) {
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
// });
//

it('Checking getmypostedprojects for 200 status', function (done) {
    request.post('http://localhost:3001/getmypostedprojects', { form: { username : "prad" } },
        function (error, response, body) {
            console.log(body);
            assert.equal(200, response.statusCode);
            done();
        });
});

// it('Checking assignedprojects for 200 status', function (done) {
//     request.post('http:localhost:3001/assignedprojects', { form: { username: "prad" } },
//         function (error, response, body) {
//             console.log(body);
//             assert.equal(200, response.statusCode);
//             done();
//         });
// });
