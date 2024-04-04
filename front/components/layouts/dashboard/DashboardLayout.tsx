"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { AUTHDATA } from "@/redux/slices/authSlice";

//components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

//services
import http from "@/services/httpService";

import "../../../assets/css/dashboard.css";
import "../../../assets/fonts/dist/css/style.css";

const DashboardLayout = ({ children }: any) => {
  const dispatch: (dispatch: any) => Promise<AnyAction> = useDispatch();
  const router = useRouter();
  const [me, setMe] = useState<any>({});

  useEffect(() => {
    const handleVerify = async () => {
      try {
        const res = await http.get("/auth/verify");
        if (res?.status === 200) {
          dispatch(AUTHDATA(res?.data?.user));
          setMe(res?.data?.user);
        }
      } catch (error) {
        router.replace("/auth");
        console.error("Error occurred while verifying authentication:", error);
      }
    };
    handleVerify();
  }, [dispatch]);

  if (!me.username) {
    return null;
  }

  return (
    <div className="dashboard-bg flex items-start gap-8 sm:p-8 p-2 h-screen">
      <Sidebar />
      <div className="dashboard-body flex flex-col gap-8 flex-1 w-full h-full">
        <Header />
        <div className="dashboard-content flex-1 rounded-2xl sm:p-8 p-2 pt-0 overflow-y-auto overflow-x-hidden">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
