/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? '/react-native-boilerplate' : '',
  basePath: isProd ? '/react-native-boilerplate' : '',
}

module.exports = nextConfig 