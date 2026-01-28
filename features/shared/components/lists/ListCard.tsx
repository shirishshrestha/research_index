"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFollowToggle } from "@/features/shared/hooks";
import { BookOpen, Newspaper } from "lucide-react";

export interface AuthorCardProps {
  id: string;
  name: string;
  position: string;
  verifiedAffiliation?: string;
  imageUrl?: string;
  href?: string;
  fallbackImageUrl?: string;
  showFollowButton?: boolean;
  showBrowseButtons?: boolean;
  userId?: number; // For follow functionality
}

export function ListCard({
  id,
  name,
  position,
  verifiedAffiliation,
  imageUrl,
  href = "/",
  fallbackImageUrl = "/fallback-image.png",
  showFollowButton = true,
  showBrowseButtons = false,
  userId,
}: AuthorCardProps) {
  const router = useRouter();
  const { isFollowing, isLoading, toggle } = useFollowToggle(userId || 0);

  const handleBrowseArticles = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (userId) {
      router.push(`/articles?author=${userId}`);
    }
  };

  const handleBrowseJournals = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (userId) {
      router.push(`/journals?author=${userId}`);
    }
  };

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle();
  };

  return (
    <Card className="p-6.25 group rounded-md transition-all flex flex-row justify-between gap-4 hover:shadow-md">
      {/* Profile Image */}
      <div className="flex items-center gap-3.75 justify-between">
        <Link href={href}>
          <div className="w-16 h-16 rounded-md bg-gray-200 shrink-0 overflow-hidden">
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
                src={fallbackImageUrl}
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
          <p className="text-sm leading-5.5 text-text-gray">{position}</p>
          {verifiedAffiliation && (
            <p className="text-sm leading-5.5 text-text-gray">
              {verifiedAffiliation}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        {showBrowseButtons && userId && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm! leading-5.5! text-primary gap-1.5"
              onClick={handleBrowseArticles}
              title="Browse Articles"
            >
              <Newspaper size={16} />
              <span className="hidden sm:inline">Articles</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm! leading-5.5! text-primary gap-1.5"
              onClick={handleBrowseJournals}
              title="Browse Journals"
            >
              <BookOpen size={16} />
              <span className="hidden sm:inline">Journals</span>
            </Button>
          </>
        )}
        {showFollowButton && userId && (
          <Button
            variant={isFollowing ? "default" : "outline"}
            size="sm"
            className={
              isFollowing
                ? "text-sm! leading-5.5! text-white"
                : "border-primary text-sm! leading-5.5! text-primary"
            }
            onClick={handleFollowClick}
            disabled={isLoading}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        )}
      </div>
    </Card>
  );
}
