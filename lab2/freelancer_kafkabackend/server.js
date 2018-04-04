var connection =  new require('./kafka/Connection');
var login = require('./services/login');
const signup = require('./services/signup');
const getprofile = require('./services/getprofile')

var consumerlogin = connection.getConsumer('login_topic');
var producer = connection.getProducer();

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

var consumersignup = connection.getConsumer('signup_topic');
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

var consumergetprofile = connection.getConsumer('getprofile');
consumergetprofile.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing priting data only', data.data);
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