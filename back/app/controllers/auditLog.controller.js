const { AuditLogModel } = require("../models/auditLog");

class AuditController {
  async getAllAuditLog(req, res, next) {
    try {
      const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
      const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
      const skip = (page - 1) * limit;
      const totalContents = await AuditLogModel.countDocuments();
      const auditLogs = await AuditLogModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
      if (!auditLogs) throw { status: 404, success: false, message: "لاگی پیدا نشد" };

      res.status(200).json({
        status: 200,
        success: true,
        auditLogs,
        currentPage: page,
        totalPages: Math.ceil(totalContents / limit),
        total: totalContents,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  AuditController: new AuditController(),
};
