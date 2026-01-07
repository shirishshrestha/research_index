"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className=" flex items-center justify-center mb-0 gap-2 h-12 border-gray-300"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
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
            <form className="space-y-8.75">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-black mb-2"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  className="w-full h-12"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-text-black mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder=""
                    className="w-full h-12 pr-10"
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
                  <div className="text-left mt-2">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-text-black! hover:underline"
                    >
                      Forget your password?
                    </Link>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-fit px-12.5 py-2 bg-gradient-blue text-white hover:opacity-90"
              >
                Login
              </Button>
            </form>

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
