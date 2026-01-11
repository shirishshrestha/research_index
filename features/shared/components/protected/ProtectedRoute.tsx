"use client";

import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Array<"admin" | "institution" | "author">;
}

/**
 * ProtectedRoute Component
 * Wraps page content and ensures user has proper role/authentication
 * Shows loading state and redirects if unauthorized
 */
export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Wait for Redux to rehydrate from persistence
    const timer = setTimeout(() => {
      if (!isAuthenticated || !user) {
        // Not authenticated, redirect to login
        router.push("/login");
        return;
      }

      if (!allowedRoles.includes(user.user_type)) {
        // Authenticated but wrong role
        router.push("/unauthorized");
        return;
      }

      // All checks passed
      setIsChecking(false);
    }, 100); // Small delay to allow Redux persist to rehydrate

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, allowedRoles, router]);

  // Show loading state to prevent flash of unauthorized content
  if (isChecking) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Render protected content
  return <>{children}</>;
}
