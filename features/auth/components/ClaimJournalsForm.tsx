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
import { ClaimJournalsSearch } from "./ClaimJournalsSearch";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
  claimJournalsWithInstitution,
  type ClaimJournalsWithInstitutionRequest,
} from "../api/claimJournals";

const institutionClaimSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirm_password: z.string(),
    institution_name: z
      .string()
      .min(2, "Institution name must be at least 2 characters"),
    institution_type: z.string().optional(),
    country: z.string().optional(),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
    description: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postal_code: z.string().optional(),
    phone: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

type InstitutionClaimFormData = z.infer<typeof institutionClaimSchema>;

export function ClaimJournalsForm() {
  const router = useRouter();
  const [selectedJournals, setSelectedJournals] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<InstitutionClaimFormData>({
    resolver: zodResolver(institutionClaimSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      institution_name: "",
      institution_type: "",
      country: "",
      website: "",
      description: "",
      address: "",
      city: "",
      state: "",
      postal_code: "",
      phone: "",
    },
  });

  const handleClaim = async (data: InstitutionClaimFormData) => {
    if (selectedJournals.length === 0) {
      toast.error("Please select at least one journal to claim");
      return;
    }

    setLoading(true);
    try {
      const claimData: ClaimJournalsWithInstitutionRequest = {
        ...data,
        journal_ids: selectedJournals,
      };

      const response = await claimJournalsWithInstitution(claimData);
      toast.success(
        `Institution created successfully! Claimed ${response.journals_claimed} journal(s). Redirecting...`,
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
          toast.error(`Email: ${errors.email[0]}`);
        } else if (errors.password) {
          toast.error(`Password: ${errors.password[0]}`);
        } else if (errors.institution_name) {
          toast.error(`Institution name: ${errors.institution_name[0]}`);
        } else if (errors.journal_ids) {
          toast.error(`Journals: ${errors.journal_ids[0]}`);
        } else if (errors.message) {
          toast.error(errors.message);
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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Claim Journals & Create Institution Account</CardTitle>
        <CardDescription>
          Search for your institution's journals that were imported from
          external sources. You can claim multiple journals at once and create
          your institution account.
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

        {/* Step 2: Institution Details */}
        {selectedJournals.length > 0 && (
          <form onSubmit={form.handleSubmit(handleClaim)} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Step 2: Create Institution Account
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Provide your institution details and create an account
              </p>
            </div>

            {/* Account Credentials */}
            <div className="space-y-4">
              <h4 className="font-medium">Account Credentials</h4>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@institution.edu"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
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
            </div>

            {/* Institution Details */}
            <div className="space-y-4">
              <h4 className="font-medium">Institution Details</h4>

              <div className="space-y-2">
                <Label htmlFor="institution_name">
                  Institution Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="institution_name"
                  placeholder="University of Nepal"
                  {...form.register("institution_name")}
                />
                {form.formState.errors.institution_name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.institution_name.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institution_type">Institution Type</Label>
                  <Input
                    id="institution_type"
                    placeholder="e.g., University, College, Research Center"
                    {...form.register("institution_type")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="Nepal"
                    {...form.register("country")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://www.institution.edu.np"
                  {...form.register("website")}
                />
                {form.formState.errors.website && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.website.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description about your institution..."
                  rows={3}
                  {...form.register("description")}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="font-medium">Contact Information (Optional)</h4>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Street address"
                  {...form.register("address")}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Kathmandu"
                    {...form.register("city")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    placeholder="Bagmati"
                    {...form.register("state")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postal_code">Postal Code</Label>
                  <Input
                    id="postal_code"
                    placeholder="44600"
                    {...form.register("postal_code")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+977-1-1234567"
                  {...form.register("phone")}
                />
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                By submitting this form, you will create an institution account
                and claim ownership of the selected {selectedJournals.length}{" "}
                journal(s). You will be automatically logged in after account
                creation.
              </AlertDescription>
            </Alert>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading
                ? "Creating Account & Claiming Journals..."
                : `Create Account & Claim ${selectedJournals.length} Journal(s)`}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
