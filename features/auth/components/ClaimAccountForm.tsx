"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ClaimAccountSearch } from "./ClaimAccountSearch";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import {
  claimAuthorAccount,
  type ImportedAuthor,
  type ClaimAuthorRequest,
} from "../api/claimAccount";

const authorClaimSchema = z
  .object({
    new_email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirm_password: z.string(),
    bio: z.string().optional(),
    research_interests: z.string().optional(),
    google_scholar: z.string().url("Invalid URL").optional().or(z.literal("")),
    researchgate: z.string().url("Invalid URL").optional().or(z.literal("")),
    linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

type AuthorClaimFormData = z.infer<typeof authorClaimSchema>;

export function ClaimAccountForm() {
  const router = useRouter();
  const [selectedProfile, setSelectedProfile] = useState<ImportedAuthor | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const form = useForm<AuthorClaimFormData>({
    resolver: zodResolver(authorClaimSchema),
    defaultValues: {
      new_email: "",
      password: "",
      confirm_password: "",
      bio: "",
      research_interests: "",
      google_scholar: "",
      researchgate: "",
      linkedin: "",
      website: "",
    },
  });

  const handleAuthorClaim = async (data: AuthorClaimFormData) => {
    if (!selectedProfile) {
      toast.error("Please select a profile first");
      return;
    }

    setLoading(true);
    try {
      const claimData: ClaimAuthorRequest = {
        author_id: selectedProfile.id,
        ...data,
      };

      await claimAuthorAccount(claimData);
      toast.success("Account claimed successfully! Redirecting...");
      setTimeout(() => {
        router.push("/author/dashboard");
      }, 1500);
    } catch (error: any) {
      console.error("Claim error:", error);
      const errorMessage =
        error.response?.data?.new_email?.[0] ||
        error.response?.data?.password?.[0] ||
        error.response?.data?.message ||
        "Failed to claim account";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Claim Your Imported Author Profile</CardTitle>
        <CardDescription>
          If your author profile was imported from an external source (like
          NepJOL, Crossref, or journal portals), you can claim it and activate
          your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ClaimAccountSearch
          onSelectProfile={(profile) => setSelectedProfile(profile)}
        />

        {selectedProfile && (
          <>
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                Profile selected: <strong>{selectedProfile.full_name}</strong>
              </AlertDescription>
            </Alert>

            <form
              onSubmit={form.handleSubmit(handleAuthorClaim)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="new_email">
                  New Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="new_email"
                  type="email"
                  placeholder="your.email@example.com"
                  {...form.register("new_email")}
                />
                {form.formState.errors.new_email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.new_email.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    {...form.register("password")}
                  />
                  {form.formState.errors.password && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm_password">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    {...form.register("confirm_password")}
                  />
                  {form.formState.errors.confirm_password && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.confirm_password.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  {...form.register("bio")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="research_interests">Research Interests</Label>
                <Textarea
                  id="research_interests"
                  placeholder="Your research areas..."
                  {...form.register("research_interests")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="google_scholar">Google Scholar URL</Label>
                  <Input
                    id="google_scholar"
                    type="url"
                    placeholder="https://scholar.google.com/..."
                    {...form.register("google_scholar")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="researchgate">ResearchGate URL</Label>
                  <Input
                    id="researchgate"
                    type="url"
                    placeholder="https://researchgate.net/..."
                    {...form.register("researchgate")}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Claiming Account..." : "Claim Account"}
              </Button>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  );
}
