import React, { ReactNode } from "react";

export interface PanelContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PanelContainer({
  children,
  className = "",
}: PanelContainerProps) {
  return <div className={`mx-auto max-w-425 ${className}`}>{children}</div>;
}
