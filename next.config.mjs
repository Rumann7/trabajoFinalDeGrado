/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    env: {
      MONGODB_URI: process.env.MONGODB_URI,
      NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
  };

export default nextConfig;
