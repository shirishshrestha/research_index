"use client";
// Polyfill DOMMatrix for SSR with required static methods
if (typeof global !== "undefined" && typeof global.DOMMatrix === "undefined") {
  class PolyfillDOMMatrix {
    a = 1;
    b = 0;
    c = 0;
    d = 1;
    e = 0;
    f = 0;

    constructor(init?: string | number[]) {
      if (Array.isArray(init) && init.length >= 6) {
        this.a = init[0];
        this.b = init[1];
        this.c = init[2];
        this.d = init[3];
        this.e = init[4];
        this.f = init[5];
      }
    }

    static fromFloat32Array(_array32: Float32Array): any {
      return new PolyfillDOMMatrix();
    }

    static fromFloat64Array(_array64: Float64Array): any {
      return new PolyfillDOMMatrix();
    }

    static fromMatrix(_other?: any): any {
      return new PolyfillDOMMatrix();
    }
  }

  // @ts-expect-error - Suppress type mismatch for SSR polyfill
  global.DOMMatrix = PolyfillDOMMatrix;
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

/**
 * Reusable Bar Chart Component
 *
 * @param {Object} props
 * @param {string} props.title - Chart title
 * @param {Array<{name: string, value: number, color?: string}>} props.data - Chart data
 * @param {Array<string>} props.colors - Default colors to use if not specified in data
 * @param {boolean} props.isLoading - Loading state
 * @param {boolean} props.isError - Error state
 * @param {string} props.emptyMessage - Message to display when no data
 * @param {string} props.errorMessage - Message to display on error
 * @param {boolean} props.showLegend - Show legend (default: false)
 * @param {boolean} props.showTooltip - Show tooltip (default: true)
 * @param {boolean} props.showGrid - Show grid (default: true)
 * @param {string} props.dataKey - Key for bar data (default: "value")
 * @param {string} props.xAxisKey - Key for x-axis (default: "name")
 * @param {number} props.height - Chart height (default: 300)
 * @param {string} props.className - Additional card className
 * @param {Array} props.radius - Bar corner radius (default: [8, 8, 0, 0])
 */

interface BarChartDataItem {
  name?: string;
  value: number;
  color?: string;
  [key: string]: any;
}

interface BarChartProps {
  title: string;
  data?: BarChartDataItem[];
  colors?: string[];
  isLoading?: boolean;
  isError?: boolean;
  emptyMessage?: string;
  errorMessage?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  showGrid?: boolean;
  dataKey?: string;
  xAxisKey?: string;
  height?: number;
  className?: string;
  radius?: [number, number, number, number];
}

export function BarChart({
  title,
  data = [],
  colors = [
    "var(--chart-blue)",
    "var(--chart-pink)",
    "var(--chart-green)",
    "var(--chart-yellow)",
    "var(--chart-purple)",
    "var(--chart-gray)",
  ],
  isLoading = false,
  isError = false,
  emptyMessage = "No data to display",
  errorMessage = "Failed to load chart data",
  showLegend = false,
  showTooltip = true,
  showGrid = true,
  dataKey = "value",
  xAxisKey = "name",
  height = 300,
  className = "",
  radius = [8, 8, 0, 0],
}: BarChartProps) {
  // Loading state
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent
          className="flex items-center justify-center"
          style={{ height: `${height}px` }}
        >
          <Skeleton className="h-62.5 w-full" />
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (isError) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent
          className="flex items-center justify-center"
          style={{ height: `${height}px` }}
        >
          <p className="text-destructive text-center">{errorMessage}</p>
        </CardContent>
      </Card>
    );
  }

  // Check if all values are zero
  const allZero =
    data.length === 0 || data.every((item) => item[dataKey] === 0);

  // Empty state
  if (allZero) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent
          className="flex items-center justify-center"
          style={{ height: `${height}px` }}
        >
          <p className="text-muted-foreground text-center">{emptyMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsBarChart data={data}>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            )}
            <XAxis dataKey={xAxisKey} stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
                itemStyle={{ color: "var(--popover-foreground)" }}
                labelStyle={{ color: "var(--muted-foreground)" }}
              />
            )}
            {showLegend && <Legend />}
            <Bar dataKey={dataKey} radius={radius}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || colors[index % colors.length]}
                />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
