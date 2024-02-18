import Link from "next/link";
import React from "react";
import logo from "@/assets/img/logo.svg";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

function MainHeader() {
  const headerVariants: Variants = {
    offscreen: {
      opacity: 0, // اضافه کردن opacity به حالت offscreen
      //   y: 300,
    },
    onscreen: {
      opacity: 1, // اضافه کردن opacity به حالت onscreen
      //   y: 50,
      // rotate: -10,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 5,
      },
    },
  };
  return (
    <div className="header-container relative container pt-16 bg-gradient-to-t from-transparent dark:to-black/50 to-black/10 mb-20">
      {/* <div className="flex flex-col items-center justify-center w-full gap-8">
        <Image className="main-logo" src={logo} alt="logo" width={200} height={200} />
        <div className="relative w-full border-b border-t border-green-600 ">
          <div className=" w-full h-16 rounded-3xl p-4 flex items-center justify-center backdrop-blur-xl">
            <ul className="flex items-center gap-8 w-full text-lg font-medium justify-center z-10 dark:text-white text-green-700">
              <li>
                <Link href="/">مراسمات</Link>
              </li>

              <li>
                <Link href="/">مراسمات</Link>
              </li>

              <li>
                <Link href="/">مراسمات</Link>
              </li>
            </ul>
          </div>
        </div>
      </div> */}

      <motion.div
        className="flex flex-col items-center justify-center w-full gap-8"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        variants={headerVariants}
      >
        <Image className="main-logo" src={logo} alt="logo" width={200} height={200} />
        <div className="relative w-full border-b border-t border-green-600 ">
          <div className=" w-full h-16 rounded-3xl p-4 flex items-center justify-center backdrop-blur-xl">
            <ul className="flex items-center gap-8 w-full text-lg font-medium justify-center z-10 dark:text-white text-green-700">
              <li>
                <Link href="/">مراسمات</Link>
              </li>

              <li>
                <Link href="/">مراسمات</Link>
              </li>

              <li>
                <Link href="/">مراسمات</Link>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* <div className="relative">
      <div className="half-circle logo bg-[#707070]/70 flex items-start justify-center backdrop-blur-xl z-10">
        <Image src={logo} alt="logo" width={150} height={150} className="mt-8" />
      </div>

      <div className="bg-[#707070]/70 w-full h-24 rounded-3xl p-4 flex items-center justify-center backdrop-blur-xl">
        <ul className="flex items-center gap-8 w-full text-lg font-medium justify-center z-10 mt-8 text-white">
          <li>
            <Link href="/">مراسمات</Link>
          </li>

          <li>
            <Link href="/">مراسمات</Link>
          </li>

          <li>
            <Link href="/">مراسمات</Link>
          </li>
        </ul>
      </div>
    </div> */

export default MainHeader;
