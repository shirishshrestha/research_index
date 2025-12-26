import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login - Resource Index",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="heading-2 text-center mb-8" style={{ color: "#023B8B" }}>
          Login
        </h1>
        <form className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#131313" }}
            >
              Email
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
              Password
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
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/signup/author"
              className="text-sm text-[#023B8B] hover:underline"
            >
              Sign up as Author
            </Link>
            <Link
              href="/signup/institution"
              className="text-sm text-[#023B8B] hover:underline"
            >
              Sign up as Institution
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
