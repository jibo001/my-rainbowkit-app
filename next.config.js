/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd-mobile'],
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  i18n,
  async rewrites () {
    return [
      {
        source: '/api/:path*',
        destination: 'http://103.229.124.117:8848/api/:path*'
      }
    ]
  }
}

module.exports = nextConfig
