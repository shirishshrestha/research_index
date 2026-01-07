"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Upload } from "lucide-react";

export default function AuthorSignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
          <form className="space-y-5">
            {/* Title and Profile Picture */}
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-text-black mb-2"
                >
                  Title
                </label>
                <Input
                  id="title"
                  type="text"
                  placeholder=""
                  className="w-full h-12"
                />
              </div>
              <div className="flex flex-col items-center">
                <label className="block text-sm font-medium text-text-black mb-2 invisible">
                  Photo
                </label>
                <label
                  htmlFor="profile-upload"
                  className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors overflow-hidden"
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="w-6 h-6 text-gray-500" />
                  )}
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-text-black mb-2"
              >
                Full Name
              </label>
              <Input
                id="fullName"
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
                htmlFor="institute"
                className="block text-sm font-medium text-text-black mb-2"
              >
                Institute
              </label>
              <Input
                id="institute"
                type="text"
                placeholder=""
                className="w-full h-12"
              />
            </div>

            <div>
              <label
                htmlFor="designation"
                className="block text-sm font-medium text-text-black mb-2"
              >
                Designation
              </label>
              <Input
                id="designation"
                type="text"
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
