const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

function hashString(str) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
}

async function setAccessTokenCookie(res, accessToken) {
  const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 1, // would expire after 1 days
    httpOnly: true, // The cookie only accessible by the web server
    sameSite: "None",
    secure: true,
    // signed: true, // Indicates if the cookie should be signed
    // sameSite: "Lax",
    // secure: process.env.NODE_ENV === "development" ? false : true,
    // domain: process.env.NODE_ENV === "development" ? "localhost" : ".fronthooks.ir",
  };

  await res.cookie("accessToken", accessToken, cookieOptions);
}

async function setRefreshTokenCookie(res, refreshToken) {
  const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 2, // would expire after 2 day
    httpOnly: true, // The cookie only accessible by the web server
    sameSite: "None",
    secure: true,
    // signed: true, // Indicates if the cookie should be signed
    // sameSite: "Lax",
    // secure: process.env.NODE_ENV === "development" ? false : true,
    // domain:
    //   process.env.NODE_ENV === "development" ? "localhost" : ".fronthooks.ir",
  };
  await res.cookie("refreshToken", refreshToken, cookieOptions);
}

function tokenGenerator(payload) {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1 days",
  });

  return token;
}

function tokenVerify(token) {
  const result = jwt.verify(token, process.env.SECRET_KEY);
  if (!result?.username) throw { status: 401, message: "لطفا وارد حساب کاربری خود شوید" };

  return result;
}

function createUploadPath(id, sec) {
  const uploadPath = path.join("public", "uploads", sec, id);
  fs.mkdirSync(uploadPath, { recursive: true });
  return path.join("public", "uploads", sec, id);
}

function listOfImages(files) {
  if (files?.length > 0) {
    return files.map((file) => ({
      title: file.filename,
      url: path.join(file.destination, file.filename).replace(/\\/g, "/").replace("public/", ""),
    }));
  } else {
    return [];
  }
}

function getImageUrl(files) {
  return path.join(files[0].destination, files[0].filename).replace(/\\/g, "/").replace("public/", "");
}

function mamad(files, fileDetails) {
  const newFileDetails = JSON.parse(fileDetails);
  if (files?.length > 0) {
    return files.map((file, index) => ({
      title: file.filename,
      audioType: newFileDetails[index].audioType,
      audioDesc: newFileDetails[index].audioDesc,
      url: path.join(file.destination, file.filename).replace(/\\/g, "/").replace("public/", ""),
    }));
  } else {
    return [];
  }
}

function getShamsiMonthName(miladiMonthNumber) {
  const shamsiMonths = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

  if (miladiMonthNumber >= 1 && miladiMonthNumber <= 12) {
    return shamsiMonths[miladiMonthNumber - 1];
  } else {
    return "ماه نامعتبر";
  }
}

function checkYourself(req, id, message) {
  if (req.userId == id) {
    throw {
      status: "404",
      success: false,
      message,
    };
  }
}

// function joiMapper(error) {
//   const { details } = error;
//   let invalidParams = {};
//   if (details?.length > 0) {
//     for (const item of details) {
//       invalidParams[item.context.key] = item.message?.replace(/[\"\'\\]*/g, "");
//     }
//     return invalidParams;
//   }
//   return invalidParams;
// }
module.exports = {
  hashString,
  tokenGenerator,
  tokenVerify,
  createUploadPath,
  listOfImages,
  getImageUrl,
  mamad,
  getShamsiMonthName,
  checkYourself,
  setAccessTokenCookie,
  setRefreshTokenCookie,
};
