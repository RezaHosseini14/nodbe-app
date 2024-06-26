//@ts-nocheck
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
    <Link key={index} href={`/content/${data?._id}`} className="block card sp_card rounded-3xl">
      <div className="rounded-3xl bg-black w-full overflow-hidden aspect-square relative mb-2 shadow-md border dark:border-mianColorDark">
        {/* <img src={`${process.env.NEXT_PUBLIC_API_URL}/${data?.images[0]?.url}`} className="object-cover w-full h-full" alt="img" /> */}
        <Image src={`${process.env.NEXT_PUBLIC_API_URL}/${data?.images[0]?.url}`} alt="img" layout="fill" objectFit="cover" />
      </div>
      <p className="truncate text-center text-lg w-full font-bold dark:text-white text-mianColor">{data.title}</p>
      <p className="truncate text-center text-lg w-full font-medium dark:text-white text-mianColor">تاریخ مراسم : {persianMonthDate(data?.create)}</p>
    </Link>
  );
}

export default Card;
