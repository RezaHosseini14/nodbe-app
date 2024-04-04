"use client";
import { useQuery } from "react-query";

//components
import UserContentChart from "@/components/pages/dashboard/components/UserContentChart";
import ContentsChart from "@/components/pages/dashboard/components/ContentsChart";

//services
import { allCount } from "@/services/content/contentServices";
import DashboardCard from "@/components/pages/dashboard/components/DashboardCard";
import ImageIcon from "@/components/shared/icons/ImageIcon";
import UsersIcon from "@/components/shared/icons/UsersIcon";
import CalenderIcon from "@/components/shared/icons/CalenderIcon";

function DashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ["allcount"], queryFn: allCount });
  const date = new Date().toLocaleDateString("fa-IR");
  
  return (
    <div className="sm:grid flex flex-col md:grid-cols-12 grid-cols-2 md:grid-rows-12 gap-8 sm:h-full">
      <DashboardCard
        loading={isLoading}
        data={data?.data?.allCount?.contentCount}
        icon={<ImageIcon />}
        title="تعداد محتوا ها :"
      />

      <DashboardCard
        loading={isLoading}
        data={data?.data?.allCount?.userCount}
        icon={<UsersIcon />}
        title="تعداد ادمین ها :"
      />

      <DashboardCard
        loading={isLoading}
        data="12"
        icon={<UsersIcon />}
        title="تعداد کل مراسمات :"
      />

      <DashboardCard loading={isLoading} data={date} icon={<CalenderIcon />} title="تاریخ :" />

      <div className="xl:col-span-8 col-span-12 xl:row-span-9 lg:row-span-9 md:row-span-3 md:h-full h-96 lex items-start shadow-lg rounded-xl border px-6 py-4 font-bold text-lg flex-col gap-4">
        <ContentsChart />
      </div>

      <div className="xl:col-span-4 col-span-12 xl:row-span-9 lg:row-span-9 md:row-span-3 md:h-full h-96 flex items-start shadow-lg rounded-xl border px-6 py-4 font-bold text-lg flex-col gap-4">
        <UserContentChart />
      </div>
    </div>
  );
}

export default DashboardPage;
