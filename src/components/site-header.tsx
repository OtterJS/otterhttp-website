import * as React from "react";
import Link from "next/link";

import { GithubIcon } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { SecondaryNav } from "@/components/secondary-nav";
import { ColourModeToggle } from "@/components/colour-mode-toggle"
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* left-aligned nav (desktop only) */}
        <MainNav />
        <MobileNav />

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Persistent nav (desktop + mobile) */}
            <SecondaryNav />
          </div>

          {/* Icon nav (socials, colour mode, dashboard) */}
          <nav className="flex items-center">
            <ColourModeToggle />
            <Button variant="ghost" className="w-9 px-0" asChild>
              <Link href={siteConfig.links.github}>
                <GithubIcon className="h-[1.2rem] w-[1.2rem]"/>
              </Link>
            </Button>
          </nav>
        </div>

      </div>
    </header>
  )
}