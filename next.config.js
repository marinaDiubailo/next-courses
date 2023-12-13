/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const withSvgr = require('next-plugin-svgr');

const nextConfig = withSvgr({
    images: {
        domains: ['courses-top.ru'],
    },
    reactStrictMode: true,
    webpack(config) {
        return config;
    },
});

module.exports = nextConfig;
