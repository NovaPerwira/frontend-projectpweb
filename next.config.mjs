/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },
  // Allow images from external domains
  images: {
    domains: ['project-revisi.test'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'project-revisi.test',
        port: '8080',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
}

export default nextConfig
