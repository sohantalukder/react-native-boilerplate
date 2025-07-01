/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const isGitHubPages = process.env.GITHUB_PAGES === 'true'

// Only use GitHub Pages configuration in production AND when explicitly building for GitHub Pages
const useGitHubPages = isProd && isGitHubPages

const nextConfig = {
  output: isProd ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Only apply GitHub Pages paths when building for GitHub Pages
  ...(useGitHubPages && {
    assetPrefix: '/react-native-boilerplate',
    basePath: '/react-native-boilerplate',
  }),
}

module.exports = nextConfig 