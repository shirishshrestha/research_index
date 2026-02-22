"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared";
import { LoginForm } from "@/features/auth/components";

export default function LoginPage() {
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
      <div className="w-full lg:w-1/2 h-screen p-8 md:p-12 lg:p-15 xl:p-19 bg-white overflow-y-auto">
        <div className="w-full space-y-12.5">
          <div>
            <h1 className="heading-2 text-text-black! ">Login</h1>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 grid grid-cols-2 gap-6.25">
            <Button
              variant="outline"
              className=" flex items-center justify-center gap-2 mb-0 h-12 hover:bg-transparent! hover:text-primary!"
            >
              <Icon name="google" size={24} />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className=" flex items-center justify-center mb-0 gap-2 h-12 hover:bg-transparent! hover:text-primary!"
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
            <LoginForm />

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

            {/* Claim Imported Account */}
            <div className=" space-y-1.25 pt-2 border-t">
              <p className="text-sm text-gray-600">
                Found your profile in our database?
              </p>
              <div className="flex flex-col gap-1">
                <Link
                  href="/claim-account"
                  className="text-primary text-sm hover:underline font-medium"
                >
                  Claim Your Author Profile
                </Link>
                <Link
                  href="/claim-journals"
                  className="text-primary text-sm hover:underline font-medium"
                >
                  Claim Your Institution&apos;s Journals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
