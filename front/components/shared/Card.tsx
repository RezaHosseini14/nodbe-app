import { ContentType } from "@/app/page";
import { persianMonthDate } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type CardType = {
  data: ContentType;
  index: number;
};

function Card({ data, index }: CardType) {
  return (
    <Link
      key={index}
      href={`/content/${data?._id}`}
      className="block bg-white/70 text-mianColorLight dark:bg-red-500/35 backdrop-blur-2xl w-full h-96 rounded-3xl p-4 shadow-mainShadow"
    >
      <div className="bg-blue-100 w-full aspect-square rounded-3xl overflow-hidden mb-2 shadow-md border">
        <img
          alt={data?.title}
          src={`${process.env.NEXT_PUBLIC_API_URL}/${data?.images[0]?.url}`}
          className="object-cover w-full h-full"
        />
        {/* <Image
          alt={data?.title}
          src={`${process.env.NEXT_PUBLIC_API_URL}/${data?.images[0]?.url}`}
          className="w-full h-full"
          objectFit="cover"
        /> */}
      </div>
      <p className="truncate text-center text-lg w-full font-bold dark:text-white">{data.title}</p>
      <p className="truncate text-center text-lg w-full dark:text-white">
        تاریخ مراسم : {persianMonthDate(data?.create)}
      </p>
    </Link>
  );
}

export default Card;
