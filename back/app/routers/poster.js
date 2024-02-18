const { PosterController } = require("../controllers/poster.controller");
const { checkAll } = require("../middlewares/checkAll");
const { checkLogin } = require("../middlewares/checkLogin");
const { posterUpload } = require("../middlewares/multer");

const router = require("express").Router();

const cpUpload = posterUpload.fields([{ name: "image", maxCount: 1 }]);

router.get("/last", PosterController.getPoster);
router.post("/add", checkLogin, checkAll, cpUpload, PosterController.addPoster);

module.exports = {
  posterRoutes: router,
};
