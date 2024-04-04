//@ts-nocheck
export const shamsi = (date: any) => {
  const d = new Date(date);
  const newDate = d.toLocaleDateString("fa");
  return newDate;
};

export const persianMonthDate = (date: any) => {
  const d = new Date(date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("fa-IR", options).format(d);

  return formattedDate;
};

export const getRoles = (roles: string[]) => {
  let userRole = "";
  switch (roles[0]) {
    case "ADMIN":
      userRole = "مدیر";
      break;
    case "USER":
      userRole = "کاربر عادی";
      break;
    case "SUPER":
      userRole = "مدیرکل";
      break;
    default:
      userRole = "ناشناخته";
      break;
  }
  return userRole;
};

export const shouldShowItem = (userRoles: string[], requiredRoles: string[]): boolean => {
  return requiredRoles.some((role) => userRoles?.includes(role));
};

export const toPersianYear = (gregorianYear: number): number => {
  return gregorianYear - 621;
};
