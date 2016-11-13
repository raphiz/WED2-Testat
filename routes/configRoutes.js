var express = require('express');
var configController = require('../controller/configController');

var router = express.Router();

router.post("/set/sort/:by", configController.setSortBy);
router.post("/set/toggleHideComplete", configController.toggleHideComplete);
router.post("/set/toggleStyle", configController.toggleStyle);

module.exports = router;
