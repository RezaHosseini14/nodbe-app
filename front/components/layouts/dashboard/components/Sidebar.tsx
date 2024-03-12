import { ReactNode } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

//components
import UsersIcon from "@/components/shared/icons/UsersIcon";
import ImageIcon from "@/components/shared/icons/ImageIcon";
import CalenderIcon from "@/components/shared/icons/CalenderIcon";
import SendIcon from "@/components/shared/icons/SendIcon";
import HomeIcon from "@/components/shared/icons/HomeIcon";

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
  const { me } = useSelector((state: RootState) => state.auth);

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

  return (
    <div className="bg-mianColor w-72 h-full rounded-2xl p-6 lg:block hidden transition-all ease-in-out">
      <div className="light-scroll pl-3 overflow-y-auto w-full h-full lg:flex hidden flex-col gap-3">
        {sidebarData?.map(
          (item, index) =>
            item.show && (
              <div
                key={index}
                className=" flex flex-col gap-3 border border-white/30 p-2 rounded-lg"
              >
                <Link
                  className="text-mianColor hover:text-[rgb(81 109 80)] flex items-center gap-2 text-lg bg-white/70 backdrop-blur-xl rounded-xl h-12 px-4"
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
                          className="flex items-center gap-2 text-lg text-white bg-white/30 backdrop-blur-xl rounded-xl h-10 px-2 mr-4"
                          href={child.route}
                        >
                          <div className="flex items-center justify-center text-lg ">
                            {child.icon}
                          </div>
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
