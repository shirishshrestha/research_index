import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArticleCardProps } from "../types";
import { Icon } from "@/components/shared";

export function ArticleCard({
  title,
  authors,
  publishedAt,
  doi,
  badge,
  href = "#",
}: ArticleCardProps) {
  return (
    <Link href={href}>
      <Card className="p-6.25 group  hover:shadow-md duration-300 transition-shadow shadow-none">
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4 ">
            <div className="flex-1">
              <h4 className="heading-4 mb-2 text-primary group-hover:underline">
                {title}
              </h4>
              <p className="para mb-1">{authors}</p>
              <div className="flex">
                <p className="desc text-base italic! mb-1.25">
                  Published at: {publishedAt}.&nbsp;
                </p>
                <p className="desc text-base italic!">DOI: {doi}</p>
              </div>
            </div>

            {/* Badge */}
            {badge && (
              <span className="text-base font-medium text-text-black">
                {badge.value} Cite
              </span>
            )}
          </div>

          {/* Article Details */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="pdf" size={24} className="" />
              <span className="text-base font-medium text-primary">
                View PDF
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
