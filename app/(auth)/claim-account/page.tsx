import { Metadata } from "next";
import Link from "next/link";
import { ClaimAccountForm } from "@/features/auth/components/ClaimAccountForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Claim Your Author Account | Research Index",
  description: "Claim your imported author profile and activate your account",
};

export default function ClaimAccountPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/login">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Button>
        </Link>
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Claim Your Author Profile</h1>
        <p className="text-muted-foreground">
          If your author profile was imported from NEPJOL, journal portals,
          Crossref, or other sources, claim it to activate your account and gain
          full access
        </p>
      </div>

      <ClaimAccountForm />

      <div className="mt-8 text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Institution looking to claim journals?{" "}
          <Link
            href="/claim-journals"
            className="text-primary hover:underline font-medium"
          >
            Claim Journals Here
          </Link>
        </p>
        <p className="text-sm text-muted-foreground">
          Don't have an imported profile?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Create a new account instead
          </Link>
        </p>
        <p className="text-xs text-muted-foreground">
          Having trouble finding your profile?{" "}
          <Link
            href="/claim-account/debug"
            className="text-blue-600 hover:underline"
          >
            Run diagnostics
          </Link>
        </p>
      </div>
    </div>
  );
}
