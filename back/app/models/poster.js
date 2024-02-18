const { Schema, model } = require("mongoose");

const posterSchema = new Schema(
  {
    image: { type: String },
    title: { type: String },
    create: { type: String },
    desc: { type: String },
  },
  { timestamps: true }
);

const PosterModel = model("poster", posterSchema);

module.exports = {
  PosterModel,
};
