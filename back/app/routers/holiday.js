const { ContentController } = require("../controllers/content.controller");
const { validatorMapper } = require("../middlewares/checkError");
const { checkLogin } = require("../middlewares/checkLogin");
const { eventValidator } = require("../validators/event");

const router = require("express").Router();

router.get("/holiday", ContentController.checkHoliday);

module.exports = {
  holidayRouter: router,
};
