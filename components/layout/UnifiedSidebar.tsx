"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: MenuItem[];
}

interface UnifiedSidebarProps {
  menuItems: MenuItem[];
}

/**
 * Check if a menu item or any of its children is active
 */
function isMenuItemActive(item: MenuItem, pathname: string): boolean {
  // Check if current path matches item path
  const directMatch =
    pathname === item.path || pathname.startsWith(item.path + "/");

  // Check if any child is active
  const childMatch =
    item.children?.some(
      (child) =>
        pathname === child.path || pathname.startsWith(child.path + "/")
    ) || false;

  return directMatch || childMatch;
}

export function UnifiedSidebar({ menuItems }: UnifiedSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar className=" shadow-new bg-background">
      <SidebarContent className="bg-card border pt-0 shadow-new">
        {/* Logo Section */}
        <div className="flex justify-between items-center p-3 pb-0">
          <Image
            width={200}
            height={100}
            src="/logo.png"
            alt="logo"
            className="w-32.5"
            loading="eager"
          />
        </div>

        {/* Menu Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isMenuItemActive(item, pathname);

              // If item has children, render collapsible submenu
              if (item.children && item.children.length > 0) {
                return (
                  <Collapsible
                    key={item.path}
                    asChild
                    defaultOpen={isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton isActive={isActive}>
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                          <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className={"mx-0"}>
                          {item.children.map((child) => {
                            const ChildIcon = child.icon;
                            const isChildActive =
                              pathname === child.path ||
                              pathname.startsWith(child.path + "/");

                            return (
                              <SidebarMenuSubItem key={child.path}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isChildActive}
                                >
                                  <Link href={child.path}>
                                    {ChildIcon && (
                                      <ChildIcon className="h-4 w-4" />
                                    )}
                                    <span>{child.name}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }

              // Regular menu item without children
              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link className="flex items-center gap-3" href={item.path}>
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
