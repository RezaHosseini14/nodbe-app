import Loading from "@/components/shared/Loading";
import Image from "next/image";
import React from "react";

function Poster({ posterData, posterLoading }: any) {
  return (
    <>
      {posterLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          {posterData?.data?.poster && posterData?.data?.poster.length > 0 && (
            <div className="bg-white rounded-xl overflow-hidden aspect-[1/1.41] mb-4 w-full">
              <img
                className="object-cover w-full h-full"
                src={`${process.env.NEXT_PUBLIC_API_URL}/${posterData?.data?.poster[0]?.image}`}
                alt="asf"
              />
            </div>
          )}

          {/* <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${posterData?.data?.poster[0]?.image}`}
              alt="asf"
              layout="fill"
              objectFit="cover"
            /> */}
          <div className="text-black">
            <p className="text-center font-bold text-lg">{posterData?.data?.poster[0]?.title}</p>
            <p className="text-center text-base">{posterData?.data?.poster[0]?.create}</p>
            <p className="text-center text-base">{posterData?.data?.poster[0]?.desc}</p>
          </div>
        </>
      )}
    </>
  );
}

export default Poster;
