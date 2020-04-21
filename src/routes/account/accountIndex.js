const router = require("express").Router();
const controller = require("./accountController");

router.get("/account/create", controller.create);

module.exports = router;
