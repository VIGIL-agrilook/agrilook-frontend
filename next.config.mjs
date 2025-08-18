/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://agrilook-be-stream.koreacentral.cloudapp.azure.com/api/:path*',
      },
      {
        source: '/hls/:path*',
        destination: 'https://agrilook-be-stream.koreacentral.cloudapp.azure.com/hls/:path*',
      },
    ]
  },
}

export default nextConfig
