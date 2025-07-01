/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const isExport = process.env.NEXT_EXPORT === 'true'

const nextConfig = {
  output: isProd ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd && isExport ? '/react-native-boilerplate' : '',
  basePath: isProd && isExport ? '/react-native-boilerplate' : '',
}

module.exports = nextConfig 