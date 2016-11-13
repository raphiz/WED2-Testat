var express = require('express');
var configController = require('../controller/configController');

var router = express.Router();

router.post("/set/sort/:by", configController.setSortBy);

module.exports = router;
