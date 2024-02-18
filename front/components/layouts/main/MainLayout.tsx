"use client";
import React, { useEffect } from "react";
import MainHeader from "./components/Header";
import http from "@/services/httpService";
import Footer from "./components/Footer";

const MainLayout = ({ children }: any) => {
  // useEffect(() => {
  //   const handleCheckHoliday = async () => {
  //     try {
  //       const res = await http.get(`/holiday/holiday`);
  //       const event = res?.data?.religiousHolidays;
  //       if (event && event?.length && event[0]?.eventCategory === "شهادت") {
  //         document.body.classList.add("dark");
  //       } else {
  //         document.body.classList.add("light");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   handleCheckHoliday();
  // }, []);

  return (
    <>
      <MainHeader />
      <div className="container mt-8">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
