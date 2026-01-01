import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface TopicCardProps {
  label: string;
  count: number;
  href: string;
}

export function TopicCard({ label, count, href }: TopicCardProps) {
  const displayText = `${label} (${count})`;
  const shouldTruncate = label.length > 30;
  const truncatedLabel = shouldTruncate
    ? `${label.substring(0, 30)}...`
    : label;
  const truncatedText = `${truncatedLabel} (${count})`;

  return (
    <Link
      href={href}
      className="flex items-center justify-center px-7.5 py-8 bg-gradient-blue rounded-[10px] text-white hover:opacity-90 transition-opacity shadow-md"
    >
      {shouldTruncate ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="heading-4 text-center leading-7!">
                {truncatedText}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-base font-medium">{displayText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <span className="heading-4 text-center leading-7!">{displayText}</span>
      )}
    </Link>
  );
}
