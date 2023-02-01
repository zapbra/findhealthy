/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = {
  images: {
    domains: [
      "i.imgur.com",
    ],
  },
  nextConfig,

}
