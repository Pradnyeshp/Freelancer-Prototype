let connection =  new require('./kafka/Connection');
let login = require('./services/login');
const signup = require('./services/signup');
const getprofile = require('./services/getprofile');
let updateprofile = require('./services/updateprofile');
let getprojects = require('./services/getprojects');
let getprojectdetails = require('./services/getprojectdetails');
let searchtext = require('./services/searchtext');
let searchtextemployer = require('./services/searchtextemployer');
let searchtextfreelancer = require('./services/searchtextfreelancer')

let consumerlogin = connection.getConsumer('login_topic');
let producer = connection.getProducer();

console.log('server is running');
consumerlogin.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing priting data only', data.data);
    login.handle_request(data.data, function(err,res){
        console.log('after handle',res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

let consumersignup = connection.getConsumer('signup_topic');
consumersignup.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing priting data only', data.data);
    signup.handle_request(data.data, function(err,res){
        console.log('after handle', res );
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

let consumergetprofile = connection.getConsumer('getprofile');
consumergetprofile.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    getprofile.handle_request(data.data, function(err,res){
        console.log('after handle', res );
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

let consumerupdateprofile = connection.getConsumer('updateprofile');
consumerupdateprofile.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    updateprofile.handle_request( data.data, function(err,res) {
        console.log('after handle', res );
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

let consumergetprojects = connection.getConsumer('getprojects');
consumergetprojects.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    getprojects.handle_request( data.data, function(err,res) {
        console.log('after handle', res );
        let payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

let cgetprojectdetails = connection.getConsumer('getprojectdetails');
cgetprojectdetails.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    getprojectdetails.handle_request( data.data, function(err,res) {
        console.log('after handle', res );
        let payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

let csearchtext = connection.getConsumer('searchtext');
csearchtext.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    searchtext.handle_request( data.data, function(err,res) {
        console.log('after handle', res );
        let payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

let csearchtextemployer = connection.getConsumer('searchtextemployer');
csearchtextemployer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    searchtextemployer.handle_request( data.data, function(err,res) {
        console.log('after handle', res );
        let payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

let csearchtextfreelancer = connection.getConsumer('searchtextfreelancer');
csearchtextfreelancer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    searchtextfreelancer.handle_request( data.data, function(err,res) {
        console.log('after handle', res );
        let payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});