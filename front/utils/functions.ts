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
  if (roles[0] == "") {
    switch (roles[1]) {
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
  } else {
    switch (roles[0]) {
      case "ADMIN":
        userRole = "مدیر";
        break;
      case "USER":
        userRole = "اپراتور";
        break;
      case "GUEST":
        userRole = "مهمان";
        break;
      default:
        userRole = "ناشناخته";
        break;
    }
  }
  return userRole;
};

export function shouldShowItem(userRoles: string[], requiredRoles: string[]): boolean {
  return requiredRoles.some((role) => userRoles?.includes(role));
}
