let connection =  new require('./kafka/Connection');
let producer = connection.getProducer();
console.log('server is running');
let login = require('./services/login');
const signup = require('./services/signup');
const getprofile = require('./services/getprofile');
let updateprofile = require('./services/updateprofile');
let getprojects = require('./services/getprojects');
let getprojectdetails = require('./services/getprojectdetails');
let searchtext = require('./services/searchtext');
let searchtextemployer = require('./services/searchtextemployer');
let searchtextfreelancer = require('./services/searchtextfreelancer');
let getrelevantprojects = require('./services/getrelevantprojects');
let postcomment = require('./services/postcomment');
let getpaymentdetails = require('./services/getpaymentdetails');
let getbalance = require('./services/getbalance');
let withdrawmoney = require('./services/withdrawmoney');
let addmoney = require('./services/addmoney');
let assignedprojects = require('./services/assignedprojects');
let transaction = require('./services/transaction');
let gettranshistory = require('./services/gettranshistory');
let gettranstypeDebit = require('./services/gettranstypeDebit');
let gettranstypeCredit = require('./services/gettranstypeCredit');
let setworker = require('./services/setworker');
let getallbids = require('./services/getallbids');
let getemployer = require('./services/getemployer');
let addproject = require('./services/addproject');
let getmypostedprojects = require('./services/getmypostedprojects');
let getmybiddedprojects = require('./services/getmybiddedprojects');
let updatebid = require('./services/updatebid');
let projectsbystatusdashboard = require('./services/projectsbystatusdashboard');
let upload = require('./services/upload');

let cupload = connection.getConsumer('upload');
cupload.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing priting data only', data.data);
    upload.handle_request(data.data, function(err,res) {
        console.log('after handle', res);
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

let cprojectsbystatusdashboard = connection.getConsumer('projectsbystatusdashboard');
cprojectsbystatusdashboard.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing priting data only', data.data);
    projectsbystatusdashboard.handle_request(data.data, function(err,res) {
        console.log('after handle', res);
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

let cupdatebid = connection.getConsumer('updatebid');
cupdatebid.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing priting data only', data.data);
    updatebid.handle_request(data.data, function(err,res) {
        console.log('after handle', res);
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

let cgetmybiddedprojects = connection.getConsumer('getmybiddedprojects');
cgetmybiddedprojects.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing priting data only', data.data);
    getmybiddedprojects.handle_request(data.data, function(err,res) {
        console.log('after handle', res);
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

let cgetmypostedprojects = connection.getConsumer('getmypostedprojects');
cgetmypostedprojects.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing priting data only', data.data);
    getmypostedprojects.handle_request(data.data, function(err,res) {
        console.log('after handle', res);
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

let caddproject = connection.getConsumer('addproject');
caddproject.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing priting data only', data.data);
    addproject.handle_request(data.data, function(err,res) {
        console.log('after handle', res);
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

let cgetemployer = connection.getConsumer('getemployer');
cgetemployer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing priting data only', data.data);
    getemployer.handle_request(data.data, function(err,res) {
        console.log('after handle', res);
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

let cgetallbids = connection.getConsumer('getallbids');
cgetallbids.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing priting data only', data.data);
    getallbids.handle_request(data.data, function(err,res){
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

let consumerlogin = connection.getConsumer('login_topic');
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

let cgetrelevantprojects = connection.getConsumer('getrelevantprojects');
cgetrelevantprojects.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    getrelevantprojects.handle_request( data.data, function(err,res) {
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

let cpostcomment = connection.getConsumer('postcomment');
cpostcomment.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    postcomment.handle_request( data.data, function(err,res) {
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

let cgetpaymentdetails = connection.getConsumer('getpaymentdetails');
cgetpaymentdetails.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    getpaymentdetails.handle_request( data.data, function(err,res) {
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

let cgetbalance = connection.getConsumer('getbalance');
cgetbalance.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    getbalance.handle_request( data.data, function(err,res) {
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

let cwithdrawmoney = connection.getConsumer('withdrawmoney');
cwithdrawmoney.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    withdrawmoney.handle_request( data.data, function(err,res) {
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

let caddmoney = connection.getConsumer('addmoney');
caddmoney.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    addmoney.handle_request( data.data, function(err,res) {
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

let cassignedprojects = connection.getConsumer('assignedprojects');
cassignedprojects.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    assignedprojects.handle_request( data.data, function(err,res) {
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

let ctransaction = connection.getConsumer('transaction');
ctransaction.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    transaction.handle_request( data.data, function(err,res) {
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

let cgettranshistory = connection.getConsumer('gettranshistory');
cgettranshistory.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    gettranshistory.handle_request( data.data, function(err,res) {
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

let cgettranstypeDebit = connection.getConsumer('gettranstypeDebit');
cgettranstypeDebit.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    gettranstypeDebit.handle_request( data.data, function(err,res) {
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

let cgettranstypeCredit = connection.getConsumer('gettranstypeCredit');
cgettranstypeCredit.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    gettranstypeCredit.handle_request( data.data, function(err,res) {
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

let csetworker = connection.getConsumer('setworker');
csetworker.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log('Data after parsing', data);
    console.log('Data after parsing printing data only', data.data);
    setworker.handle_request( data.data, function(err,res) {
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

