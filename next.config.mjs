/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["your-domain.com"], // add if using external images
  },
}

export default nextConfig