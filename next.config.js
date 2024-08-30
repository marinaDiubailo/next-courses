/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const withSvgr = require('next-plugin-svgr')

const nextConfig = withSvgr({
  assetsPrefix: '/next-courses/',
  basePath: '/next-courses',
  output: 'export',

  reactStrictMode: true,
  webpack(config) {
    return config
  },
})

module.exports = nextConfig
