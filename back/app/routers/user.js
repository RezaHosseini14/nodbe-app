const { UserController } = require("../controllers/user.controller");
const { checkAll } = require("../middlewares/checkAll");
const { authorize } = require("../middlewares/checkAuthorize");
const { checkLogin } = require("../middlewares/checkLogin");
const { checkUserStatus } = require("../middlewares/checkUserStatus");
const { profileUpload } = require("../middlewares/multer");

const router = require("express").Router();

// router.get("/all", checkLogin, UserController.getAllUsers);
router.get("/bestuser", checkUserStatus, UserController.bestUser);
router.get("/block/:id", checkLogin, checkAll, checkUserStatus, UserController.blockUser);
router.get("/all", checkLogin, authorize("ADMIN"), checkUserStatus, UserController.getAllUsers);
router.get("/:id", checkLogin, authorize("ADMIN"), checkUserStatus, UserController.getUser);
router.put(
  "/update/:id",
  checkLogin,
  authorize("ADMIN"),
  checkAll,
  checkUserStatus,
  profileUpload.single("profile"),
  UserController.update
);
router.delete("/delete/:id", checkLogin, authorize("ADMIN"), checkAll, checkUserStatus, UserController.deleteUser);
// router.put("/upload/:id", uploadFile.single('profileImage'), checkLogin, UserController.uploadProfile )

module.exports = {
  userRoutes: router,
};
