"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function InstitutionSignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          <form className="space-y-6">
            <div>
              <label
                htmlFor="institutionName"
                className="block text-sm font-medium text-text-black mb-2"
              >
                Institution Name
              </label>
              <Input
                id="institutionName"
                type="text"
                placeholder=""
                className="w-full h-12"
              />
            </div>

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
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-text-black mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder=""
                  className="w-full h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-blue text-white hover:opacity-90"
            >
              Sign Up
            </Button>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
