var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('hit the items route')
  res.json({items: ["bar", "foo"]});
});

module.exports = router;