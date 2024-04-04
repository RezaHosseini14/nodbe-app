"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import defaultImg from "@/assets/img/default.png";
import Link from "next/link";

import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { CHANGE_OPEN_SIDEBAR } from "@/redux/slices/style/sidebarSlice";

function Header() {
  const dispatch = useDispatch();

  const { me } = useSelector((state: RootState) => state.auth);
  const { sidebar } = useSelector((state: RootState) => state.sidebar);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        credentials: "include",
      });
      if (data.status == 200) {
        router.replace("/auth");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getHeaderRoles = (roles: string[] = []) => {
    if (roles.length > 0) {
      switch (roles[0]) {
        case "ADMIN":
          return <span className="bg-green-100 text-green-600 py-1 px-2 rounded-lg font-bold text-xs">ادمین</span>;
        case "USER":
          return <span className="bg-red-100 text-red-600 py-1 px-2 rounded-lg font-bold text-xs">کاربر</span>;
        case "SUPER":
          return <span className="bg-green-100 text-green-600 py-1 px-2 rounded-lg font-bold text-xs">مدیرکل</span>;
        default:
          return <span className="bg-green-100 text-green-600 py-1 px-2 rounded-lg font-bold text-xs">ادمین</span>;
      }
    } else {
      return <span className="bg-green-100 text-green-600 py-1 px-2 rounded-lg font-bold text-xs">ادمین</span>;
    }
  };

  const handleOpenSidebar = () => {
    dispatch(CHANGE_OPEN_SIDEBAR(!sidebar));
  };

  return (
    <div className="dashboard-header bg-mianColor w-full h-16 rounded-2xl py-2 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <HiMiniBars3BottomRight className="text-xl text-white lg:hidden block cursor-pointer" onClick={handleOpenSidebar} />
        <Link href="/" className="font-bold text-2xl ">
          <span className="text-white">ندبه</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {me && (
          <div className="group text-white text-lg relative">
            <div className="flex items-center gap-2 cursor-pointer">
              <span>{me?.first_name}</span>
              <Image className="rounded-full" src={defaultImg} width={40} height={40} alt="عکس پروفایل" />
            </div>

            <div className="group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-4 opacity-0 invisible absolute left-0 top-14 bg-white/20 backdrop-blur-xl shadow-lg border border-mianColor/30 w-56 h-fit rounded-xl p-4 transition-all z-50">
              <ul className="flex flex-col items-center gap-4 w-full h-full ">
                <li className="rounded-lg w-full text-mianColor">
                  <div className="flex items-center gap-3">
                    <Image className="rounded-xl" src={defaultImg} width={40} height={40} alt="عکس پروفایل" />
                    <div className="flex flex-col items-start text-sm w-full">
                      <div className="flex items-center justify-between w-full">
                        <span>{me?.first_name}</span>
                        {getHeaderRoles(me?.roles)}
                      </div>
                      <span>{me?.last_name}</span>
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-gray-200 mt-2"></div>
                </li>

                <li className="rounded-lg bg-red-300/30 hover:bg-red-500 hover:text-white transition w-full text-red-500">
                  <button className="flex items-center justify-between px-3 py-2 w-full h-full" onClick={handleLogout}>
                    <span>خروج</span>
                    <span className="iconlyBulk-Logout text-lg">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
