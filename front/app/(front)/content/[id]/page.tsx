"use client";

import { useEffect } from "react";
import { initLightboxJS, SlideshowLightbox } from "lightbox.js-react";
import moment from "jalali-moment";
import { useQuery } from "react-query";

//css
import "lightbox.js-react/dist/index.css";

//icons
import { IoImageOutline } from "react-icons/io5";
import { TbHeadphones } from "react-icons/tb";
import { IoCalendarOutline } from "react-icons/io5";

//components
import Loading from "@/components/shared/Loading";
import PageLoading from "@/components/shared/PageLoading";

//services
import { contentById } from "@/services/content/contentServices";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useQuery(["contentById", params.id], () => contentById(params.id));

  const create = data?.data?.content?.create || null;

  const persianDate = create
    ? moment(create, "YYYY-MM-DDTHH:mm:ssZ").locale("fa").format("D MMMM YYYY")
    : "";

  const imageLoader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_API_URL}/${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <PageLoading loading={isLoading}>
      <div className="flex flex-col gap-8">
        <div className="content-details flex flex-col gap-4 dark:text-white text-mianColor">
          <h1 className="font-bold text-2xl">{`مراسم :${data?.data?.content?.title}`}</h1>
          <div className="flex items-center gap-1">
            <span className="text-xl">
              <IoCalendarOutline />
            </span>
            <h2 className="font-medium text-xl">{`تاریخ مراسم : ${persianDate}`}</h2>
          </div>
        </div>

        <div className="dark:bg-mianColorDarkBox dark:text-white border border-mianColorDark bg-white/70 dark shadow-2xl rounded-3xl w-full h-full">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="flex flex-col gap-16 md:p-8 p-4">
              <div className="audios">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    <TbHeadphones />
                  </span>
                  <h2 className="font-bold text-2xl">صوت‌های مراسم</h2>
                </div>
                <hr className="border dark:border-mianColorDark border-mianColor" />
                <div className="flex flex-col md:gap-4 gap-8 mt-6">
                  {data?.data?.content?.files.map((file: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center sm:justify-between text-lg sm:flex-row flex-col"
                    >
                      <div className="audio-details flex items-center gap-2">
                        <span>{file?.audioType} :</span>
                        <span>{file?.audioDesc}</span>
                      </div>
                      <div key={index} className="">
                        <audio controls className="">
                          <source
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${file?.url}`}
                            type="audio/mp3"
                          />
                        </audio>
                        {/* <Waveform audio={`${process.env.NEXT_PUBLIC_API_URL}/${file?.url}`} /> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="images">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    <IoImageOutline />
                  </span>
                  <h2 className="font-bold text-2xl">تصاویر مراسم</h2>
                </div>
                <hr className="border dark:border-mianColorDark border-mianColor" />
                {/* <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-2 sm:gap-8 gap-4 mt-6">
                    {data?.data?.content?.images.map((item: any, index: number) => (
                      <GalleryLightBox images={data?.data?.content?.images}>
                        <div
                          key={index}
                          className="rounded-3xl bg-black w-full overflow-hidden aspect-square relative h-full"
                        >
                          <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.url}`}
                            alt="img"
                            layout="fill"
                            loading="lazy"
                            loader={imageLoader}
                            objectFit="cover"
                          />
                        </div>
                      </GalleryLightBox>
                    ))}
                  </div> */}

                <SlideshowLightbox className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-2 sm:gap-8 gap-4 mt-6">
                  {data?.data?.content?.images.map((item: any, index: number) => (
                    <img
                      className="w-full h-full object-cover rounded-lg"
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.url}`}
                    />
                  ))}
                </SlideshowLightbox>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLoading>
  );
}
