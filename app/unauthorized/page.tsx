"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export default function UnauthorizedPage() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-red-50 to-orange-50 px-4">
      <div className="max-w-2xl text-center">
        {/* 403 Illustration */}
        <div className="mb-8">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-12 w-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-6xl font-bold text-slate-900">403</h1>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-linear-to-r from-red-500 to-orange-500" />
        </div>

        {/* Error Message */}
        <h2 className="mb-4 text-3xl font-bold text-slate-900">
          Access Denied
        </h2>
        <p className="mb-8 text-lg text-slate-600">
          You don&apos;t have permission to access this page. This area is
          restricted to specific user roles.
        </p>

        {/* User Info (if authenticated) */}
        {isAuthenticated && user && (
          <div className="mb-8 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="mb-2 text-sm font-medium text-slate-500">
              You are currently logged in as:
            </p>
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold text-slate-900">{user.email}</p>
              <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                Role: {user.user_type}
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              This page requires a different role to access.
            </p>
          </div>
        )}

        {/* Not authenticated message */}
        {!isAuthenticated && (
          <div className="mb-8 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-slate-600">
              You need to be logged in with the appropriate role to access this
              page.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go to Homepage
          </Link>

          {!isAuthenticated && (
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Login
            </Link>
          )}

          {isAuthenticated && (
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </button>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-12">
          <p className="text-sm text-slate-500">
            If you believe this is an error, please contact support or try
            logging in with a different account.
          </p>
        </div>
      </div>
    </div>
  );
}
