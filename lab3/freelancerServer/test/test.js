var assert = require('assert');
var request = require('request');

it('Checking Login for 200 status', function (done) {
    request.post('http://localhost:3001/signin', { form: { username: "bot", password: "bot123" } },
        function (error, response, body) {
            console.log(body);
            assert.equal(200, response.statusCode);
            done();
        });
}); 

it('Checking getprofile for 200 status', function (done) {
    request.post('http://localhost:3001/getprofile', { form: { username: "bot" } },
        function (error, response, body) {
            console.log(body);
            assert.equal(200, response.statusCode);
            done();
        });
}); 

it('Checking getuserid for 200 status', function (done) {
    request.post('http://localhost:3001/getuserid', { form: { username: "prad" } },
        function (error, response, body) {
            console.log(body);
            assert.equal(200, response.statusCode);
            done();
        });
}); 

it('Checking getprojects for 200 status', function (done) {
    request.post('http://localhost:3001/getprojects', { form: {  } },
        function (error, response, body) {
            console.log(body);
            assert.equal(200, response.statusCode);
            done();
        });
}); 

it('Checking getallbids for 200 status', function (done) {
    request.post('http://localhost:3001/getallbids', { form: { projectid: "3" } },
        function (error, response, body) {
            console.log(body);
            assert.equal(200, response.statusCode);
            done();
        });
});

it('Checking getproject for 200 status', function (done) {
    request.post('http://localhost:3001/getproject', { form: { projectid: "3" } },
        function (error, response, body) {
            console.log(body);
            assert.equal(200, response.statusCode);
            done();
        });
}); 

it('Checking getmypostedprojects for 200 status', function (done) {
    request.post('http://localhost:3001/getmypostedprojects', { form: { username: "bot" } },
        function (error, response, body) {
            console.log(body);
            assert.equal(200, response.statusCode);
            done();
        });
}); 
