/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/admin",
        destination:
          "https://ribbon-month-841.notion.site/Admin-3371286404948050a2cecf82e5c554ad",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;


