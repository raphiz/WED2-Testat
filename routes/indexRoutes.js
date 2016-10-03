var express = require('express');
var indexController = require('../controller/indexController');

var router = express.Router();

router.get("/", function(req, res){
    indexController.index(req,res);
});

module.exports = router;
