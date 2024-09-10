"use client"

import * as React from "react"

import useStorage from "@/hooks/use-storage";

const packageManagerSlugList = ["pnpm", "npm", "yarn", "bun"] as const
const runtimeSlugList = ["node", "bun"] as const

const packageManagerSlugSet = new Set<string>(packageManagerSlugList)
const runtimeSlugSet = new Set<string>(runtimeSlugList)

type PackageManagerSlug = typeof packageManagerSlugList[number]
type RuntimeSlug = typeof runtimeSlugList[number]

function isPackageManagerSlug(value: string): value is PackageManagerSlug {
  return packageManagerSlugSet.has(value)
}

function isRuntimeSlug(value: string): value is RuntimeSlug {
  return runtimeSlugSet.has(value)
}

export const userChoicesOptionsLists = {
  packageManager: packageManagerSlugList,
  runtime: runtimeSlugList,
}

export type UserChoicesContextProps = {
  packageManager: [PackageManagerSlug, (slug: PackageManagerSlug) => void]
  runtime: [RuntimeSlug, (slug: RuntimeSlug) => void]
}

export const UserChoicesContext = React.createContext<UserChoicesContextProps | null>(null)

export function UserChoicesProvider({ children }: { children?: React.ReactNode }) {
  const sessionStorage = useStorage("session")
  
  const [packageManager, setPackageManager] = React.useState<PackageManagerSlug | null>(null)
  const [runtime, setRuntime] = React.useState<RuntimeSlug | null>(null)
  
  React.useEffect(() => {
    const maybePackageManager = sessionStorage.getItem("code-group-package-manager")
    if (maybePackageManager == null) return
    if (!isPackageManagerSlug(maybePackageManager)) return
    setPackageManager(maybePackageManager)
  }, [])
  
  React.useEffect(() => {
    const maybeRuntime = sessionStorage.getItem("code-group-runtime")
    if (maybeRuntime == null) return
    if (!isRuntimeSlug(maybeRuntime)) return
    setRuntime(maybeRuntime)
  }, [])

  React.useEffect(() => {
    if (!packageManager) return
    sessionStorage.setItem("code-group-package-manager", packageManager)
  }, [packageManager]);
  
  React.useEffect(() => {
    if (!runtime) return
    sessionStorage.setItem("code-group-runtime", runtime)
  }, [runtime])
  
  return (
    <UserChoicesContext.Provider
      value={{
        packageManager: [packageManager ?? "pnpm", setPackageManager],
        runtime: [runtime ?? "node", setRuntime],
      }}
    >
      {children}
    </UserChoicesContext.Provider>
  )
}
