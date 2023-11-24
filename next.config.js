/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        VITE_SERVER: process.env.VITE_SERVER,
    }
  }

module.exports = nextConfig
