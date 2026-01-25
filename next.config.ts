import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
    ],
    dangerouslyAllowSVG: true,
    // Allow localhost/private IPs for development
    unoptimized: process.env.NODE_ENV === "development",
  },
  // Explicitly allow localhost in development
};

export default nextConfig;
