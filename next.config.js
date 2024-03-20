/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.gr-assets.com", "s.gr-assets.com", "images.unsplash.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/books",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
