import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LiaTrainSolid } from "react-icons/lia";
import { SlLocationPin } from "react-icons/sl";

import TitleBox from "@/components/shared/TitleBox";
import { cardVariants } from "@/utils/constant";

function LocationSection() {
  return (
    <motion.div
      id="location"
      className="lg:col-span-4 col-span-8 row-span-3 card sp_card"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      variants={cardVariants}
    >
      <TitleBox title="مسیرهای دسترسی" margin={true} />

      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col gap-8 z-10">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center justify-center gap-1 dark:bg-mianColorDark bg-mianColor rounded-lg px-2 py-1 text-white">
              <div className="text-2xl">
                <SlLocationPin />
              </div>
              <p className="text-lg">آدرس</p>
            </div>
            <p className="text-base">ایستگاه مترو دانشگاه شریف ، بلوار تیموری ، کوچه گلنار ، مدرسه هدایت میزان</p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center justify-center gap-1 dark:bg-mianColorDark bg-mianColor rounded-lg px-2 py-1 text-white">
              <div className="text-2xl">
                <LiaTrainSolid />
              </div>
              <p className="text-lg">مترو</p>
            </div>
            <p className="text-base">ایستگاه مترو دانشگاه شریف ، بلوار تیموری ، کوچه گلنار ، مدرسه هدایت میزان</p>
          </div>
        </div>

        <div className="w-full text-white">
          <Link
            href="https://nshn.ir/ad_bvHbNVxMwwR"
            className=" dark:bg-mianColorDark bg-mianColor rounded-xl w-full px-8 py-2 font-bold text-xl block text-center z-50"
          >
            مسیریابی
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default LocationSection;
