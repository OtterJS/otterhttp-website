import * as React from "react";

import { UserChoicesContext } from "@/components/user-choices-provider";

export type { UserChoicesContextProps } from "@/components/user-choices-provider";

export function useUserChoices() {
  const context = React.useContext(UserChoicesContext)

  if (!context) {
    throw new Error("useUserChoices must be used within a <UserChoicesProvider />")
  }

  return context
}
