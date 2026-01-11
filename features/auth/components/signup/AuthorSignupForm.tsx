"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputField, FormSelectField } from "@/components/form";
import { Eye, EyeOff } from "lucide-react";
import { useRegisterAuthorMutation } from "@/features/auth";
import {
  authorSignupSchema,
  titleOptions,
  type AuthorSignupFormData,
} from "@/features/auth/schemas";

export function AuthorSignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<AuthorSignupFormData>({
    resolver: zodResolver(authorSignupSchema),
    defaultValues: {
      title: "",
      fullName: "",
      email: "",
      institute: "",
      designation: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useRegisterAuthorMutation(form);

  function onSubmit(values: AuthorSignupFormData) {
    registerMutation.mutate({
      email: values.email,
      password: values.password,
      confirm_password: values.confirmPassword,
      title: values.title,
      full_name: values.fullName,
      institute: values.institute,
      designation: values.designation,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8.75">
        <FormSelectField
          control={form.control}
          name="title"
          label="Title"
          placeholder="Select a title"
          options={titleOptions}
        />

        <FormInputField
          control={form.control}
          name="fullName"
          label="Full Name"
          placeholder="e.g. Jane Doe"
        />

        <FormInputField
          control={form.control}
          name="email"
          type="email"
          label="Email"
          placeholder="you@institution.edu"
        />

        <FormInputField
          control={form.control}
          name="institute"
          label="Institute"
          placeholder="Your institute or affiliation"
        />

        <FormInputField
          control={form.control}
          name="designation"
          label="Designation"
          placeholder="e.g. Assistant Professor"
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
