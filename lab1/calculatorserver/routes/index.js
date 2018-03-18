var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });

});

router.post('/operations', function (req, res, next) {
  
  console.log("Received Value 1 : ",req.body.op1);
  console.log("Received Value 2 : ", req.body.op2);
  console.log("Received Operator : ", req.body.op);

  switch(req.body.op) {

    case '+': 
      const result1 = Number(req.body.op1) + Number(req.body.op2)
      res.json(result1);
      console.log("Obtained Result : ",result1);    
      break;
      
    case  '-':
      const result2 = Number(req.body.op1) - Number(req.body.op2)
      res.json(result2);
      console.log("Obtained Result : ",result2);    
      break;

    case '*':
      const result3 = Number(req.body.op1) * Number(req.body.op2)
      res.json(result3);
      console.log("Obtained Result : ",result3);    

      break;

    case '/':
      const result4 = Number(req.body.op1) / Number(req.body.op2)
      res.json(result4);
      console.log("Obtained Result : ",result4);    

      break;
      
  }
});


module.exports = router;
