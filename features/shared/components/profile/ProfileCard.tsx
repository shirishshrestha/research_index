"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { ProfileCardProps } from "./types";

export function ProfileCard({
  avatarUrl,
  name,
  position,
  affiliation,
  verifiedEmail,
  isInstitution = false,
  isFollowing = false,
  onFollow,
}: ProfileCardProps) {
  const [following, setFollowing] = useState(isFollowing);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    try {
      await onFollow?.();
      setFollowing(!following);
    } catch (error) {
      console.error("Failed to follow/unfollow", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-0! border-0 bg-background shadow-none">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <div className=" rounded-md w-32.25 h-32.25 ">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              width={112}
              height={112}
              className="object-cover w-full h-full"
              priority
            />
          ) : (
            <Image
              src={isInstitution ? "/fallback-logo.png" : "/fallback-image.png"}
              alt={name}
              width={112}
              height={112}
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="heading-4 text-text-black mb-1.25 wrap-break-word">
            {name}
          </h4>
          <p className="para">
            {position}, {affiliation}
          </p>

          {verifiedEmail && (
            <p className="para">Verified email at {verifiedEmail}</p>
          )}
          <Button
            size="sm"
            variant={"outline"}
            onClick={handleFollow}
            disabled={loading}
            className=" border-primary mt-2.75 text-sm px-4 py-1 text-primary"
          >
            {loading ? "..." : following ? "Following" : "Follow"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
