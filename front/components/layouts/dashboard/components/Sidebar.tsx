import { ReactNode, useRef } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IoClose } from "react-icons/io5";

//components
import UsersIcon from "@/components/shared/icons/UsersIcon";
import ImageIcon from "@/components/shared/icons/ImageIcon";
import CalenderIcon from "@/components/shared/icons/CalenderIcon";
import SendIcon from "@/components/shared/icons/SendIcon";
import HomeIcon from "@/components/shared/icons/HomeIcon";
import { CHANGE_OPEN_SIDEBAR } from "@/redux/slices/style/sidebarSlice";
import { useOutsideClick } from "@/hook/useOutsideClick";

type ChildItem = {
  name: string;
  route: string;
  icon: ReactNode;
  show?: boolean;
};

type SidebarItem = {
  name: string;
  route: string;
  icon: ReactNode;
  children?: ChildItem[];
  show?: boolean;
};

function Sidebar() {
  const dispatch = useDispatch();

  const { me } = useSelector((state: RootState) => state.auth);
  const { sidebar } = useSelector((state: RootState) => state.sidebar);
  const sidebarRef = useRef(null);

  const shouldShowItem = (userRoles: string[], requiredRoles: string[]): boolean => {
    return userRoles?.includes("SUPER") || userRoles?.some((role) => requiredRoles.includes(role));
  };

  const sidebarData: SidebarItem[] = [
    {
      name: "خانه",
      route: "/dashboard",
      show: true,
      icon: <HomeIcon />,
    },
    {
      name: "کاربران",
      show: shouldShowItem(me?.roles, ["ADMIN"]),
      route: "/dashboard/contact",
      icon: <UsersIcon />,
      children: [
        {
          name: "ایجاد کاربر",
          route: "/dashboard/contact/create",
          show: true,
          icon: <UsersIcon />,
        },
        {
          name: "فعالیت کاربران",
          route: "/dashboard/contact/useractive",
          show: true,
          icon: <UsersIcon />,
        },
        {
          name: "فعالیت کل",
          route: "/dashboard/contact/auditlog",
          show: shouldShowItem(me?.roles, ["SUPER"]),
          icon: <UsersIcon />,
        },
      ],
    },
    {
      name: "مدیریت محتوا ها",
      route: "/dashboard/contents",
      show: true,
      icon: <ImageIcon />,
      children: [
        {
          name: "ایجاد محتوا",
          route: "/dashboard/contents/create",
          show: true,
          icon: <ImageIcon />,
        },
      ],
    },
    {
      name: "مدیریت مناسبت ها",
      route: "/dashboard/events",
      show: true,
      icon: <CalenderIcon />,
      children: [
        {
          name: "ایجاد مناسبت",
          route: "/dashboard/events/create",
          show: true,
          icon: <CalenderIcon />,
        },
      ],
    },
    {
      name: "مدیریت اطلاعیه ها",
      route: "/dashboard/poster",
      show: true,
      icon: <SendIcon />,
      children: [
        {
          name: "ایجاد اطلاعیه",
          route: "/dashboard/poster/create",
          show: true,
          icon: <SendIcon />,
        },
      ],
    },
  ];

  const handleCloseSidebar = () => {
    dispatch(CHANGE_OPEN_SIDEBAR(false));
  };

  useOutsideClick(sidebarRef, handleCloseSidebar);

  return (
    <div
      ref={sidebarRef}
      className={`bg-mianColor w-72 h-full lg:rounded-2xl rounded-none p-6 transition-all ease-in-out lg:static fixed top-0 z-10 ${
        sidebar ? "right-0 shadow-xl" : "-right-80"
      }`}
    >
      <IoClose onClick={handleCloseSidebar} className="lg:hidden block text-2xl text-white absolute left-2 top-2 cursor-pointer" />
      <div className="light-scroll pl-3 overflow-y-auto w-full h-full flex flex-col gap-3">
        {sidebarData?.map(
          (item, index) =>
            item.show && (
              <div key={index} className=" flex flex-col gap-3 border border-white/30 p-2 rounded-lg">
                <Link
                  className="text-mianColor hover:gray-700 transition flex items-center gap-2 text-lg bg-white/70 backdrop-blur-xl rounded-xl h-12 px-4"
                  href={item.route}
                >
                  <div className="flex items-center justify-center text-2xl ">{item.icon}</div>

                  {item.name}
                </Link>

                {item.children &&
                  item.children.map(
                    (child, childIndex) =>
                      child.show && (
                        <Link
                          key={childIndex}
                          className="flex items-center gap-2 text-lg text-white hover:text-gray-700 transition bg-white/30 backdrop-blur-xl rounded-xl h-10 px-2 mr-4"
                          href={child.route}
                        >
                          <div className="flex items-center justify-center text-lg ">{child.icon}</div>
                          {child.name}
                        </Link>
                      )
                  )}
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Sidebar;
