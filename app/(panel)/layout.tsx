"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { UnifiedSidebar } from "@/components/layout/UnifiedSidebar";
import { AppBar } from "@/components/layout/AppBar";
import { sidebarConfig } from "@/config/sidebarConfig";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/features/auth/redux";
import { setupLogoutBroadcast } from "@/lib/broadcastLogout";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Setup cross-tab logout listener
  useEffect(() => {
    const cleanup = setupLogoutBroadcast(() => {
      dispatch(logout());
      router.push("/login");
    }, true);

    return cleanup;
  }, [dispatch, router]);

  // Determine user role and get appropriate menu items
  const userRole = user?.user_type?.toUpperCase() || "AUTHOR";
  const menuItems = sidebarConfig[userRole] || sidebarConfig.AUTHOR;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <UnifiedSidebar menuItems={menuItems} />
        <div className="flex flex-1 flex-col">
          <AppBar />
          <main className="flex-1 overflow-auto bg-background p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
