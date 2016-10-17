var express = require('express');
var todoController = require('../controller/todoController');

var router = express.Router();

router.get("/", todoController.listDialog);
router.get("/:id", todoController.tododialog(req,res));
router.post("/create", todoController.create(req,res));

module.exports = router;
