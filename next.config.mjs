/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/contact/contact",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact/contact/:path*",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
}

export default nextConfig
