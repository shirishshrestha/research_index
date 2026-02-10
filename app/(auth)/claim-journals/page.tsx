import type { Metadata } from "next";
import { ClaimJournalsForm } from "@/features/auth/components/ClaimJournalsForm";

export const metadata: Metadata = {
  title: "Claim Journals | Research Index",
  description:
    "Claim your institution's imported journals and create an account",
};

export default function ClaimJournalsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Claim Your Journals</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            If your institution's journals were imported from NEPJOL, journal
            portals, or other sources, claim them to activate your institution
            account and gain full access to manage your publications.
          </p>
        </div>

        <ClaimJournalsForm />

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Login here
            </a>
          </p>
          <p className="mt-2">
            Author looking for their imported profile?{" "}
            <a
              href="/claim-account"
              className="text-primary hover:underline font-medium"
            >
              Claim Author Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
