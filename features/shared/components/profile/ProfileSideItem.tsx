import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ProfileSideListItem } from "./types";

export interface ProfileSideItemProps {
  item: ProfileSideListItem;
}

export function ProfileSideItem({ item }: ProfileSideItemProps) {
  return (
    <Link
      key={item.id}
      href={item.href}
      className="flex items-center gap-3.75 group "
    >
      <figure className="w-20 h-20 rounded-md shrink-0 ring-1 ring-blue-01/20">
        {item.avatarUrl ? (
          <Image
            src={item.avatarUrl}
            alt={item.name}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        ) : (
          <Image
            src="/fallback-image.png"
            alt={item.name}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        )}
      </figure>
      <div className="flex-1 min-w-0 space-y-0.75">
        <h4 className="heading-4 text-lg! group-hover:underline ">
          {item.name}
        </h4>
        <p className="desc">{item.position}</p>
        {item.verifiedEmail && (
          <div className="desc">Verified at {item.verifiedEmail}</div>
        )}
      </div>
      <ChevronRight className="w-4 h-4 text-text-gray group-hover:text-primary transition-colors" />
    </Link>
  );
}
