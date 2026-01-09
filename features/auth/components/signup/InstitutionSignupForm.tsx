"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/form";
import { Eye, EyeOff } from "lucide-react";
import { useRegisterInstitutionMutation } from "@/features/auth";
import {
  institutionSignupSchema,
  type InstitutionSignupFormData,
} from "@/features/auth/schemas";

export function InstitutionSignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<InstitutionSignupFormData>({
    resolver: zodResolver(institutionSignupSchema),
    defaultValues: {
      institutionName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useRegisterInstitutionMutation(form);

  function onSubmit(values: InstitutionSignupFormData) {
    registerMutation.mutate({
      email: values.email,
      password: values.password,
      confirm_password: values.confirmPassword,
      institution_name: values.institutionName,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormInputField
          control={form.control}
          name="institutionName"
          label="Institution Name"
          placeholder="e.g. University of Example"
        />

        <FormInputField
          control={form.control}
          name="email"
          type="email"
          label="Email"
          placeholder="contact@institution.edu"
        />

        <FormInputField
          control={form.control}
          name="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Create a password"
          className="pr-10"
          form_classname="relative"
        >
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.75 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </FormInputField>

        <FormInputField
          control={form.control}
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          label="Confirm Password"
          placeholder="Confirm your password"
          className="pr-10"
          form_classname="relative"
        >
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3.75 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </FormInputField>

        <div>
          <Button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-fit text-lg h-auto font-normal leading-6 px-12.5 py-2 bg-gradient-blue text-white hover:opacity-90 disabled:opacity-50"
          >
            {registerMutation.isPending ? "Signing up..." : "Sign Up"}
          </Button>
          <div className="mt-3.75">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
}
