const { UserModel } = require("../models/user");
const fs = require("fs");
const { checkYourself } = require("../utils/functions");
const { ContentModel } = require("../models/content");

class UserController {
  async blockUser(req, res, next) {
    try {
      const { id } = req.params;

      checkYourself(req, id, "امکان مسدود کردن کاربر نیست");
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({ status: 404, success: false, message: "کاربر مورد نظر یافت نشد" });
      }

      const newStatus = !user.status;
      const userBlock = await UserModel.findByIdAndUpdate(id, { status: newStatus });
      if (user.status) {
        return res.status(200).json({ status: 200, sucess: true, message: "کاربر از مسدود بودن خارج شد " });
      } else {
        return res.status(200).json({ status: 200, sucess: true, message: "کاربر با موفقیت مسدود شد" });
      }
    } catch (err) {
      next(err);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
      const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
      const skip = (page - 1) * limit;
      const totalContents = await UserModel.countDocuments();

      const users = await UserModel.find().skip(skip).limit(limit);
      if (!users) throw { status: 404, success: false, message: "کاربری یافت نشد" };

      res.status(200).json({
        status: 200,
        success: true,
        users,
        currentPage: page,
        totalPages: Math.ceil(totalContents / limit),
        total: totalContents,
      });
    } catch (err) {
      next(err);
    }
  }

  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const users = await UserModel.findOne({ _id: id });
      if (!users) throw { status: 404, success: false, message: "کاربر مورد نظر یافت نشد" };
      res.status(200).json({ status: 200, success: true, users });
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      checkYourself(req, id, "امکان حذف کاربر نیست");

      const existUser = await UserModel.findOne({ _id: id });

      if (!existUser)
        throw {
          status: 404,
          success: false,
          message: "کارربر مورد نظر یافت نشد",
        };

      const deleteUser = await UserModel.deleteOne({ _id: id });

      if (deleteUser.deletedCount == 0) throw { status: 400, success: false, message: "کاربر حذف نشد" };
      return res.status(202).json({
        status: 202,
        success: true,
        message: "کاربر با موفقیت حذف شد",
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      if (req.file) {
        const dirPath = `public/uploads/profile/${id}`;

        const newFileName = req.file.filename;

        fs.readdir(dirPath, (err, files) => {
          if (err) {
            console.error(err);
            return;
          }

          files.forEach((file) => {
            if (file !== newFileName) {
              fs.unlink(`${dirPath}/${file}`, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              });
            }
          });
        });

        data.profile = `${req.protocol}://${req.get("host")}/${req.file.path.replace("public\\", "").replaceAll(/\\/g, "/")}`;
      }

      const user = await UserModel.findOne({ _id: id });
      if (!user)
        throw {
          status: 404,
          success: false,
          message: "کاربر مورد نظر یافت نشد",
        };

      const userUpdate = await UserModel.updateOne({ _id: id }, { $set: data });
      if (userUpdate.modifiedCount == 0) throw { status: 400, success: false, message: "به روزرسانی انجام نشد" };

      return res.status(200).json({
        status: 200,
        success: true,
        message: "به روزرسانی با موفقیت انجام شد",
      });
    } catch (err) {
      next(err);
    }
  }

  async bestUser(req, res, next) {
    try {
      const users = await ContentModel.aggregate([
        {
          $group: {
            _id: "$creator",
            totalContent: { $sum: 1 },
            lastPublishedDate: { $max: "$createdAt" },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            _id: 1,
            totalContent: 1,
            lastPublishedDate: 1,
            username: "$user.username",
            first_name: "$user.first_name",
            last_name: "$user.last_name",
          },
        },
        {
          $sort: { totalContent: -1 },
        },
      ]);
      return res.status(200).json({
        users,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  UserController: new UserController(),
};
