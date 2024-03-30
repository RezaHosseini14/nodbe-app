"use client";
import React, { useEffect, useCallback } from "react";
import moment from "jalali-moment";
import MainHeader from "./components/Header";
import Footer from "./components/Footer";
import { holidays } from "@/json/holiday";
import { CHANGE_THEME } from "@/redux/slices/darkmode/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// ثابت‌های مربوط به حالت‌های نوری و تاریک
const LIGHT_MODE = "light";
const DARK_MODE = "dark";

// تابع برای به دست آوردن تاریخ امروز در تقویم جلالی
const getTodayDate = () => moment().format("jYYYY/jM/jD");

const MainLayout = ({ children }: any) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);

  // دریافت تعطیلی‌های مذهبی و تغییر تم اگر لازم است
  const fetchReligiousHolidays = useCallback(() => {
    const date = getTodayDate();
    const religiousHolidays = holidays
      ?.filter((holiday) => holiday.date === date)
      .flatMap((holiday) =>
        holiday.events
          ?.filter((event) => event.is_religious)
          .map((event) => ({
            description: event.description,
            isHoliday: event.is_holiday,
            eventCategory: event.description.includes("ولادت") ? "ولادت" : "شهادت",
          }))
      );

    if (religiousHolidays && religiousHolidays.length && religiousHolidays[0]?.eventCategory === "شهادت") {
      localStorage.setItem("darkmode", DARK_MODE);
      dispatch(CHANGE_THEME(true));
    } else {
      localStorage.setItem("darkmode", LIGHT_MODE);
      dispatch(CHANGE_THEME(false));
    }
  }, [dispatch]);

  // بروزرسانی تم بر اساس اطلاعات ذخیره شده محلی
  const updateThemeFromLocalStorage = useCallback(() => {
    const storedTheme = localStorage.getItem("darkmode");
    if (storedTheme === DARK_MODE && !theme) {
      dispatch(CHANGE_THEME(true));
    } else if (storedTheme === LIGHT_MODE && theme) {
      dispatch(CHANGE_THEME(false));
    }
  }, [dispatch, theme]);

  // اثر برای مدیریت تغییرات تم و دریافت تعطیلی‌های مذهبی
  useEffect(() => {
    fetchReligiousHolidays();
    updateThemeFromLocalStorage();

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
  }, [theme, fetchReligiousHolidays, updateThemeFromLocalStorage]);

  return (
    <>
      <MainHeader />
      <div className="container mt-8">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
