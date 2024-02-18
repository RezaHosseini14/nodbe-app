import React from "react";
import logo from "@/assets/img/logo.svg";
import Image from "next/image";

function PageLoading({
  loading,
}: {
  loading: boolean;
}) {
  return (
    <div
      className={`loading-container fixed top-0 right-0 w-full h-full bg-white/30 backdrop-blur-lg z-50 overflow-hidden flex items-center justify-center ${
        loading && "in"
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
  );
}

export default PageLoading;
