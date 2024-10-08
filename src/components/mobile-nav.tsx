"use client";

import * as React from "react"
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { OtterJSIcon} from "@/components/icons";
import { siteConfig } from "@/config/site";
import { mainNavItems, sidebarNavItems } from "@/config/nav";
import { cn } from "@/lib/utils";
import { MainNavItem, NavItem, SidebarNavItem} from "@/types/nav";


type MobileLinkProps = {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
} & LinkProps

/**
 * Link component that automatically closes the mobile nav when pressed.
 *
 * @param href
 * @param onOpenChange
 * @param className
 * @param children
 * @param props
 * @constructor
 */
function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={(event) => {
        event.preventDefault()
        void router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  function MainNavItem(itemConfig: MainNavItem, itemIndex: number) {
    if (!itemConfig.href) return null

    return (
      <MobileLink
        key={itemIndex}
        href={itemConfig.href}
        onOpenChange={setOpen}
      >
        {itemConfig.title}
      </MobileLink>
    )
  }

  function SidebarNavSubItem(itemConfig: NavItem, itemIndex: number) {
    if (itemConfig.disabled) return null
    if (!itemConfig.href) return (<>{itemConfig.title}</>)

    function ItemLabel() {
      if (!itemConfig.label) return null;

      return (
        <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
          {itemConfig.label}
        </span>
      )
    }

    return (
      <React.Fragment
        key={itemIndex}
      >
        <MobileLink
          href={itemConfig.href}
          onOpenChange={setOpen}
          className="text-muted-foreground"
        >
          {itemConfig.title}
          <ItemLabel />
        </MobileLink>
      </React.Fragment>
    )
  }

  function SidebarNavItem(itemConfig: SidebarNavItem, itemIndex: number) {
    function Heading() {
      if (!itemConfig.href) return (
        <h4 className="font-medium">{itemConfig.title}</h4>
      )

      return (
        <MobileLink href={itemConfig.href} onOpenChange={setOpen}>
          <h4 className="font-medium">{itemConfig.title}</h4>
        </MobileLink>
      )
    }

    function SubItems() {
      if (itemConfig.items.length == 0) return null

      return (
        <>{itemConfig.items.map(SidebarNavSubItem)}</>
      )
    }

    return (
      <div key={itemIndex} className="flex flex-col space-y-3 pt-6">
        <Heading />
        <SubItems />
      </div>
    )
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <MenuIcon className="h-5 w-5"/>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <OtterJSIcon className="mr-2 h-8 w-8"/>
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-10">
          {/* Main nav items */}
          <div className="flex flex-col space-y-3">
            {mainNavItems.map(MainNavItem)}
            <Button asChild className="hidden xl:inline-block">
              <MobileLink href="/donate">Donate</MobileLink>
            </Button>
          </div>
          {/* 'Resources' Sidebar nav items */}
          <div className="flex flex-col space-y-2">
            {sidebarNavItems.map(SidebarNavItem)}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}