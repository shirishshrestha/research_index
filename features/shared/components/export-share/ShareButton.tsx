"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronDown,
  Link2,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  entityId: number;
  entityType: "journal" | "author" | "institution" | "publication";
  entityTitle: string;
  className?: string;
}

interface ShareData {
  url: string;
  title: string;
  description: string;
  social_share_urls: {
    twitter: string;
    facebook: string;
    linkedin: string;
    whatsapp: string;
    email: string;
  };
}

export const ShareButton = ({
  entityId,
  entityType,
  entityTitle,
  className = "",
}: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shareData, setShareData] = useState<ShareData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const getEndpointPath = () => {
    switch (entityType) {
      case "journal":
        return `/api/publications/journals/public/${entityId}/share/`;
      case "author":
        return `/api/publications/authors/public/${entityId}/share/`;
      case "institution":
        return `/api/publications/institutions/public/${entityId}/share/`;
      case "publication":
        return `/api/publications/public/${entityId}/share/`;
      default:
        return "";
    }
  };

  const fetchShareData = async () => {
    if (shareData) return; // Already fetched

    setIsLoading(true);
    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
      const response = await fetch(`${backendUrl}${getEndpointPath()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch share data");
      }

      const data = await response.json();
      setShareData(data);
    } catch (error) {
      console.error("Share data fetch error:", error);
      toast.error("Failed to load share options");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = async () => {
    const url = shareData?.url || window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy error:", error);
      toast.error("Failed to copy link");
    }
  };

  const handleSocialShare = (
    platform: keyof ShareData["social_share_urls"],
  ) => {
    if (!shareData) return;

    const url = shareData.social_share_urls[platform];
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
    fetchShareData();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`flex items-center gap-1.5 heading-para hover:text-primary transition-colors ${className}`}
          >
            Share <ChevronDown className="stroke-[1.6px]" size={18} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem
            onClick={handleOpenDialog}
            className="cursor-pointer"
          >
            <Link2 className="mr-2 h-4 w-4" />
            More Share Options
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              fetchShareData().then(() => handleSocialShare("twitter"));
            }}
            className="cursor-pointer"
          >
            <Twitter className="mr-2 h-4 w-4" />
            Share on Twitter
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              fetchShareData().then(() => handleSocialShare("facebook"));
            }}
            className="cursor-pointer"
          >
            <Facebook className="mr-2 h-4 w-4" />
            Share on Facebook
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              fetchShareData().then(() => handleSocialShare("linkedin"));
            }}
            className="cursor-pointer"
          >
            <Linkedin className="mr-2 h-4 w-4" />
            Share on LinkedIn
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Share {entityType.charAt(0).toUpperCase() + entityType.slice(1)}
            </DialogTitle>
            <DialogDescription>
              Share {entityTitle} with others
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Copy Link Section */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Copy Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareData?.url || window.location.href}
                  className="flex-1 px-3 py-2 border rounded-md bg-background text-sm"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Link2 className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Share Section */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Share via Social Media
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSocialShare("twitter")}
                  disabled={isLoading || !shareData}
                  className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </button>
                <button
                  onClick={() => handleSocialShare("facebook")}
                  disabled={isLoading || !shareData}
                  className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </button>
                <button
                  onClick={() => handleSocialShare("linkedin")}
                  disabled={isLoading || !shareData}
                  className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </button>
                <button
                  onClick={() => handleSocialShare("whatsapp")}
                  disabled={isLoading || !shareData}
                  className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Email Share */}
            <div>
              <button
                onClick={() => handleSocialShare("email")}
                disabled={isLoading || !shareData}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
              >
                <Mail className="h-4 w-4" />
                Share via Email
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
