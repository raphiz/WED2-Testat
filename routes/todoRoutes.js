var express = require('express');
var todosController = require('../controller/todosController');

var router = express.Router();

router.get("/", function(req, res){
    todosController.listDialog(req,res);
});

router.get("/:id", function(req, res){
    todosController.tododialog(req,res);
});

router.get("/create", function(req, res){
    todosController.tododialog(req,res);
});

router.post("/create", function(req, res){
    todosController.create(req,res);
});

module.exports = router;
