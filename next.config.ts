import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v3.material-tailwind.com",
        pathname: "/**", // allow all image paths
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/**", // allow all image paths
      },
    ],
  },
};

export default nextConfig;
