"use client";

import { VideoStoreProvider } from "@/providers/video-store-provider";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <VideoStoreProvider>{children}</VideoStoreProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
