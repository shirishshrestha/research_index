import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Institution Signup - Resource Index",
  description: "Create an institution account",
};

export default function InstitutionSignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="heading-2 text-center mb-8" style={{ color: "#023B8B" }}>
          Institution Registration
        </h1>
        <form className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#131313" }}
            >
              Institution Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023B8B]"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#131313" }}
            >
              Institution Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023B8B]"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#131313" }}
            >
              Country
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023B8B]"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#131313" }}
            >
              Contact Person
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023B8B]"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#131313" }}
            >
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023B8B]"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#131313" }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#023B8B]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#023B8B] text-white py-3 rounded-lg hover:bg-[#012558] transition-colors"
          >
            Create Account
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-[#023B8B] hover:underline"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
