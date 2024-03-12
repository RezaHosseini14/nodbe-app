const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { createUploadPath } = require("../utils/functions");

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, createUploadPath(req.params.id, "profile"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = Date.now() + ext;
    cb(null, fileName);
  },
});

const profileUpload = multer({ storage: profileStorage });

const contentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const whitelist = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "audio/mpeg",
      "audio/mp3",
    ];
    const filesList = [file];
    filesList.forEach((element) => {
      if (!whitelist.includes(element.mimetype.toLowerCase())) {
        return cb(new Error("این نوع فایل پشتیبانی نمی شود"));
      }
    });
    const contentFolderPath = path.join("public", "uploads", "contents");
    if (!fs.existsSync(contentFolderPath)) {
      fs.mkdirSync(contentFolderPath, { recursive: true });
    }

    cb(null, contentFolderPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = Date.now() + ext;
    cb(null, fileName);
  },
});
const contentUpload = multer({ storage: contentStorage });

const posterStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const contentFolderPath = path.join("public", "uploads", "poster");
    if (!fs.existsSync(contentFolderPath)) {
      fs.mkdirSync(contentFolderPath, { recursive: true });
    }
    cb(null, contentFolderPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = Date.now() + ext;
    cb(null, fileName);
  },
});

const posterUpload = multer({ storage: posterStorage });

module.exports = {
  profileUpload,
  contentUpload,
  posterUpload,
};
