const { ContentController } = require("../controllers/content.controller");
const { checkAll } = require("../middlewares/checkAll");
const { authorize } = require("../middlewares/checkAuthorize");
const { validatorMapper } = require("../middlewares/checkError");
const { checkLogin } = require("../middlewares/checkLogin");
const { checkUserStatus } = require("../middlewares/checkUserStatus");
const { contentUpload } = require("../middlewares/multer");
const { contentValidator } = require("../validators/content");

const router = require("express").Router();

const cpUpload = contentUpload.fields([
  { name: "files", maxCount: 100 },
  { name: "images", maxCount: 100 },
]);

router.get("/contentuser", checkLogin, ContentController.getContentForUser);
router.get("/contentofmonth", ContentController.contentOfMonth);
router.get("/allcount", ContentController.allCount);
router.post("/add", checkLogin, checkAll, checkUserStatus, cpUpload, ContentController.addContent);
router.get("/allcontentadmin", checkLogin, checkAll, checkUserStatus, ContentController.getAllContentAdmin);
router.get("/all", checkUserStatus, ContentController.getAllContent);
router.get("/:id", ContentController.getContent);
router.put("/update/:id", checkLogin, authorize("ADMIN"), checkAll, checkUserStatus, ContentController.updateContent);
router.delete("/delete/:id", checkLogin, authorize("ADMIN"), checkAll, checkUserStatus, ContentController.deleteContent);
router.delete("/deleteImage/:id/:imageId", checkLogin, authorize("ADMIN"), checkAll, checkUserStatus, ContentController.deleteContentImage);
router.delete("/deleteFile/:id/:fileId", checkLogin, authorize("ADMIN"), checkAll, checkUserStatus, ContentController.deleteContentFile);

module.exports = {
  contentRoutes: router,
};
