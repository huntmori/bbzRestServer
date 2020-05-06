const router = require("express").Router();
const controller = require("./accountController");

router.post("/account/create", controller.create);
router.get("/account/test", controller.test);
module.exports = router;
