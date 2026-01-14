"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { useLogoutMutation } from "@/features/auth";
import { broadcastLogout } from "@/lib/broadcastLogout";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, User, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ConfirmationPopup } from "../dialog";
import Link from "next/link";

export function AppBar() {
  const { user } = useAppSelector((state) => state.auth);
  const logoutMutation = useLogoutMutation();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleLogout = () => {
    broadcastLogout(); // Broadcast to other tabs first
    logoutMutation.mutate(); // This will clear query cache and logout
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card px-6 shadow-xs">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>

      <div className="flex items-center gap-3">
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center px-0 focus:ring-0! gap-2 hover:bg-transparent! hover:text-primary!"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                <User className="h-4 w-4" />
              </div>
              <span className="hidden md:inline-block">{user?.email}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.full_name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user?.user_type !== "admin" && (
              <Link
                href={
                  user?.user_type === "author"
                    ? "/author/profile"
                    : "/institution/profile"
                }
              >
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
            )}
            <Link href="/settings">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setLogoutOpen(true)}
              className="text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ConfirmationPopup
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        title="Logout"
        description="Are you sure you want to logout from your account?"
        confirmText="Logout"
        variant="danger"
        onConfirm={handleLogout}
        isPending={!!logoutMutation.isPending}
        isSuccess={!!logoutMutation.isSuccess}
        loadingText="Logging out..."
      />
    </header>
  );
}
