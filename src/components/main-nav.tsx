"use client"

import * as React from "react"
import Link, {LinkProps} from "next/link"
import { usePathname } from "next/navigation"

import {OtterhttpIcon, OtterJSIcon} from "@/components/icons"
import { mainNavItems } from "@/config/nav";
import { cn } from "@/lib/utils"

function SiteTitle() {
  return (
    <Link href="/" className="mr-6 hidden lg:flex items-center space-x-2">
      <OtterJSIcon className="h-12 w-12" />
      <OtterhttpIcon className="h-8 w-32 pt-1" />
    </Link>
  )
}

type NavLinkProps = LinkProps & {
  activePathnamePrefix: string,
  children: React.ReactNode
}

export function MainNav() {
  const pathname = usePathname()

  function NavLink({ activePathnamePrefix, children, ...props }: NavLinkProps) {
    return (
      <Link
        {...props}
        className={
          cn(
            "transition-colors hover:text-foreground/80 text-nowrap whitespace-nowrap",
            pathname?.match(new RegExp(`^${activePathnamePrefix}\\b`))
              ? "text-foreground"
              : "text-foreground/60"
          )
        }
      >
        {children}
      </Link>
    )
  }

  return (
    <div className="mr-4 hidden sm:flex">
      <SiteTitle/>
      <nav className="items-center gap-6 text-sm hidden lg:flex">
        {
          mainNavItems.map(
            (item, index) => {
              if (!item.href) return null;

              return (
                <NavLink key={index} href={item.href} activePathnamePrefix={item.href}>
                  {item.title}
                </NavLink>
              )
            }
          )
        }
      </nav>
    </div>
  )
}