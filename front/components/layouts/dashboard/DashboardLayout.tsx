"use client";
import React, { useEffect, useState } from "react";
import http from "@/services/httpService";
import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { AUTHDATA } from "@/redux/slices/authSlice";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "../../../assets/css/dashboard.css";
import "../../../assets/fonts/dist/css/style.css";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: any) => {
  const dispatch: (dispatch: any) => Promise<AnyAction> = useDispatch();
  const router = useRouter();
  const [me, setMe] = useState<any>({});

  useEffect(() => {
    const handleVerify = async () => {
      try {
        const res = await http.get("/auth/verify");
        console.log(res);

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
    <div className="dashboard-bg flex items-start gap-8 p-8 h-screen">
      <Sidebar />
      <div className="dashboard-body flex flex-col gap-8 flex-1 h-full">
        <Header />
        <div className="dashboard-content flex-1 rounded-2xl p-8 pt-0 overflow-y-auto overflow-x-hidden">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
