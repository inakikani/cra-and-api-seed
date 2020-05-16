var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  console.log('hit the items route')
  res.json({items: req.params.id});
});

module.exports = router;
