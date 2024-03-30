"use client";
import { RootState } from "@/redux/store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSelector } from "react-redux";
import { CustomProvider } from "rsuite";
import fa_IR from "rsuite/locales/fa_IR";

function Providers({ children }: { children: ReactNode }) {
  const { theme } = useSelector((state: RootState) => state.theme);

  const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: twentyFourHoursInMs,
          },
        },
      })
  );

  return (
    // <CustomProvider locale={fa_IR} rtl>
    <CustomProvider theme={theme ? "dark" : "light"} locale={fa_IR} rtl>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CustomProvider>
  );
}

export default Providers;
