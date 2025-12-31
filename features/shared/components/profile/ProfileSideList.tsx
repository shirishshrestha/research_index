import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProfileSideListProps } from "./types";
import { Button } from "@/components/ui/button";
import { ProfileSideItem } from "./ProfileSideItem";

export function ProfileSideList({
  title,
  items,
  viewAllHref,
  emptyMessage = "No items to display",
}: ProfileSideListProps) {
  return (
    <Card className="p-0! border-0 shadow-none bg-background gap-8.75">
      <div className="flex items-center justify-between border-b border-b-[#ccc] pb-2.5">
        <h3 className="heading-4 text-text-black">{title}</h3>
        {viewAllHref && items.length > 0 && (
          <Link href={viewAllHref}>
            <Button variant={"outline"} className="follow-button mt-0">
              View All
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        )}
      </div>
      {items.length === 0 ? (
        <p className="text-text-gray text-sm text-center py-8">
          {emptyMessage}
        </p>
      ) : (
        <div className="flex flex-col gap-6.25">
          {items.map((item) => (
            <ProfileSideItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </Card>
  );
}
