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
// Define upload for profile images
const profileUpload = multer({ storage: profileStorage });

const contentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
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
// Define upload for content images
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
  posterUpload
};
