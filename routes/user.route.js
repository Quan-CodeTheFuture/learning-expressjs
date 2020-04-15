var express = require('express');
var router = express.Router();
var validateCreate = require('../validate/users.validate');
var controller = require('../controllers/user.controller');

router.get('/',controller.index);

router.get("/Search",controller.search);

router.get("/create",controller.create);

router.post("/create",validateCreate.validate,controller.postCreate);

router.get("/:id",controller.getID);
module.exports = router;