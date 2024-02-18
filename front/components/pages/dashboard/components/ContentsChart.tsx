import { useQuery } from "react-query";
import { contentOfMonth } from "@/services/content/contentServices";
// import Chart from "react-apexcharts";

import Loading from "@/components/shared/Loading";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function ContentsChart() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["contentofmonth"],
    queryFn: contentOfMonth,
  });

  const optionsData = (data?.data?.result?.map((item: any) => item.month) || []).reverse();
  const seriesData = (data?.data?.result?.map((item: any) => item.contentCount) || []).reverse();
  const options = {
    chart: {
      type: "area",
      width: "100%",
      height: "100%",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: optionsData,
      title: {
        text: "ماه",
        style: {
          fontSize: "14px",
          fontFamily: "ERPyb",
        },
      },
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "ERPyb",
        },
      },
    },

    yaxis: {
      title: {
        text: "تعداد محتوا",
        style: {
          fontSize: "14px",
          fontFamily: "ERPyb",
        },
      },
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "ERPyb",
        },
      },
    },

    colors: ["#739072"],

    fill: {
      colors: ["#739072"],
    },

    title: {
      text: "نمودار ماهیانه",
      align: "center",
      style: {
        fontSize: "18px",
        fontFamily: "ERPyb",
      },
    },

    dataLabels: {
      style: {
        fontSize: "12px",
        fontFamily: "ERPyb",
      },
    },

    loading: {
      enabled: isLoading,
      text: "Loading...",
    },
  };

  const series = [
    {
      name: "تعداد محتوا",
      data: seriesData,
      title: {
        text: "تعداد محتوا",
        style: {
          fontSize: "14px",
          fontFamily: "ERPyb",
        },
      },
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full h-full">
          {typeof window !== "undefined" && (
            <Chart options={options} series={series} type="area" height="100%" width="100%" />
          )}
        </div>
      )}
    </>
  );
}

export default ContentsChart;
