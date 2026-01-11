import { ProtectedRoute } from "@/features/shared";
import React from "react";

export default function AuthorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute allowedRoles={["author"]}>{children}</ProtectedRoute>;
}
