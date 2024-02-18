import type { Metadata } from "next";
import DashboardLayout from "@/components/layouts/dashboard/DashboardLayout";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "داشبورد",
  description: "داشبورد",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Toaster />
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
