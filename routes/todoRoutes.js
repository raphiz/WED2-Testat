var express = require('express');
var todoController = require('../controller/todoController');

var router = express.Router();

router.get("/", function(req, res){
    todoController.listDialog(req,res);
});

router.get("/:id", function(req, res){
    todoController.tododialog(req,res);
});

router.post("/create", function(req, res){
    console.log('?');
    todoController.create(req,res);
});

module.exports = router;
