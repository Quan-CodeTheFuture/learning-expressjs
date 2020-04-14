var express = require('express');
var router = express.Router();

var controller = require('../controllers/user.controller');

router.get('/',controller.index);

router.get("/Search",controller.search);

router.get("/create",controller.create);

router.post("/create",controller.postCreate);

router.get("/:id",controller.getID);
module.exports = router;