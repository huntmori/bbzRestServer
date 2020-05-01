const router = require("express").Router();
const controller = require("./accountController");

router.get("/account/create", controller.create);
router.get("/account/test", controller.test);
module.exports = router;
