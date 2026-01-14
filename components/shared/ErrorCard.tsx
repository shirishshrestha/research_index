"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

interface ErrorCardProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorCard({
  title = "Something went wrong",
  message = "We encountered an error while loading the data. Please try again.",
  onRetry,
  className = "",
}: ErrorCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-6 text-center border rounded-lg bg-destructive/5 ${className}`}
    >
      <div className="text-5xl mb-4">
        <TriangleAlert className="fill-destructive" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          Try Again
        </Button>
      )}
    </div>
  );
}
