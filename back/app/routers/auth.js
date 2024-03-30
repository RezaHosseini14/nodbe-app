const { AuthController } = require("../controllers/auth.controller");
const { validatorMapper } = require("../middlewares/checkError");
const { checkLogin } = require("../middlewares/checkLogin");
const { registerValidator, loginValidation, registerFullValidator } = require("../validators/auth");

const router = require("express").Router();

router.get("/refreshToken", AuthController.refreshToken);
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
// router.post("/register", checkLogin, registerValidator(), validatorMapper, AuthController.register);
router.post("/registerfull", AuthController.registerFull);
router.get("/logout", AuthController.logout);
router.get("/verify", AuthController.verifyLogin);

module.exports = {
  authRoutes: router,
};
