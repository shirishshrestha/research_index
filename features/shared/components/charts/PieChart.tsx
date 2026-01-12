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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

/**
 * Reusable Pie Chart Component
 *
 * @param {Object} props
 * @param {string} props.title - Chart title
 * @param {Array<{name: string, value: number, color?: string}>} props.data - Chart data
 * @param {Array<string>} props.colors - Default colors to use if not specified in data
 * @param {boolean} props.isLoading - Loading state
 * @param {boolean} props.isError - Error state
 * @param {string} props.emptyMessage - Message to display when no data
 * @param {string} props.errorMessage - Message to display on error
 * @param {boolean} props.showLegend - Show legend (default: true)
 * @param {boolean} props.showTooltip - Show tooltip (default: true)
 * @param {boolean} props.showLabels - Show data labels on segments (default: false)
 * @param {string} props.dataKey - Key for pie data (default: "value")
 * @param {string} props.nameKey - Key for name (default: "name")
 * @param {number} props.height - Chart height (default: 400)
 * @param {string} props.className - Additional card className
 * @param {number} props.innerRadius - Inner radius (0 for full pie) (default: 0)
 * @param {number} props.outerRadius - Outer radius (default: 80)
 * @param {number} props.cx - Center X position (default: "50%")
 * @param {number} props.cy - Center Y position (default: "50%")
 */

interface PieChartDataItem {
  name?: string;
  value: number;
  color?: string;
  [key: string]: any;
}

interface PieChartProps {
  title: string;
  data?: PieChartDataItem[];
  colors?: string[];
  isLoading?: boolean;
  isError?: boolean;
  emptyMessage?: string;
  errorMessage?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  showLabels?: boolean;
  dataKey?: string;
  nameKey?: string;
  height?: number;
  className?: string;
  innerRadius?: number;
  outerRadius?: number;
  cx?: string | number;
  cy?: string | number;
}

export function PieChart({
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
  showLegend = true,
  showTooltip = true,
  showLabels = false,
  dataKey = "value",
  nameKey = "name",
  height = 400,
  className = "",
  innerRadius = 0,
  outerRadius = 80,
  cx = "50%",
  cy = "50%",
}: PieChartProps) {
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
          <Skeleton className="h-62.5 w-full rounded-full" />
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

  // Label render function
  const renderLabel = showLabels
    ? (entry: any) => {
        const percent = (
          (entry.value / data.reduce((sum, item) => sum + item[dataKey], 0)) *
          100
        ).toFixed(0);
        return `${percent}%`;
      }
    : undefined;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsPieChart>
            <Pie
              data={data}
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
              label={renderLabel}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || colors[index % colors.length]}
                />
              ))}
            </Pie>
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
                itemStyle={{ color: "var(--popover-foreground)" }}
              />
            )}
            {showLegend && <Legend />}
          </RechartsPieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
