const router = require("express").Router();
const controller = require("./accountController");

router.post("/account/create", controller.create);
//router.post("/account/create" , controller.create_by_mapper);
router.get("/account/test", controller.test);
router.post("/account/login", controller.login);
router.post("/account/body_test", controller.body_test);

module.exports = router;
