import { MainNavItem, SidebarNavItem } from "@/types/nav"

export const mainNavItems = [
  {
    title: "Docs",
    href: "/docs/getting-started"
  }
] satisfies MainNavItem[]

export const sidebarNavItems = [
  {
    title: "Introduction",
    items: [
      {
        title: "Getting Started",
        href: "/docs/getting-started",
        items: [],
      },
      {
        title: 'Main Concepts',
        href: '/docs/main-concepts',
        items: [],
      },
      {
        title: "Middleware",
        href: "/docs/middleware",
        items: [],
      },
      {
        title: "Advanced",
        href: "/docs/advanced",
        items: [],
      },
    ],
  },
  {
    title: "API Reference",
    items: [
      {
        title: "App",
        href: "/docs/api/app",
        items: []
      },
      {
        title: "Request",
        href: "/docs/api/request",
        items: [],
      },
      {
        title: "Response",
        href: "/docs/api/response",
        items: [],
      }
    ]
  }
] satisfies SidebarNavItem[]
