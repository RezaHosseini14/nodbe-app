const { UserModel } = require("../models/user");
const { hashString, tokenGenerator } = require("../utils/functions");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  async register(req, res, next) {
    try {
      const { username, password } = req.body;

      const existUser = await UserModel.findOne({ username });
      if (existUser)
        throw {
          status: 404,
          success: false,
          message: "کاربر قبلا ثبت نام کرده",
        };

      const hashPassword = hashString(password);

      const result = await UserModel.create({
        username,
        password: hashPassword,
      });

      return res.status(201).json({
        status: 201,
        success: true,
        message: "کاربر با موفقیت ثبت نام شد",
      });
    } catch (err) {
      next(err);
    }
  }

  async registerFull(req, res, next) {
    try {
      const { first_name, last_name, username, password, roles } = req.body;
      const existUser = await UserModel.findOne({ username });
      if (existUser)
        throw {
          status: 404,
          success: false,
          message: "کاربر قبلا ثبت نام کرده",
        };

      const hashPassword = hashString(password);

      const result = await UserModel.create({
        first_name,
        last_name,
        username,
        password: hashPassword,
        roles,
      });

      return res.status(201).json({
        status: 201,
        success: true,
        message: "کاربر با موفقیت ثبت نام شد",
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (!user)
        throw {
          status: 401,
          success: false,
          message: "نام کاربری یا رمز عبور اشتباه است",
        };

      const isMatch = await bcrypt.compare(password, user.password);
      if (user && isMatch) {
        if (user.status)
          throw {
            status: 403,
            success: false,
            message: "حساب کاربری شما مسدود شده است",
          };
        const userId = user._id;
        const username = user.username;
        const roles = user.roles;
        const status = user.status;

        const accessToken = jwt.sign(
          {
            userId,
            username,
            roles,
            status,
          },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          {
            expiresIn: "1d",
          }
        );

        const refreshToken = jwt.sign(
          {
            userId,
          },
          process.env.REFRESH_TOKEN_SECRET_KEY,
          {
            expiresIn: "2d",
          }
        );

        await UserModel.findByIdAndUpdate(user._id, {
          refresh_token: refreshToken,
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000 * 2,
        });

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 60 * 1000 * 60 * 24,
        });

        return res.status(200).json({ accessToken, userId, username, roles });
      } else {
        res.status(401);
        throw {
          status: 401,
          success: false,
          message: "نام کاربری یا رمز عبور اشتباه است",
        };
      }
    } catch (err) {
      next(err);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          status: 401,
          success: false,
          message: "مشکلی پیش آمده است",
        });
      }

      const existRefresh = await UserModel.findOne(
        { refresh_token: refreshToken },
        { password: 0 }
      );

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 401,
            success: false,
            message: "مشکلی پیش آمده است",
          });
        }

        const accessToken = jwt.sign({ existRefresh }, process.env.ACCESS_TOKEN_SECRET_KEY, {
          expiresIn: "1d",
        });

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 60 * 1000 * 60 * 24,
        });

        res.status(200).json({
          status: "200",
          success: true,
          message: "وارد هستید",
        });
      });
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      res.cookie("refreshToken", "", {
        maxAge: 0,
        sameSite: "none",
        secure: true,
      });
      res.cookie("accessToken", "", {
        maxAge: 0,
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({
        status: 200,
        success: true,
        message: "با موفقیت خارج شدید",
      });
    } catch (err) {
      next(err);
    }
  }

  async verifyLogin(req, res, next) {
    try {
      const token = req.cookies.accessToken;
      const refreshToken = req.cookies.refreshToken;

      if (!token)
        throw {
          status: 401,
          success: false,
          message: "لطفا دوباره وارد شوید",
        };

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 401,
            success: false,
            message: "مشکلی پیش آمده است",
          });
        }

        const user = await UserModel.findOne({ _id: decoded.userId }, { password: 0 });
        return res.status(200).json({
          status: 200,
          success: true,
          user,
        });
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  AuthController: new AuthController(),
};
