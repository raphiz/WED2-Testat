var express = require('express');
var todoController = require('../controller/todoController');

var router = express.Router();

router.get("/", todoController.listDialog);
router.get("/edit=:id", todoController.todoEditDialog);
router.get("/create", todoController.create);

module.exports = router;
