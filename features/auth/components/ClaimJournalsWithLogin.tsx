"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ClaimJournalsSearch } from "./ClaimJournalsSearch";
import { AlertCircle, LogIn } from "lucide-react";
import { toast } from "sonner";
import {
  claimJournalsWithLogin,
  type ClaimJournalsWithLoginRequest,
} from "../api/claimJournals";

const loginClaimSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginClaimFormData = z.infer<typeof loginClaimSchema>;

export function ClaimJournalsWithLogin() {
  const router = useRouter();
  const [selectedJournals, setSelectedJournals] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginClaimFormData>({
    resolver: zodResolver(loginClaimSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleClaim = async (data: LoginClaimFormData) => {
    if (selectedJournals.length === 0) {
      toast.error("Please select at least one journal to claim");
      return;
    }

    setLoading(true);
    try {
      const claimData: ClaimJournalsWithLoginRequest = {
        email: data.email,
        password: data.password,
        journal_ids: selectedJournals,
      };

      const response = await claimJournalsWithLogin(claimData);
      toast.success(
        `Successfully claimed ${response.journals_claimed} journal(s)! Redirecting...`,
      );
      setTimeout(() => {
        router.push("/institution/dashboard");
      }, 1500);
    } catch (error: any) {
      console.error("Claim error:", error);

      // Handle validation errors
      if (error.response?.data) {
        const errors = error.response.data;

        // Display specific field errors
        if (errors.email) {
          toast.error(
            Array.isArray(errors.email) ? errors.email[0] : errors.email,
          );
        } else if (errors.password) {
          toast.error(
            Array.isArray(errors.password)
              ? errors.password[0]
              : errors.password,
          );
        } else if (errors.journal_ids) {
          toast.error(
            Array.isArray(errors.journal_ids)
              ? errors.journal_ids[0]
              : errors.journal_ids,
          );
        } else if (errors.message) {
          toast.error(errors.message);
        } else if (errors.detail) {
          toast.error(errors.detail);
        } else {
          toast.error("Failed to claim journals. Please check your input.");
        }
      } else {
        toast.error("Failed to claim journals. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LogIn className="h-5 w-5" />
          Login & Claim Journals
        </CardTitle>
        <CardDescription>
          Already have an institution account? Login to claim additional
          journals for your institution.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Step 1: Search and Select Journals */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Step 1: Find and Select Journals
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Search for journals that your institution manages
            </p>
          </div>
          <ClaimJournalsSearch
            selectedJournals={selectedJournals}
            onSelectJournals={setSelectedJournals}
          />
        </div>

        {/* Step 2: Login */}
        {selectedJournals.length > 0 && (
          <form onSubmit={form.handleSubmit(handleClaim)} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Step 2: Login to Your Institution Account
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enter your institution account credentials
              </p>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                The selected journals will be added to your existing institution
                account after you login.
              </AlertDescription>
            </Alert>

            {/* Login Credentials */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">
                  Institution Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="admin@institution.edu"
                  {...form.register("email")}
                  disabled={loading}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  {...form.register("password")}
                  disabled={loading}
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
                size="lg"
              >
                {loading
                  ? "Claiming..."
                  : `Login & Claim ${selectedJournals.length} Journal${selectedJournals.length > 1 ? "s" : ""}`}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
