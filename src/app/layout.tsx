import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { ReactNode } from "react";

import { ReactQueryProvider } from "./providers";

export const metadata: Metadata = {
  title: "GitHub User Search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ReactQueryProvider>
            <CssBaseline />
            {children}
          </ReactQueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
