import * as React from "react"

import { ThemeProvider } from "@/components/theme-provider";
import { UserChoicesProvider } from "@/components/user-choices-provider";

export function TopLevelProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <UserChoicesProvider>
        {children}
      </UserChoicesProvider>
    </ThemeProvider>
  )
}