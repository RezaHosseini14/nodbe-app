import { Form, Schema } from "rsuite";

export const model = Schema.Model({
  username: Schema.Types.StringType().isRequired("نام کاربری الزامی است"),
  password: Schema.Types.StringType().isRequired("رمز عبور الزامی است"),
});
