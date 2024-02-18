import type { Metadata } from "next";
import { CustomProvider } from "rsuite";
import fa_IR from "rsuite/locales/fa_IR";
import { Toaster } from "react-hot-toast";
import Providers from "./Providers";
import ReduxProvider from "./ReduxProvider";

import "rsuite/dist/rsuite-rtl.min.css";
import "./globals.css";
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
        <CustomProvider locale={fa_IR} rtl>
          <Providers>
            <ReduxProvider>{children}</ReduxProvider>
          </Providers>
        </CustomProvider>
      </body>
    </html>
  );
}
