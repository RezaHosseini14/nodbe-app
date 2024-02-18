"use client";
import { useQuery } from "react-query";
import { allContent } from "@/services/content/contentServices";
import Card from "@/components/shared/Card";
import Loading from "@/components/shared/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import Link from "next/link";
import { ContentType } from "@/app/(front)/page";
import "swiper/css";

function ContentSlider() {
  const { data, error, isLoading } = useQuery({ queryKey: ["allcontent"], queryFn: allContent });

  return (
    <>
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-bold text-2xl">آخرین مراسمات</h1>
            <Link className="font-medium text-xl text-gray-100" href="/contents">
              بیشتر
            </Link>
          </div>
          {data?.data?.contents.length ? (
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={20}
              slidesPerView={4}
              // navigation
              // pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}

              // onSwiper={(swiper) => console.log(swiper)}
              // onSlideChange={() => console.log("slide change")}
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
        </div>
      )}
    </>
  );
}

export default ContentSlider;
