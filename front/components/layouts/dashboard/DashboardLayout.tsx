"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import http from "@/services/httpService";
import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { AUTHDATA } from "@/redux/slices/authSlice";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "../../../assets/css/dashboard.css";
import "../../../assets/fonts/dist/css/style.css";

const DashboardLayout = ({ children }: any) => {
  const dispatch: (dispatch: any) => Promise<AnyAction> = useDispatch();

  const [me, setMe] = useState<any>({});
  const router = useRouter();

  // useEffect(() => {
  //   const handleVerify = async () => {
  //     const res = await http.get("/auth/verify");
  //     if (res?.status === 200) {
  //       dispatch(AUTHDATA(res?.data?.user));
  //       setMe(res?.data?.user);
  //     }
  //   };
  //   handleVerify();
  // }, []);

  useEffect(() => {
    const handleVerify = async () => {
      const res = await http.get("/auth/verify");
      if (res?.status === 200) {
        dispatch(AUTHDATA(res?.data?.user));
        setMe(res?.data?.user);
      }
    };
    handleVerify();
  }, [dispatch]);

  if (me) {
    return (
      <div className="dashboard-bg flex items-start gap-8 p-8 h-screen">
        <Sidebar />
        <div className="dashboard-body flex flex-col gap-8 flex-1 h-full">
          <Header />
          {/* <div className="dashboard-content flex-1 border border-1 border-mianColor rounded-2xl p-8 overflow-y-auto overflow-x-hidden"> */}
          <div className="dashboard-content flex-1 rounded-2xl p-8 pt-0 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    );
  } else {
    router.replace("/auth");
  }
};

export default DashboardLayout;
