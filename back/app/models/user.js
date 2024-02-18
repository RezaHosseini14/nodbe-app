const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, unique: true },
    email: { type: String, unique: true },
    profile: { type: String },
    status: { type: Boolean, default: false },
    roles: { type: [String], default: ["USER"] },
    refresh_token: { type: String },
  },
  { timestamps: true }
);

const UserModel = model("user", userSchema);

module.exports = { UserModel };
