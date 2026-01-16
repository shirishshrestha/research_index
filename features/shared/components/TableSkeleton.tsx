import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
  columns: number;
  rows?: number;
  headers?: string[];
  className?: string;
}

/**
 * TableSkeleton - Loading skeleton for tables
 */
export default function TableSkeleton({
  columns,
  rows = 5,
  headers,
  className = "",
}: TableSkeletonProps) {
  return (
    <div className={`w-full overflow-x-auto rounded-lg ${className}`}>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border ">
            {headers && headers.length > 0
              ? headers.map((header, index) => (
                  <TableHead key={index} className="text-foreground">
                    {header}
                  </TableHead>
                ))
              : Array.from({ length: columns }).map((_, index) => (
                  <TableHead key={index}>
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="border-b border-border ">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex} className="py-3!">
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
