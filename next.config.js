/** @type {import('next').NextConfig} */
const securityHeaders = [{
  key: 'Referrer-Policy',
  value: 'no-referrer',
}, {
  key: 'Access-Control-Allow-Origin',
  value: '*'
}, {
  key: 'Access-Control-Allow-Methods',
  value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
}, {
  key: 'Access-Control-Allow-Headers',
  value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
}, {
  key: 'Access-Control-Allow-Credentials',
  value: 'true'
}
];

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['https://lh3.googleusercontent.com'],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig
