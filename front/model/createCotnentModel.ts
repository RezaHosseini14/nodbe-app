import { Schema } from "rsuite";

const { ArrayType, NumberType, StringType } = Schema.Types;
export const model = Schema.Model({
  event: StringType().isRequired("مناسبت مراسم نمیتواند خالی باشد"),
  title: StringType().isRequired("عنوان مراسم نمیتواند خالی باشد"),
  desc: StringType().isRequired("توضیحات مراسم نمیتواند خالی باشد"),
  // type: ArrayType().isRequired("This field is required."),
});
