/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — no server runtime, deployable as plain files to Vercel.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
