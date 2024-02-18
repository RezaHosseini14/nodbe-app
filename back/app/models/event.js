const { Schema, model } = require("mongoose");

const chema = new Schema({
  title: { type: String, required: true },
  parent_id: { type: String, default: null },
  sort: { type: Number, default: null },
});

const EventModel = model("event", chema);
module.exports = {
  EventModel,
};
