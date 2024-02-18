const { Schema, model } = require("mongoose");

const auditLogSchema = new Schema(
  {
    userid: { type: Schema.Types.ObjectId },
    username: { type: String },
    ip: { type: String },
    baseUrl: { type: String },
    pathname: { type: String },
    url: { type: String },
    method: { type: String },
    browser: { type: String },
    browserType: { type: String },
    osInfo: { type: String },
  },
  { timestamps: true }
);

const AuditLogModel = model("auditLog", auditLogSchema);
module.exports = {
  AuditLogModel,
};
