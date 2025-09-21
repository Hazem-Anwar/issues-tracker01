/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "referrer-policy", value: "no-referrer" }],
      },
    ];
  },

  images: {
    domains: [
      "lh3.googleusercontent.com", // صور Google profile
      "avatars.githubusercontent.com", // صور GitHub profile
    ],
  },
};

module.exports = nextConfig;
