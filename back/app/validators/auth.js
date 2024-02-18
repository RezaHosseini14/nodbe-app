const { body } = require("express-validator");

function registerValidator() {
  return [
    body("username").custom((username) => {
      const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;

      if (usernameRegex.test(username)) {
        return true;
      }
      throw "نام کاربری صحیح نمی باشد";
    }),
    body("password").custom((value, ctx) => {
      if (!value) throw "رمز عبور نمی تواند خالی باشد";
      if (value !== ctx?.req?.body?.confirmPassword) throw "رمز عبور با تکرار آن یکسان نیست";
      return true;
    }),
  ];
}

function registerFullValidator() {
  return [
    body("first_name").custom((value) => {
      if (!value) throw "نام کاربر نمی تواند خالی باشد";
    }),
    body("last_name").custom((value) => {
      if (!value) throw "نام خانوادگی نمی تواند خالی باشد";
    }),
    body("username").custom((username) => {
      const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;

      if (usernameRegex.test(username)) {
        return true;
      }
      throw "نام کاربری صحیح نمی باشد";
    }),
    body("password").custom((value, ctx) => {
      if (!value) throw "رمز عبور نمی تواند خالی باشد";
      if (value !== ctx?.req?.body?.confirmPassword) throw "رمز عبور با تکرار آن یکسان نیست";
      return true;
    }),
  ];
}

function loginValidation() {
  return [
    body("username")
      .notEmpty()
      .withMessage("نام کاربری نمیتواند خالی باشد")
      .custom((username) => {
        const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
        if (usernameRegex.test(username)) {
          return true;
        }
        throw "نام کاربری صحیح نمیباشد";
      }),
    body("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("رمز عبور حداقل باید 6 و حداکثر 16 نویسه باشد"),
  ];
}

module.exports = {
  registerValidator,
  registerFullValidator,
  loginValidation,
};
