var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('hit the users route')
  res.json({foo: "bar"});
});

module.exports = router;
