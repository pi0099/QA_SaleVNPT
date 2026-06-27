/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "**.blob.vercel-storage.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/sitemap/:id.xml",
        destination: "/sitemap/:id",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
