import { cn } from "@/lib/utils";
import Image from "next/image";
import type { IconName } from "./icons";

export interface IconProps {
  name: IconName | string;
  size?: number;
  className?: string;
  color?: string;
  onClick?: () => void;
}

export default function Icon({
  name,
  size = 24,
  className,
  color = "currentColor",
  onClick,
}: IconProps) {
  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      style={{
        width: size,
        height: size,
        color: color,
      }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <Image
        src={`/icons/${name}.svg`}
        alt={name}
        width={size}
        height={size}
        className="w-full h-full"
        style={{ color: color }}
      />
    </div>
  );
}
