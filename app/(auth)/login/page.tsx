"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { Icon } from "@/components/shared";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    // Handle login logic here
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

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 h-screen p-19 bg-white overflow-y-auto">
        <div className="w-full space-y-12.5">
          <div>
            <h1 className="heading-2 text-text-black! ">Login</h1>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 grid grid-cols-2 gap-6.25">
            <Button
              variant="outline"
              className=" flex items-center justify-center gap-2 mb-0 h-12 border-gray-300"
            >
              <Icon name="google" size={24} />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className=" flex items-center justify-center mb-0 gap-2 h-12 border-gray-300"
            >
              <Icon name="apple" size={23} />
              Continue with Apple
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <div className="space-y-3.75">
            {/* Login Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8.75"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-text-black">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@domain.com"
                          className="w-full h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-text-black">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full h-12 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <div className="text-left mt-2">
                        <Link
                          href="/forgot-password"
                          className="text-sm text-text-black! hover:underline"
                        >
                          Forget your password?
                        </Link>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-fit px-12.5 py-2 bg-gradient-blue text-white hover:opacity-90"
                >
                  Login
                </Button>
              </form>
            </Form>

            {/* Sign Up Links */}
            <div className=" space-y-1.25">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account? Sign Up
              </p>
              <div className="flex flex-col sub-body gap-1.25 justify-center">
                <Link
                  href="/signup/author"
                  className="text-primary text-sm hover:underline font-medium"
                >
                  Sign Up for Authors
                </Link>
                <Link
                  href="/signup/institution"
                  className="text-primary text-sm hover:underline font-medium"
                >
                  Sign Up for Institutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
