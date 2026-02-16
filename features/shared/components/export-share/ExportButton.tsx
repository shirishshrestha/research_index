"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FileJson, FileText, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

interface ExportButtonProps {
  entityId: number;
  entityType: "journal" | "author" | "institution" | "publication";
  className?: string;
}

export const ExportButton = ({
  entityId,
  entityType,
  className = "",
}: ExportButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const getEndpointPath = () => {
    switch (entityType) {
      case "journal":
        return `/api/publications/journals/public/${entityId}/export/`;
      case "author":
        return `/api/publications/authors/public/${entityId}/export/`;
      case "institution":
        return `/api/publications/institutions/public/${entityId}/export/`;
      case "publication":
        return `/api/publications/public/${entityId}/export/`;
      default:
        return "";
    }
  };

  const handleExport = async (format: "json" | "csv" | "pdf") => {
    setIsExporting(true);
    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
      const url = `${backendUrl}${getEndpointPath()}?format=${format}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Export failed");
      }

      // Get filename from Content-Disposition header or create default
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `${entityType}_${entityId}.${format}`;

      if (contentDisposition) {
        const matches = /filename="(.+)"/.exec(contentDisposition);
        if (matches && matches[1]) {
          filename = matches[1];
        }
      }

      // Create blob and download
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);

      toast.success(
        `${entityType.charAt(0).toUpperCase() + entityType.slice(1)} exported as ${format.toUpperCase()} successfully`,
      );
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center gap-1.5 heading-para hover:text-primary transition-colors disabled:opacity-50 ${className}`}
          disabled={isExporting}
        >
          Export <ChevronDown className="stroke-[1.6px]" size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => handleExport("json")}
          className="cursor-pointer"
        >
          <FileJson className="mr-2 h-4 w-4" />
          Export as JSON
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleExport("csv")}
          className="cursor-pointer"
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleExport("pdf")}
          className="cursor-pointer"
        >
          <FileText className="mr-2 h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
