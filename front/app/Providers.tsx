"use client";
import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

function Providers({ children }: { children: ReactNode }) {
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

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default Providers;
