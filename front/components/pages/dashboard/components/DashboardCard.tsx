import React, { ReactNode } from "react";
import Loading from "@/components/shared/Loading";

type DashboardCardType = {
  loading: boolean;
  data: any;
  icon: ReactNode;
  title: string;
};

function DashboardCard({ loading, data, icon, title }: DashboardCardType) {
  return (
    <>
      <div className="xl:col-span-3 col-span-6 xl:row-span-3 lg:row-span-3 md:row-span-3 flex items-start shadow-lg rounded-xl border px-6 py-4 font-bold text-lg flex-col gap-4">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex items-center gap-6 h-full w-full">
            <div className="2xl:h-14 h-12 aspect-square rounded-2xl bg-mianColor/70 text-white text-3xl flex justify-center items-center text-mainColor shadow-lg">
              {icon}
            </div>
            <div className="flex items-start flex-col w-full">
              <span className="font-bold text-base">{title}</span>
              <span className="text-3xl font-extrabold">{data}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DashboardCard;
