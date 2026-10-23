import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.calidigi.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/about.html',          destination: '/about',          permanent: true },
      { source: '/services.html',       destination: '/services',       permanent: true },
      { source: '/solutions.html',      destination: '/solutions',      permanent: true },
      { source: '/portfolio.html',      destination: '/portfolio',      permanent: true },
      { source: '/blog.html',           destination: '/blog',           permanent: true },
      { source: '/contactus.html',      destination: '/contact-us',     permanent: true },
      { source: '/privacy_policy.html', destination: '/privacy-policy', permanent: true },
      { source: '/terms_of_service.html', destination: '/terms-of-service', permanent: true },
      { source: '/cookie_policy.html',  destination: '/cookie-policy',  permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
