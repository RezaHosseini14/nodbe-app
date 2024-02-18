const { body } = require("express-validator");

function eventValidator() {
  return [
    body("title").notEmpty().withMessage("عنوان مناسبت نمی تواند خالی باشد"),
  ];
}

module.exports = {
  eventValidator,
};
