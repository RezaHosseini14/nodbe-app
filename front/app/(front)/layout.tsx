import type { Metadata } from "next";
import MainLayout from "@/components/layouts/main/MainLayout";

export const metadata: Metadata = {
  title: "ندبه - پـایـگـاه اطـلاع رسـانـی هیئت شباب المهدی (عج)",
  description: "هیئت شباب المهدی (عج)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
