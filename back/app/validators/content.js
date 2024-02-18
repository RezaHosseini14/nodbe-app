const { body } = require("express-validator");
function contentValidator() {
  return [
    body("title").isString().notEmpty().withMessage("عنوان محتوا نمی تواند خالی باشد"),
    body("desc").isString(),
    body("create").notEmpty().withMessage("زمان محتوا نمی تواند خالی باشد"),
    // body("event").isMongoId().withMessage("فرمت تایپ مشکل داره"),
    // body("type").isMongoId().withMessage("فرمت تایپ مشکل داره"),
    body("show").default(true).isBoolean().withMessage("نمایش اشتباه است"),
  ];
}

module.exports = {
  contentValidator,
};
