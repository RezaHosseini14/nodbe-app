const { ContentModel } = require("../models/content");
const { contentValidator } = require("../validators/content");
const path = require("path");
const { listOfImages, mamad } = require("../utils/functions");
const { UserModel } = require("../models/user");

class ContentController {
  async getContent(req, res, next) {
    try {
      const { id } = req.params;
      const content = await ContentModel.findOne({ _id: id });
      if (!content)
        throw {
          status: 404,
          success: false,
          message: "محتوای مورد نظر یافت نشد",
        };
      res.status(200).json({ status: 200, success: true, content });
    } catch (err) {
      next(err);
    }
  }

  async getContentForUser(req, res, next) {
    try {
      const contents = await ContentModel.find({ creator: req.userId });
      if (!contents) throw { status: 400, success: false, message: "محتوایی یافت نشد" };
      return res.status(200).json({
        status: 200,
        success: true,
        contents,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllContentAdmin(req, res, next) {
    try {
      const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
      const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
      const skip = (page - 1) * limit;
      const totalContents = await ContentModel.countDocuments();

      const contents = await ContentModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

      if (!contents) throw { status: 404, success: false, message: "محتوایی یافت نشد" };

      res.status(200).json({
        status: 200,
        success: true,
        contents,
        currentPage: page,
        totalPages: Math.ceil(totalContents / limit),
        total: totalContents,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllContent(req, res, next) {
    try {
      //pagination
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const totalContents = await ContentModel.countDocuments();
      const skip = (page - 1) * limit;

      //query
      const { slug, year } = req.query;
      let query = {};

      if (slug && year) {
        const startDate = new Date(`${year}-03-21`);
        const endDate = new Date(`${parseInt(year) + 1}-03-20`);
        query.event = slug;
        query.create = {
          $gte: startDate,
          $lte: endDate,
        };
      } else if (year) {
        const startDate = new Date(`${year}-03-21`);
        const endDate = new Date(`${parseInt(year) + 1}-03-20`);
        query.create = {
          $gte: startDate,
          $lte: endDate,
        };
      } else if (slug) {
        query.event = slug;
      }

      const contents = await ContentModel.find(query)
        .sort({ publishTime: -1, create: -1 })
        .skip(skip)
        .limit(limit);

      if (!contents || contents.length === 0) {
        throw { status: 404, success: false, message: "محتوایی یافت نشد" };
      }

      res.status(200).json({
        status: 200,
        success: true,
        contents,
        currentPage: page,
        totalPages: Math.ceil(totalContents / limit),
      });
    } catch (err) {
      next(err);
    }
  }

  async addContent(req, res, next) {
    try {
      const { title, create, desc, type, show, event, publishTime, fileList } = req.body;
      const imagesArry = req.files.images;
      const filesArry = req.files.files;
      const images = listOfImages(imagesArry);
      const files = mamad(filesArry, fileList);

      const currentTime = new Date().getTime();
      const status = currentTime > publishTime;
      const content = await ContentModel.create({
        title,
        create,
        desc,
        type,
        event,
        show,
        publishTime,
        images,
        files,
        status,
        creator: req.userId,
      });

      if (!content) {
        throw { status: 400, success: false, message: "محتوا ساخته نشد" };
      }
      return res.status(201).json({
        status: 201,
        success: true,
        message: "محتوا با موفقیت ساخته شد",
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteContent(req, res, next) {
    try {
      const { id } = req.params;

      const content = await ContentModel.findOne({ _id: id });
      if (!content)
        throw {
          status: 404,
          success: false,
          message: "محتوا مورد نظر یافت نشد",
        };

      const deletecontent = await ContentModel.deleteOne({ _id: id });
      if (deletecontent.deletedCount == 0)
        throw { status: 400, success: false, message: "محتوا حذف نشد" };
      return res.status(202).json({
        status: 202,
        success: true,
        message: "محتوا با موفقیت حذف شد",
      });
    } catch (err) {
      next(err);
    }
  }

  async updateContent(req, res, next) {
    try {
      const { id } = req.params;

      const data = { ...req.body };

      const content = await ContentModel.findOne({ _id: id });
      if (!content)
        throw {
          status: 404,
          success: false,
          message: "محتوا مورد نظر یافت نشد",
        };

      const updateContent = await ContentModel.updateOne({ _id: id }, { $set: data });

      if (updateContent.modifiedCount == 0)
        throw { status: 400, success: false, message: "به روزرسانی انجام نشد" };

      return res.status(200).json({
        status: 200,
        success: true,
        message: "به روزرسانی با موفقیت انجام شد",
      });
    } catch (err) {
      next(err);
    }
  }

  async checkHoliday(req, res, next) {
    try {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      const holidayApiUrl = `https://holidayapi.ir/gregorian/${currentYear}/${currentMonth}/${currentDay}`;
      const holidayApiResponse = await fetch(holidayApiUrl);
      const holidayResponseData = await holidayApiResponse.json();

      let religiousHolidays = [];
      holidayResponseData?.events.forEach((holiday) => {
        if (holiday.is_religious) {
          let religiousHoliday = {
            description: holiday.description,
            isHoliday: holiday.is_holiday,
            eventCategory: holiday.description.includes("ولادت") ? "ولادت" : "شهادت",
          };
          religiousHolidays.push(religiousHoliday);
        }
      });

      return res.status(200).json({
        status: 200,
        success: true,
        religiousHolidays,
      });
    } catch (err) {
      next(err);
    }
  }

  async allCount(req, res, next) {
    try {
      const userCount = await UserModel.countDocuments();
      const contentCount = await ContentModel.countDocuments();
      return res.status(200).json({
        status: 200,
        success: true,
        allCount: {
          userCount,
          contentCount,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async contentOfMonth(req, res, next) {
    try {
      const currentDate = new Date();
      const monthsAgo = 12;
      const result = [];

      const miladiDate = new Date();
      const shamsiYear = miladiDate.toLocaleDateString("fa-IR", { year: "numeric" });
      shamsiYear;

      for (let i = 0; i < monthsAgo; i++) {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);
        const contentCount = await ContentModel.countDocuments({
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        });
        // result.push({ month: startOfMonth.getMonth() + 1, year: startOfMonth.getFullYear(), contentCount });
        result.push({
          month: startOfMonth.toLocaleDateString("fa-IR", { month: "long" }),
          year: startOfMonth.toLocaleDateString("fa-IR", { year: "numeric" }),
          contentCount,
        });
      }

      res.status(200).json({
        status: 200,
        success: true,
        result,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  ContentController: new ContentController(),
};
