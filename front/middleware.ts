import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const url = req.url;
  let accessToken = req.cookies.get("accessToken");
  let refreshToken = req.cookies.get("refreshToken");
  

  if (accessToken?.value) {
    if (url.includes("/auth")) {
      return NextResponse.redirect("http://localhost:3001/dashboard");
    }
  }
  if (!accessToken?.value) {
    if (url.includes("/dashboard")) {
      return NextResponse.redirect("http://localhost:3001/auth");
    }
  }
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*", "/"],
};
