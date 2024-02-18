"use client";
import Loading from "@/components/shared/Loading";
import { contentById } from "@/services/content/contentServices";
import { persianMonthDate } from "@/utils/functions";
import Image from "next/image";
import { useQuery } from "react-query";

export default function Page({ params }: { params: { id: string } }) {
  const { data, error, isLoading } = useQuery(["contentById", params.id], () =>
    contentById(params.id)
  );

  return (
    <div>
      <div className="bg-[#707070] rounded-3xl w-full h-full">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="p-4">
            <h1 className="text-black font-bold text-2xl">{`مراسم :${data?.data?.content?.title}`}</h1>
            <h2 className="text-black font-medium text-xl">{`تاریخ :${persianMonthDate(
              data?.data?.content?.create
            )}`}</h2>

            <div className="flex flex-col gap-4 mt-16">
              {data?.data?.content?.files.map((file: any, index: number) => (
                <div key={index} className="">
                  <audio controls>
                    <source src={`${process.env.NEXT_PUBLIC_API_URL}/${file?.url}`} type="audio/mp3" />
                  </audio>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-5 mt-16">
              {data?.data?.content?.images.map((item: any, index: number) => (
                <div
                  key={index}
                  className="rounded-3xl bg-black w-full overflow-hidden aspect-square"
                >
                  {/* <img className="object-cover w-full h-full" src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.url}`} alt="asf" /> */}
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.url}`}
                    alt="asf"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
