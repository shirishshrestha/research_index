import { ProtectedRoute } from "@/features/shared";
import React from "react";

export default function InstitutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["institution"]}>{children}</ProtectedRoute>
  );
}
