import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";
import Providers from "./Providers";
import ReduxProvider from "./ReduxProvider";

import "./globals.css";
import "rsuite/dist/rsuite-rtl.min.css";
import "../assets/css/style.css";

export const metadata: Metadata = {
  title: "ندبه - پـایـگـاه اطـلاع رسـانـی هیئت شباب المهدی (عج)",
  description: "هیئت شباب المهدی (عج)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="">
        <Toaster />
        <ReduxProvider>
          <Providers>{children}</Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
