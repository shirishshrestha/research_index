import Image from "next/image";
import { Card } from "@/components/ui/card";
import { JournalCardProps } from "../types";
import Link from "next/link";

export function JournalCard({
  title,
  institution,
  imageUrl,
  badge,
  metrics,
  href = "#",
}: JournalCardProps) {
  return (
    <Link href={href}>
      <Card className="p-6.25 group transition-shadow  shadow-xs hover:shadow-md">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h4 className="heading-4 mb-1 text-primary group-hover:underline">
                {title}
              </h4>
              <p className="para">{institution}</p>
            </div>

            {/* Badge */}
            {badge && (
              <div className="shrink-0 bg-secondary text-white px-3.75 py-3 rounded-md flex items-center gap-2">
                <span className="text-base font-semibold leading-none">
                  {badge.label}
                </span>
                <span className="text-lg font-bold font-merriweather leading-none text-text-black">
                  {badge.value}
                </span>
              </div>
            )}
          </div>

          {/* Journal Details */}
          <div className="flex-1 flex gap-12.5 ">
            {imageUrl ? (
              <div className="shrink-0">
                <div className="relative w-28 h-37.5 overflow-hidden bg-gray-100">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="shrink-0">
                <div className="relative w-28 h-37.5 overflow-hidden bg-gray-100">
                  <Image
                    src={"/placeholder.jpg"}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <div className="bg-[#ccc] w-px"></div>
            {/* Metrics */}
            <div className="flex w-full items-center">
              <div className="flex justify-between w-full flex-wrap gap-x-8 gap-y-3">
                {metrics.map((metric, index) => (
                  <div key={index} className="">
                    <h4 className="heading-4 mb-2">{metric.value}</h4>
                    <p className="desc whitespace-nowrap">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
