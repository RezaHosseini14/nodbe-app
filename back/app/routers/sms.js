const { SmsController } = require("../controllers/sms.controller");
const { checkAll } = require("../middlewares/checkAll");
const { authorize } = require("../middlewares/checkAuthorize");
const { checkLogin } = require("../middlewares/checkLogin");

const router = require("express").Router();

router.post("/sendemail", checkLogin, authorize("ADMIN"), checkAll, SmsController.sendEmail);
// router.post("/sendemail", SmsController.sendEmail);
router.get("/send", checkLogin, authorize("ADMIN"), checkAll, SmsController.sendSms);

module.exports = {
  smsRoutes: router,
};
