/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

const path = require('path')

module.exports = {
  images: {
    domains: ['images.unsplash.com', 'images.prismic.io'],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src')
    return config
  },
  plugins: [require('@tailwindcss/typography')],
}
