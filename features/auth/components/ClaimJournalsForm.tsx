"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ClaimJournalsSearch } from "./ClaimJournalsSearch";
import { AlertCircle, UserPlus, LogIn } from "lucide-react";
import { toast } from "sonner";
import {
  claimJournalsWithInstitution,
  claimJournalsWithLogin,
  type ClaimJournalsWithInstitutionRequest,
  type ClaimJournalsWithLoginRequest,
} from "../api/claimJournals";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "../redux/authSlice";

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

const loginClaimSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type InstitutionClaimFormData = z.infer<typeof institutionClaimSchema>;
type LoginClaimFormData = z.infer<typeof loginClaimSchema>;

export function ClaimJournalsForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [selectedJournals, setSelectedJournals] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("new");

  const newAccountForm = useForm<InstitutionClaimFormData>({
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

  const loginForm = useForm<LoginClaimFormData>({
    resolver: zodResolver(loginClaimSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleNewAccountClaim = async (data: InstitutionClaimFormData) => {
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

      // Clear query cache and set credentials in Redux
      queryClient.clear();
      dispatch(
        setCredentials({
          user: response.user,
          tokens: response.tokens,
        }),
      );

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

  const handleLoginClaim = async (data: LoginClaimFormData) => {
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

      // Clear query cache and set credentials in Redux
      queryClient.clear();
      dispatch(
        setCredentials({
          user: response.user,
          tokens: response.tokens,
        }),
      );

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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Claim Journals</CardTitle>
        <CardDescription>
          Search for your institution&apos;s journals imported from external
          sources and claim them.
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

        {/* Step 2: Choose Your Method */}
        {selectedJournals.length > 0 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Step 2: Choose How to Claim
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create a new institution account or login with existing
                credentials
              </p>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="new" className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  New Institution
                </TabsTrigger>
                <TabsTrigger value="existing" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Existing Account
                </TabsTrigger>
              </TabsList>

              {/* New Institution Tab */}
              <TabsContent value="new" className="space-y-6">
                <form
                  onSubmit={newAccountForm.handleSubmit(handleNewAccountClaim)}
                  className="space-y-6"
                >
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Create a new institution account and claim the selected
                      journals. You&apos;ll be automatically logged in after
                      registration.
                    </AlertDescription>
                  </Alert>

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
                        {...newAccountForm.register("email")}
                        disabled={loading}
                      />
                      {newAccountForm.formState.errors.email && (
                        <p className="text-sm text-red-500">
                          {newAccountForm.formState.errors.email.message}
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
                          {...newAccountForm.register("password")}
                          disabled={loading}
                        />
                        {newAccountForm.formState.errors.password && (
                          <p className="text-sm text-red-500">
                            {newAccountForm.formState.errors.password.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm_password">
                          Confirm Password{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="confirm_password"
                          type="password"
                          {...newAccountForm.register("confirm_password")}
                          disabled={loading}
                        />
                        {newAccountForm.formState.errors.confirm_password && (
                          <p className="text-sm text-red-500">
                            {
                              newAccountForm.formState.errors.confirm_password
                                .message
                            }
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
                        {...newAccountForm.register("institution_name")}
                        disabled={loading}
                      />
                      {newAccountForm.formState.errors.institution_name && (
                        <p className="text-sm text-red-500">
                          {
                            newAccountForm.formState.errors.institution_name
                              .message
                          }
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="institution_type">
                          Institution Type
                        </Label>
                        <Input
                          id="institution_type"
                          placeholder="e.g., University, College"
                          {...newAccountForm.register("institution_type")}
                          disabled={loading}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          placeholder="Nepal"
                          {...newAccountForm.register("country")}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://www.institution.edu.np"
                        {...newAccountForm.register("website")}
                        disabled={loading}
                      />
                      {newAccountForm.formState.errors.website && (
                        <p className="text-sm text-red-500">
                          {newAccountForm.formState.errors.website.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Brief description about your institution..."
                        rows={3}
                        {...newAccountForm.register("description")}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium">
                      Contact Information (Optional)
                    </h4>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="Street address"
                        {...newAccountForm.register("address")}
                        disabled={loading}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="Kathmandu"
                          {...newAccountForm.register("city")}
                          disabled={loading}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          placeholder="Bagmati"
                          {...newAccountForm.register("state")}
                          disabled={loading}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postal_code">Postal Code</Label>
                        <Input
                          id="postal_code"
                          placeholder="44600"
                          {...newAccountForm.register("postal_code")}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+977-1-1234567"
                        {...newAccountForm.register("phone")}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={loading}
                  >
                    {loading
                      ? "Creating Account & Claiming Journals..."
                      : `Create Account & Claim ${selectedJournals.length} Journal${selectedJournals.length > 1 ? "s" : ""}`}
                  </Button>
                </form>
              </TabsContent>

              {/* Existing Institution Tab */}
              <TabsContent value="existing" className="space-y-6">
                <form
                  onSubmit={loginForm.handleSubmit(handleLoginClaim)}
                  className="space-y-6"
                >
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Login with your existing institution account to claim the
                      selected journals. The journals will be added to your
                      account after successful login.
                    </AlertDescription>
                  </Alert>

                  {/* Login Credentials */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">
                        Institution Email{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="admin@institution.edu"
                        {...loginForm.register("email")}
                        disabled={loading}
                      />
                      {loginForm.formState.errors.email && (
                        <p className="text-sm text-red-500">
                          {loginForm.formState.errors.email.message}
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
                        {...loginForm.register("password")}
                        disabled={loading}
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-red-500">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                    size="lg"
                  >
                    {loading
                      ? "Claiming..."
                      : `Login & Claim ${selectedJournals.length} Journal${selectedJournals.length > 1 ? "s" : ""}`}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
