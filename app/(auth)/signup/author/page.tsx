"use client";

import Image from "next/image";
import { AuthorSignupForm } from "@/features/auth/components";

export default function AuthorSignupPage() {
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
            <h1 className="heading-2 text-text-black! ">Sign Up as a Author</h1>
          </div>

          {/* Sign Up Form */}
          <AuthorSignupForm />
        </div>
      </div>
    </div>
  );
}
