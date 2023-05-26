/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: 'https://paperbrain.onrender.com/',
  },
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mp4$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "static/videos/",
          publicPath: "/_next/static/videos/",
        },
      },
    })

    return config
  },
}

module.exports = nextConfig
