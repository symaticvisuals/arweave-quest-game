// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ArweaveWalletKit } from "arweave-wallet-kit";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class">
        <ArweaveWalletKit
          config={{
            permissions: [
              "ACCESS_ADDRESS",
              "SIGN_TRANSACTION",
              "DISPATCH",
              "SIGNATURE",
              "ACCESS_ADDRESS",
              "ACCESS_PUBLIC_KEY",
              "ENCRYPT",
              "DECRYPT",
            ],
            ensurePermissions: true,
            appInfo: {
              name: "StarterKit",
            },
          }}
        >
          {children}
        </ArweaveWalletKit>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
