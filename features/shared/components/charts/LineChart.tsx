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
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

/**
 * Reusable Line Chart Component
 *
 * @param {Object} props
 * @param {string} props.title - Chart title
 * @param {Array<{name: string, [key: string]: any}>} props.data - Chart data
 * @param {Array<{dataKey: string, color?: string, name?: string}>} props.lines - Line configurations
 * @param {Array<string>} props.colors - Default colors to use if not specified in lines
 * @param {boolean} props.isLoading - Loading state
 * @param {boolean} props.isError - Error state
 * @param {string} props.emptyMessage - Message to display when no data
 * @param {string} props.errorMessage - Message to display on error
 * @param {boolean} props.showLegend - Show legend (default: true)
 * @param {boolean} props.showTooltip - Show tooltip (default: true)
 * @param {boolean} props.showGrid - Show grid (default: true)
 * @param {boolean} props.showDots - Show data point dots (default: true)
 * @param {string} props.xAxisKey - Key for x-axis (default: "name")
 * @param {number} props.height - Chart height (default: 300)
 * @param {string} props.className - Additional card className
 * @param {string} props.strokeWidth - Line stroke width (default: 2)
 * @param {string} props.curveType - Line curve type (default: "monotone")
 */

interface LineDataItem {
  name?: string;
  [key: string]: any;
}

interface LineConfig {
  dataKey: string;
  color?: string;
  name?: string;
}

interface LineChartProps {
  title: string;
  data?: LineDataItem[];
  lines?: LineConfig[];
  colors?: string[];
  isLoading?: boolean;
  isError?: boolean;
  emptyMessage?: string;
  errorMessage?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  showGrid?: boolean;
  showDots?: boolean;
  xAxisKey?: string;
  height?: number;
  className?: string;
  strokeWidth?: number;
  curveType?: "monotone" | "linear" | "step" | "natural" | "basis";
}

export function LineChart({
  title,
  data = [],
  lines = [],
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
  showLegend = true,
  showTooltip = true,
  showGrid = true,
  showDots = true,
  xAxisKey = "name",
  height = 300,
  className = "",
  strokeWidth = 2,
  curveType = "monotone",
}: LineChartProps) {
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

  // Check if data is empty or all lines are empty
  const isEmpty = data.length === 0 || lines.length === 0;

  // Empty state
  if (isEmpty) {
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
          <RechartsLineChart data={data}>
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
            {lines.map((line, index) => (
              <Line
                key={line.dataKey}
                type={curveType}
                dataKey={line.dataKey}
                stroke={line.color || colors[index % colors.length]}
                strokeWidth={strokeWidth}
                dot={showDots}
                name={line.name || line.dataKey}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
