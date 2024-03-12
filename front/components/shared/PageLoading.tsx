"use client";
import logo from "@/assets/img/logo.svg";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ReactNode } from "react";

function PageLoading({ loading, children }: { loading: boolean; children: ReactNode }) {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <>
      {loading ? (
        <div
          className={`loading-container ${
            theme ? "bg-black/30" : "bg-white/30"
          } fixed top-0 right-0 w-full h-full dark:bg-black/30 bg-white/30 backdrop-blur-lg z-50 overflow-hidden flex items-center justify-center ${
            loading ? "in" : "fade"
          }`}
        >
          <Image
            className="main-logo fade-animation"
            src={logo}
            alt="logo"
            width={200}
            height={200}
          />
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default PageLoading;
