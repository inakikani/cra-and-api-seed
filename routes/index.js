var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/*', function(req, res) {
  // this is required to send the same file for all url other than /api. Specific to single page apps
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = router;
