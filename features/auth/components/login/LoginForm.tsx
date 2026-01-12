"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/form";
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/features/auth";
import { loginSchema, type LoginFormData } from "@/features/auth/schemas";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLoginMutation();

  function onSubmit(values: LoginFormData) {
    loginMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8.75">
        <FormInputField
          control={form.control}
          name="email"
          type="email"
          label="Email"
          placeholder="you@domain.com"
          form_classname=""
        />

        <FormInputField
          control={form.control}
          name="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Enter your password"
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
          <div className="text-left mt-2">
            <Link
              href="/forgot-password"
              className="text-sm text-text-black! hover:underline"
            >
              Forget your password?
            </Link>
          </div>
        </FormInputField>

        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-fit text-lg h-auto font-normal leading-6 px-12.5 py-2 bg-gradient-blue text-white hover:opacity-90 disabled:opacity-50"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
