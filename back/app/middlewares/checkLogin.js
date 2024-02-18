var cookieParser = require("cookie-parser");
const { UserModel } = require("../models/user");
const { tokenVerify } = require("../utils/functions");
const jwt = require("jsonwebtoken");

async function checkLogin(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];

    const token = req.cookies.accessToken;

    if (token == null) {
      throw res.status(401).json({
        status: 401,
        success: false,
        message: "شما باید ابتدا وارد حساب کاربری خود شوید",
      });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          success: false,
          message: "توکن معتبر نمی باشد است",
        });
      }

      req.userId = decoded.userId;
      req.user = decoded;
      next();
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { checkLogin };
