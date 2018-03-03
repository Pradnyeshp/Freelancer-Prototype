var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/operations', function (req, res, next) {
  
  switch(req.body.op) {

    case 'add': 
      const result1 = Number(req.body.op1) + Number(req.body.op2)
      res.json(result1)
      
    case  'sub':
      const result2 = Number(req.body.op1) - Number(req.body.op2)
      res.json(result2)
      
    case 'mul':
      const result3 = Number(req.body.op1) * Number(req.body.op2)
      res.json(result3)
      
    case 'div':
      const result4 = Number(req.body.op1) / Number(req.body.op2)
      res.json(result4)
      
  }
});


module.exports = router;
