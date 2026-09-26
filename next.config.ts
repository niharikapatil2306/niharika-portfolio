import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Blog cover images live in Supabase Storage.
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
  experimental: {
    // Room for a 4 MB cover image upload through the admin form.
    serverActions: { bodySizeLimit: "5mb" },
  },
};

export default nextConfig;
