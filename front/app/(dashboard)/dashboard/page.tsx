"use client";
import Loading from "@/components/shared/Loading";
import React from "react";
import { useQuery } from "react-query";
import { allCount } from "@/services/content/contentServices";
import UserContentChart from "@/components/pages/dashboard/components/UserContentChart";
import ContentsChart from "@/components/pages/dashboard/components/ContentsChart";

function DashboardPage() {
  const { data, error, isLoading } = useQuery({ queryKey: ["allcount"], queryFn: allCount });

  const date = new Date().toLocaleDateString("fa-IR");

  return (
    <div className="grid grid-cols-12 grid-rows-12 gap-8 h-full">
      <div className="xl:col-span-3 col-span-6 xl:row-span-3 lg:row-span-3 md:row-span-3 flex items-start shadow-lg rounded-xl border px-6 py-4 font-bold text-lg flex-col gap-4">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex items-center gap-6 h-full w-full">
            <div className="2xl:h-14 h-12 aspect-square rounded-2xl bg-mianColor/70 text-white text-3xl flex justify-center items-center text-mainColor shadow-lg">
              <span className="iconlyBulk-Image">
                <span className="path1"></span>
                <span className="path2"></span>
              </span>
            </div>
            <div className="flex items-start flex-col w-full">
              <span className="font-bold text-base">تعداد محتوا ها :</span>
              <span className="text-3xl font-extrabold">{data?.data?.allCount?.contentCount}</span>
            </div>
          </div>
        )}
      </div>

      <div className="xl:col-span-3 col-span-6 xl:row-span-3 lg:row-span-3 md:row-span-3 flex items-start shadow-lg rounded-xl border px-6 py-4 font-bold text-lg flex-col gap-4">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex items-center gap-6 h-full w-full">
              <div className="2xl:h-14 h-12 aspect-square rounded-2xl bg-mianColor/70 text-white text-3xl flex justify-center items-center text-mainColor shadow-lg">
                <span className="iconlyBulk-User3">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                  <span className="path4"></span>
                  <span className="path5"></span>
                  <span className="path6"></span>
                </span>
              </div>
              <div className="flex items-start flex-col w-full flex-1">
                <span className="font-bold text-base">تعداد ادمین ها :</span>
                <span className="text-3xl font-extrabold">{data?.data?.allCount?.userCount}</span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="xl:col-span-3 col-span-6 xl:row-span-3 lg:row-span-3 md:row-span-3 flex items-start shadow-lg rounded-xl border px-6 py-4 font-bold text-lg flex-col gap-4">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex items-center gap-6 h-full w-full">
            <div className="2xl:h-14 h-12 aspect-square rounded-2xl bg-mianColor/70 text-white text-3xl flex justify-center items-center text-mainColor shadow-lg">
              <span className="iconlyBulk-Image">
                <span className="path1"></span>
                <span className="path2"></span>
              </span>
            </div>
            <div className="flex items-start flex-col w-full">
              <span className="font-bold text-base">تعداد کل مراسمات :</span>
              <span className="text-3xl font-extrabold">12</span>
            </div>
          </div>
        )}
      </div>

      <div className="xl:col-span-3 col-span-6 xl:row-span-3 lg:row-span-3 md:row-span-3 flex items-start shadow-lg rounded-xl border px-6 py-4 font-bold text-lg gap-4">
        <div className="flex items-center gap-6 h-full w-full">
          <div className="2xl:h-14 h-12 aspect-square rounded-2xl bg-mianColor/70 text-white text-3xl flex justify-center items-center text-mainColor shadow-lg">
            <span className="iconlyBulk-Calendar">
              <span className="path1"></span>
              <span className="path2"></span>
              <span className="path3"></span>
              <span className="path4"></span>
            </span>
          </div>
          <div className="flex items-start flex-col w-full">
            <span className="font-bold text-base">تاریخ :</span>
            <span className="text-3xl font-extrabold">{date}</span>
          </div>
        </div>
      </div>

      <div className="xl:col-span-8 col-span-12 xl:row-span-9 lg:row-span-9 md:row-span-3 lex items-start shadow-lg rounded-xl border px-6 py-4 font-bold text-lg flex-col gap-4">
        <ContentsChart />
      </div>

      <div className="xl:col-span-4 col-span-12 xl:row-span-9 lg:row-span-9 md:row-span-3 flex items-start shadow-lg rounded-xl border px-6 py-4 font-bold text-lg flex-col gap-4">
        <UserContentChart />
      </div>
    </div>
  );
}

export default DashboardPage;
