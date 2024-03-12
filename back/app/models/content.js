const { Schema, model } = require("mongoose");

const contentSchema = new Schema(
  {
    title: { type: String, required: true },
    create: { type: Date, required: true },
    publishTime: { type: Date, default: null },
    desc: { type: String },
    type: { type: Schema.Types.ObjectId },
    show: { type: Boolean, default: true },
    status: { type: Boolean },
    images: [
      {
        title: { type: String },
        url: { type: String },
      },
    ],
    files: [
      {
        title: { type: String },
        audioType: { type: String },
        audioDesc: { type: String },
        url: { type: String },
      },
    ],
    event: { type: Schema.Types.ObjectId },
    eventChild: { type: [{ type: Schema.Types.ObjectId, ref: "Content" }] },
    creator: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

const ContentModel = model("content", contentSchema);

module.exports = {
  ContentModel,
};
