const { AuditLogModel } = require("../models/auditLog");

async function checkAll(req, res, next) {
  const ipAddress = req.ip;
  const method = req.method;
  const url = req.originalUrl;
  const baseUrl = req.baseUrl;
  // const pathname = req._parsedOriginalUrl.pathname;
  const userAgent = req.headers["user-agent"];
  const browserInfo = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  const osInfo = userAgent.match(/\((.*?)\)/)[1] || "";
  const auditLog = await AuditLogModel.create({
    userid: req.userId,
    username: req.user.username,
    ip: ipAddress,
    method,
    baseUrl,
    // pathname,
    url,
    browser: browserInfo[1] || "Unknown",
    browserType: browserInfo[2] || "Unknown",
    osInfo,
  });

  next();
}

module.exports = {
  checkAll,
};
