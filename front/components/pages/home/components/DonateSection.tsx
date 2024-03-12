import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Form, Schema } from "rsuite";

// components
import CopyText from "@/components/shared/CopyText";
import { cardVariants } from "@/utils/constant";

export const model = Schema.Model({
  donate: Schema.Types.NumberType("باید عدد باشد").isRequired("مبلغ الزامی است"),
});

function DonateSection() {
  const formRef = useRef<any>();
  const [formValue, setFormValue] = useState<any>({ donate: "" });

  return (
    <motion.div
      id="donate"
      className="lg:col-span-4 col-span-8 row-span-3 flex flex-col gap-4"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      variants={cardVariants}
    >
      <div className="flex-[2] card sp_card">
        <Form
          ref={formRef}
          fluid
          model={model}
          formValue={formValue}
          onChange={setFormValue}
          className="flex flex-col justify-between h-full pt-4"
        >
          <Form.Group>
            <Form.ControlLabel
              className="text-mianColor dark:text-white font-semibold"
              style={{ fontSize: "1.2rem" }}
            >
              مبلغ
            </Form.ControlLabel>
            <Form.Control className="h-10 text-lg" name="donate" />
          </Form.Group>

          <button className="bg-mianColor hover:bg-mianColor/70 transition w-full h-10 rounded-xl text-white font-bold text-xl cursor-pointer z-10">
            پرداخت آنلاین
          </button>
        </Form>
      </div>

      <CopyText title="شماره کارت:" desc="(به نام حسن دادگسترنیا)" text="6219861038519889" />
      <CopyText
        title="شماره شبا:"
        desc="(به نام حسن دادگسترنیا)"
        text="IR330620000000202901868005"
      />
    </motion.div>
  );
}

export default DonateSection;
