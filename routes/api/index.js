var express = require('express');
var router = express.Router();
var usersRoutes = require('./users')
var itemsRoutes = require('./items')

/* /api/users endpoint */
router.use('/users', usersRoutes);
router.use('/items', itemsRoutes);

module.exports = router;
