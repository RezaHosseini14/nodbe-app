import { Schema } from "rsuite";

const { ArrayType, NumberType, StringType } = Schema.Types;
export const model = Schema.Model({
  title: StringType().isRequired("نام مناسبت نمیتواند خالی باشد"),
  sort: NumberType("باید عدد باشد").isRequired("چیدمان مناسبت نمیتواند خالی باشد"),
  // parent_id: StringType().isRequired("نوع مناسبت"),
});
