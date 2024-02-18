const { AuditController } = require("../controllers/auditLog.controller");
const { authorize } = require("../middlewares/checkAuthorize");
const { checkLogin } = require("../middlewares/checkLogin");
const router = require("express").Router();

router.get("/all", checkLogin, authorize("SUPER"), AuditController.getAllAuditLog);

module.exports = {
  auditLogRoutes: router,
};
