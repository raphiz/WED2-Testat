var express = require('express');
var todoController = require('../controller/todoController');

var router = express.Router();

router.get("/", todoController.listDialog);
router.post("/", todoController.create);
router.get("/:id", todoController.todoEditDialog);
router.post("/:id", todoController.update);
router.get("/create", todoController.create);

module.exports = router;
