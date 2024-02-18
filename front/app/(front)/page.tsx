"use client";
import { useQuery } from "react-query";
import { lastPoster } from "@/services/poster/posterServices";

import Poster from "@/components/layouts/main/components/homepage/Poster";
import ContentSlider from "@/components/layouts/main/components/homepage/ContentSlider";
import Panel from "@/components/shared/Panel";
import PageLoading from "@/components/shared/PageLoading";
import { motion, Variants } from "framer-motion";

export type ContentType = {
  create: string;
  createdAt: string;
  desc: string;
  event: string;
  eventChild: any;
  files: any;
  images: any;
  show: boolean;
  title: string;
  updatedAt: string;
  __v: any;
  _id: string;
};

const Home = () => {
  const {
    data: posterData,
    error: posterError,
    isLoading: posterLoading,
  } = useQuery({
    queryKey: ["lastposter"],
    queryFn: lastPoster,
  });

  // const [show,setShow]=useS

  const cardVariants: Variants = {
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
    <>
      {/* {posterLoading ? (
        <PageLoading loading={posterLoading} />
      ) : ( */}
      <div className="h-full">
        <div className="grid grid-cols-12 grid-rows-9 gap-8">
          {/* <div className="col-span-12 row-span-3">
            <ContentSlider />
          </div> */}

          <motion.div
            className="col-span-12 row-span-3"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={cardVariants}
          >
            <ContentSlider />
          </motion.div>

          <motion.div
            className="col-span-9 row-span-3 dark:bg-red-500/35 bg-white/70 rounded-xl p-4 shadow-mainShadow"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={cardVariants}
          ></motion.div>

          <motion.div
            className="col-span-3 row-span-3 dark:bg-red-500/35 bg-white/70 rounded-xl p-4 shadow-mainShadow"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={cardVariants}
          >
            <Poster posterData={posterData} posterLoading={posterLoading} />
          </motion.div>

          <motion.div
            className="col-span-7 row-span-3 dark:bg-red-500/35 bg-white/70 rounded-xl p-4 shadow-mainShadow"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={cardVariants}
          ></motion.div>

          <motion.div
            className="col-span-5 row-span-3 dark:bg-red-500/35 bg-white/70 rounded-xl p-4 shadow-mainShadow"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={cardVariants}
          ></motion.div>

          {/* <Panel col={9} row={3}>
            as
          </Panel>

          <Panel col={3} row={3}>
            <Poster posterData={posterData} posterLoading={posterLoading} />
          </Panel>

          <Panel col={7} row={3} title="آدرس هیئت">
            as
          </Panel>

          <Panel col={5} row={3} title="کمک به هیئت">
            as
          </Panel> */}
        </div>
      </div>
      {/* )} */}
    </>
  );
};
export default Home;
