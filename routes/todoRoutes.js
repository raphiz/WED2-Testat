var express = require('express');
var todoController = require('../controller/todoController');

var router = express.Router();

router.get("/", todoController.listDialog);
router.get("/:id", todoController.tododialog);
router.post("/create", todoController.create);

module.exports = router;
