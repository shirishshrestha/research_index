"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/form";
import { Eye, EyeOff } from "lucide-react";

const institutionSignupSchema = z
  .object({
    institutionName: z
      .string()
      .min(2, { message: "Institution name is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function InstitutionSignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof institutionSignupSchema>>({
    resolver: zodResolver(institutionSignupSchema),
    defaultValues: {
      institutionName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof institutionSignupSchema>) {
    console.log(values);
    // Handle signup logic here
  }

  return (
    <div className="max-h-screen flex">
      {/* Left Section - Decorative Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-blue relative lg:items-center overflow-hidden">
        <Image
          src="/auth.svg"
          alt="Research Index"
          width={350}
          height={400}
          className="object-contain object-top! lg:top-0 lg:left-20.5 relative"
        />
      </div>

      {/* Right Section - Sign Up Form */}
      <div className="w-full lg:w-1/2 h-screen p-19 bg-white overflow-y-auto">
        <div className="w-full space-y-8">
          <div>
            <h1 className="heading-2 text-text-black! ">
              Sign Up for Institution
            </h1>
          </div>

          {/* Sign Up Form */}
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
                  className="absolute right-3 top-9.5 text-gray-500 hover:text-gray-700"
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
                  className="absolute right-3 top-9.5 text-gray-500 hover:text-gray-700"
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
                  className="w-fit px-12.5 py-2 bg-gradient-blue text-white hover:opacity-90"
                >
                  Sign Up
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
        </div>
      </div>
    </div>
  );
}
