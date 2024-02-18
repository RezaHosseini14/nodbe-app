import { Schema } from "rsuite";
const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi;
const { StringType } = Schema.Types;
export const model = Schema.Model({
  username: StringType()
    .pattern(usernameRegex, "نام کاربری نامعتبر است")
    .isRequired("نام کاربری نمی تواند خالی باشد"),
  password: StringType().isRequired("رمزعبور نمیتواند خالی باشد"),
  confirmPassword: StringType()
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }
      return true;
    }, "رمزعبور با تکرار آن برابر نیست")
    .isRequired("تکرار رمزعبور نمی تواند خالی باشد"),
});
