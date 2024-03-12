const { PosterModel } = require("../models/poster");
const { getImageUrl } = require("../utils/functions");

class PosterController {
  async getPoster(req, res, next) {
    try {
      const currentDate = new Date();
      const poster = await PosterModel.find().sort({ createdAt: "desc" }).limit(1);

      if (!poster || poster.length === 0) {
        throw { status: 404, success: false, message: "اطلاعیه یافت نشد" };
      }
      return res.status(200).json({
        status: 200,
        success: true,
        poster,
      });
    } catch (err) {
      next(err);
    }
  }

  async addPoster(req, res, next) {
    try {
      const { title, desc, date } = req.body;
      const image = getImageUrl(req.files.image);

      const poster = await PosterModel.create({ image, title, desc, date });
      if (!poster) {
        throw { status: 400, success: false, message: "اطلاعیه ساخته نشد" };
      }
      return res.status(201).json({
        status: 201,
        success: true,
        message: "اطلاعیه با موفقیت ساخته شد",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  PosterController: new PosterController(),
};
