/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd-mobile'],
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  async rewrites () {
    return [
      {
        source: '/api/:path*',
        destination: 'https://flashmall-test.bljcoco.com/api/:path*'
      }
    ]
  }
}

module.exports = nextConfig
