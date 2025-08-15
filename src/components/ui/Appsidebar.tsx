"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "./sidebar";
import {
  Home,
  Search,
  FolderClosed,
  Settings,
  ChevronRight,
  Plus,
  LifeBuoy,
  User,
  FolderPlus,
} from "lucide-react";
import { Button } from "./button";

type IconType = React.ComponentType<{ className?: string }>;
type NavItem = {
  label: string;
  href: string;
  icon: IconType;
  badge?: string | number;
  children?: { label: string; href: string }[];
};

const mainNav: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderClosed,
    // badge: 12,
    children: [
      { label: "Active", href: "/projects?filter=active" },
      { label: "Upcoming", href: "/projects?filter=upcoming" },
      { label: "Ended", href: "/projects?filter=ended" },
      { label: "Archived", href: "/projects?filter=archived" },
      { label: "Most Funded", href: "/projects?filter=mostFunded" },
      { label: "Most Trending", href: "/projects?filter=trending" },
      { label: "Most Liked", href: "/projects?filter=liked" },
      { label: "Fastest Funded", href: "/projects?filter=funded" },
      { label: "Biggest Raise", href: "/projects?filter=biggestRaise" },
    ],
  },
];

const secondaryNav: NavItem[] = [
  { label: "Add Project", href: "/addproject", icon: FolderPlus },
  { label: "Account", href: "/account", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Support", href: "/support", icon: LifeBuoy },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="group flex items-center gap-2 px-2">
          <span
            className="
        font-semibold tracking-tight
        group-data-[collapsible=icon]:block
        group-data-[collapsible=icon]:group-hover:hidden
      "
          >
            DkarnX
          </span>

          <SidebarTrigger
            className="
        ml-auto
        group-data-[collapsible=icon]:hidden
        group-data-[collapsible=icon]:group-hover:block
      "
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map(({ label, href, icon: Icon, badge, children }) => {
                const isActive =
                  pathname === href ||
                  (children && children.some((c) => pathname === c.href));
                const hasChildren = Boolean(children?.length);

                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={label}
                    >
                      <Link href={href}>
                        <Icon className="size-4" />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>

                    {badge != null && (
                      <SidebarMenuBadge>{badge}</SidebarMenuBadge>
                    )}

                    {hasChildren && (
                      <>
                        <SidebarMenuAction asChild showOnHover>
                          <button aria-label={`Open ${label} submenu`}>
                            <ChevronRight className="size-4" />
                          </button>
                        </SidebarMenuAction>

                        <SidebarMenuSub>
                          {children!.map((child) => (
                            <SidebarMenuSubItem key={child.href}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === child.href}
                              >
                                <Link href={child.href}>
                                  <span>{child.label}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Secondary */}
        <SidebarGroup>
          <SidebarGroupLabel>More</SidebarGroupLabel>
          <SidebarGroupAction asChild>
            <button aria-label="Create new">
              <Plus className="size-4" />
            </button>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav.map(({ label, href, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === href}
                    variant="outline"
                    tooltip={label}
                  >
                    <Link href={href}>
                      <Icon className="size-4" />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-2 text-xs text-muted-foreground">v1.0.0</div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

/**
 * Optional shell that pairs the sidebar with page content.
 * Use this in layout.tsx for a full-page sidebar layout.
 */
export function SidebarShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Top bar example */}
        <div className="flex h-12 items-center gap-2 border-b px-3">
          <SidebarTrigger />
          <div className="font-medium">Dashboard</div>
          <div className="ml-auto">
            <Button size="sm" variant="outline">
              Action
            </Button>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
