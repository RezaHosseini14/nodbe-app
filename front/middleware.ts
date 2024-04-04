import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {
  const url = req.url;
  const cookieStore = cookies();
  let accessToken = req.cookies.getAll();

  // let refreshToken = req.cookies.get("refreshToken");
  // if (accessToken?.value) {
  //   if (url.includes("/auth")) {
  //     return NextResponse.redirect(
  //       process.env.NEXT_PUBLIC_STATUS === "development"
  //         ? "http://localhost:3001/dashboard"
  //         : "https://nodbe-front.liara.run/dashboard"
  //     );
  //   }
  // }
  // if (!accessToken?.value) {
  //   if (url.includes("/dashboard")) {
  //     return NextResponse.redirect(
  //       process.env.NEXT_PUBLIC_STATUS === "development"
  //         ? "http://localhost:3001/auth"
  //         : "https://nodbe-front.liara.run/auth"
  //     );
  //   }
  // }
}

export const config = {
  matcher: ["/auth", "/dashboard/:path*"],
};
