"use client";
import React, { useEffect } from "react";
import moment from "jalali-moment";
import { useQuery } from "react-query";
import MainHeader from "./components/Header";
import Footer from "./components/Footer";
import { checkHoliday } from "@/services/content/contentServices";
import { holidays } from "@/json/holiday";
import { CHANGE_THEME } from "@/redux/slices/darkmode/themeSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Event {
  description: string;
  is_religious: boolean;
  is_holiday: boolean;
}

interface Holiday {
  date: string;
  events?: Event[];
}

interface ReligiousHoliday {
  description: string;
  isHoliday: boolean;
  eventCategory: string;
}

const MainLayout = ({ children }: any) => {
  const dispatch: (dispatch: any) => Promise<AnyAction> = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const date = moment().format("jYYYY/jM/jD");

    const religiousHolidays: ReligiousHoliday[] = holidays
      ?.filter((holiday: Holiday) => holiday.date === date)
      .flatMap((holiday: Holiday) =>
        holiday.events
          ?.filter((event: Event) => event.is_religious)
          .map((event: Event) => ({
            description: event.description,
            isHoliday: event.is_holiday,
            eventCategory: event.description.includes("ولادت") ? "ولادت" : "شهادت",
          }))
      );

    if (
      religiousHolidays &&
      religiousHolidays.length &&
      religiousHolidays[0]?.eventCategory === "شهادت"
    ) {
      localStorage.setItem("darkmode", "dark");
      dispatch(CHANGE_THEME(true));
    } else {
      localStorage.setItem("darkmode", "light");
      dispatch(CHANGE_THEME(false));
    }

    if (localStorage.getItem("darkmode") === "dark") {
      dispatch(CHANGE_THEME(false));
    } else {
      dispatch(CHANGE_THEME(true));
    }

    const body = document.body;

    if (theme) {
      body.classList.remove("light");
      body.classList.add("dark");
      body.setAttribute("data-mode", "dark");
    } else {
      body.classList.remove("dark");
      body.classList.add("light");
      body.setAttribute("data-mode", "light");
    }
  }, [theme]);

  return (
    <>
      <MainHeader />
      <div className="container mt-8">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
