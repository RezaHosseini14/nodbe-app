import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";

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

  function shouldShowItem(userRoles: string[], requiredRoles: string[]): boolean {
    return userRoles?.includes("SUPER") || userRoles?.some((role) => requiredRoles.includes(role));
  }

  const sidebarData: SidebarItem[] = [
    {
      name: "خانه",
      route: "/dashboard",
      show: true,
      icon: <span className="iconlyBulk-Home"></span>,
    },
    {
      name: "کاربران",
      show: shouldShowItem(me?.roles, ["ADMIN"]),
      route: "/dashboard/contact",
      icon: (
        <span className="iconlyBulk-User3">
          <span className="path1"></span>
          <span className="path2"></span>
          <span className="path3"></span>
          <span className="path4"></span>
          <span className="path5"></span>
          <span className="path6"></span>
        </span>
      ),
      children: [
        {
          name: "ایجاد کاربر",
          route: "/dashboard/contact/create",
          show: true,
          icon: (
            <span className="iconlyBulk-Add-User">
              <span className="path1"></span>
              <span className="path2"></span>
              <span className="path3"></span>
            </span>
          ),
        },
        {
          name: "فعالیت کاربران",
          route: "/dashboard/contact/useractive",
          show: true,
          icon: (
            <span className="iconlyBulk-User3">
              <span className="path1"></span>
              <span className="path2"></span>
              <span className="path3"></span>
              <span className="path4"></span>
              <span className="path5"></span>
              <span className="path6"></span>
            </span>
          ),
        },
        {
          name: "فعالیت کل",
          route: "/dashboard/contact/auditlog",
          show: shouldShowItem(me?.roles, ["SUPER"]),
          icon: (
            <span className="iconlyBulk-User3">
              <span className="path1"></span>
              <span className="path2"></span>
              <span className="path3"></span>
              <span className="path4"></span>
              <span className="path5"></span>
              <span className="path6"></span>
            </span>
          ),
        },
      ],
    },
    {
      name: "مدیریت محتوا ها",
      route: "/dashboard/contents",
      show: true,
      icon: (
        <span className="iconlyBulk-Image">
          <span className="path1"></span>
          <span className="path2"></span>
        </span>
      ),
      children: [
        {
          name: "ایجاد محتوا",
          route: "/dashboard/contents/create",
          show: true,
          icon: (
            <span className="iconlyBulk-Image">
              <span className="path1"></span>
              <span className="path2"></span>
            </span>
          ),
        },
      ],
    },
    {
      name: "مدیریت مناسبت ها",
      route: "/dashboard/events",
      show: true,
      icon: (
        <span className="iconlyBulk-Calendar">
          <span className="path1"></span>
          <span className="path2"></span>
          <span className="path3"></span>
          <span className="path4"></span>
        </span>
      ),
      children: [
        {
          name: "ایجاد مناسبت",
          route: "/dashboard/events/create",
          show: true,
          icon: (
            <span className="iconlyBulk-Calendar">
              <span className="path1"></span>
              <span className="path2"></span>
              <span className="path3"></span>
              <span className="path4"></span>
            </span>
          ),
        },
      ],
    },
    {
      name: "مدیریت اطلاعیه ها",
      route: "/dashboard/poster",
      show: true,
      icon: (
        <span className="iconlyBulk-Send">
          <span className="path1"></span>
          <span className="path2"></span>
        </span>
      ),
      children: [
        {
          name: "ایجاد اطلاعیه",
          route: "/dashboard/poster/create",
          show: true,
          icon: (
            <span className="iconlyBulk-Send">
              <span className="path1"></span>
              <span className="path2"></span>
            </span>
          ),
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
