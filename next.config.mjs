/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "cookie",
            key: "jwt",
          },
        ],
        permanent: false,
        destination: "/orders",
      },
      {
        source: "/",
        missing: [
          {
            type: "cookie",
            key: "jwt",
          },
        ],
        permanent: false,
        destination: "/login",
      },
    ];
  },
};

export default nextConfig;
