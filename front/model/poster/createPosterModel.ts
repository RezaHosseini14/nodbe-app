import { Schema } from "rsuite";

const { StringType } = Schema.Types;
export const model = Schema.Model({
  title: StringType().isRequired("نام اطلاعیه نمیتواند خالی باشد"),
  desc: StringType("باید متن باشد"),
});
