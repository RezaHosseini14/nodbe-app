const { EventModel } = require("../models/event");

class EventController {
  async addEvent(req, res, next) {
    try {
      const { title, sort, parent_id } = req.body;
      const event = await EventModel.create({ title, parent_id, sort });
      if (!event) throw { status: 400, success: false, message: "مناسبت اضافه نشد" };
      return res.status(201).json({
        status: 201,
        success: true,
        message: "مناسبت یا موفقیت اضافه شد",
      });
    } catch (err) {
      next(err);
    }
  }

  async getEvent(req, res, next) {
    try {
      const { id } = req.params;
      const event = await EventModel.findOne({ _id: id });
      if (!event)
        throw {
          status: 404,
          success: false,
          message: "مناسبت مورد نظر یافت نشد",
        };
      res.status(200).json({ status: 200, success: true, event });
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const event = await EventModel.find().sort({ sort: 1 });
      if (!event) throw { status: 400, success: false, message: "مناسبتی یافت نشد" };
      res.status(200).json({ status: 200, success: true, events: event });
    } catch (err) {
      next(err);
    }
  }

  async deleteEvent(req, res, next) {
    try {
      const { id } = req.params;

      const event = await EventModel.findOne({ _id: id });
      if (!event)
        throw {
          status: 404,
          success: false,
          message: "مناسبت مورد نظر یافت نشد",
        };

      const deletedEvent = await EventModel.deleteOne({ _id: id });
      const deletedEvents = await EventModel.deleteMany({ parent_id: id });

      if (deletedEvent.deletedCount == 0)
        throw {
          status: 400,
          success: false,
          message: "مناسبت مورد نظر حذف نشد",
        };

      return res.status(200).json({
        status: 200,
        success: true,
        message: "مناسبت مورد نظر حذف شد",
      });
    } catch (err) {
      next(err);
    }
  }

  async updateEvent(req, res, next) {
    try {
      const { id } = req.params;
      const data = { ...req.body };

      const event = await EventModel.findOne({ _id: id });
      if (!event)
        throw {
          status: 404,
          success: false,
          message: "مناسبت مورد نظر یافت نشد",
        };

      const updateEvent = await EventModel.updateOne({ _id: id }, { $set: data });
      if (updateEvent.modifiedCount == 0) throw { status: 400, success: false, message: "به روزرسانی انجام نشد" };

      return res.status(200).json({
        status: 200,
        success: true,
        message: "به روزرسانی با موفقیت انجام شد",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  EventController: new EventController(),
};
