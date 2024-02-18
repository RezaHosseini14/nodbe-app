const { auditLogRoutes } = require("./auditLog");
const { authRoutes } = require("./auth");
const { contentRoutes } = require("./content");
const { eventRouter } = require("./event");
const { holidayRouter } = require("./holiday");
const { posterRoutes } = require("./poster");
const { smsRoutes } = require("./sms");
const { userRoutes } = require("./user");

const router = require("express").Router();
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/content", contentRoutes);
router.use("/event", eventRouter);
router.use("/holiday", holidayRouter);
router.use("/poster", posterRoutes);
router.use("/sms", smsRoutes);
router.use("/auditlog", auditLogRoutes);

module.exports = {
  AllRoutes: router,
};
