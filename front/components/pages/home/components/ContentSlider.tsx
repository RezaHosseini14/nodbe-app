"use client";
import Link from "next/link";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";

//services
import { allContent } from "@/services/content/contentServices";

//components
import Card from "@/components/shared/Card";
import Loading from "@/components/shared/Loading";
import TitleBox from "@/components/shared/TitleBox";
import { cardVariants } from "@/utils/constant";
import { ContentType } from "@/types/types";

function ContentSlider() {
  const { data, isLoading } = useQuery(["allcontent", null, null], () => allContent(null, null));

  return (
    <>
      <motion.div
        className="lg:col-span-12 col-span-8 row-span-3"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        variants={cardVariants}
      >
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <TitleBox title="آخرین مراسمات" margin={false} />

              <Link className="font-medium text-xl dark:text-white text-mianColor" href="/contents">
                بیشتر
              </Link>
            </div>
            {data?.data?.contents.length ? (
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  350: {
                    slidesPerView: 1,
                  },
                  576: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                }}
                scrollbar={{ draggable: true }}
              >
                {data?.data?.contents.map((content: ContentType, index: number) => (
                  <SwiperSlide key={index}>
                    <Card data={content} index={index} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="col-span-4 flex items-center justify-center">
                <p className="font-medium text-xl">محتوای یافت نشد</p>
              </div>
            )}
          </>
        )}
      </motion.div>
    </>
  );
}

export default ContentSlider;
