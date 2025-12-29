import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface AuthorCardProps {
  id: string;
  name: string;
  position: string;
  verifiedAffiliation?: string;
  imageUrl?: string;
  href?: string;
}

export function AuthorCard({
  id,
  name,
  position,
  verifiedAffiliation,
  imageUrl,
  href = `/authors/${id}`,
}: AuthorCardProps) {
  return (
    <Card className="p-6.25 group rounded-xl border-0 transition-all border-b-3  border-transparent hover:border-b-primary flex flex-row justify-between gap-4 hover:shadow-md">
      {/* Profile Image */}
      <div className="flex items-center gap-3.75 justify-between">
        <Link href={href}>
          <div className="w-16 h-16 rounded-xl bg-gray-200 shrink-0 overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={"/fallback-image.png"}
                alt={name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </Link>
        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <Link href={href}>
            <h4 className="heading-4 text-lg! text-text-black group-hover:underline truncate leading-6">
              {name}
            </h4>
          </Link>
          <p className="text-sm text-text-gray">{position}</p>
          {verifiedAffiliation && (
            <p className="text-sm text-text-gray">{verifiedAffiliation}</p>
          )}
        </div>
      </div>

      {/* Follow Button */}
      <Button
        variant="outline"
        size="sm"
        className="border-primary text-sm! leading-5.5! text-primary shrink-0"
      >
        Follow
      </Button>
    </Card>
  );
}
