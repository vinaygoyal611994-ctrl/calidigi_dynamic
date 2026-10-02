import type { Metadata, Viewport } from 'next'
import { Manrope, Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import PublicShell from '@/components/PublicShell'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.calidigi.com'),
  title: {
    default: 'Calidigi — Digital Marketing, Web Design & AI Solutions | California',
    template: '%s | Calidigi',
  },
  description:
    'Calidigi is a California digital growth company offering web design, digital marketing, local SEO, AI solutions and branding to help businesses attract customers and grow.',
  keywords: [
    'digital marketing California',
    'web design San Francisco',
    'local SEO California',
    'AI solutions',
    'branding',
    'lead generation',
    'Calidigi',
  ],
  authors: [{ name: 'Calidigi' }],
  creator: 'Calidigi',
  publisher: 'Calidigi',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.calidigi.com',
    siteName: 'Calidigi',
    title: 'Calidigi — Digital Marketing, Web Design & AI Solutions | California',
    description: 'Calidigi is a California digital growth company offering web design, digital marketing, local SEO, AI solutions and branding to help businesses attract customers and grow.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Calidigi — California Digital Growth & Technology Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@calidigi',
    creator: '@calidigi',
    title: 'Calidigi — Digital Marketing, Web Design & AI Solutions | California',
    description: 'Calidigi is a California digital growth company offering web design, digital marketing, local SEO, AI solutions and branding to help businesses attract customers and grow.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.calidigi.com',
    languages: {
      'en-US': 'https://www.calidigi.com',
      'x-default': 'https://www.calidigi.com',
    },
  },
  other: {
    'geo.region': 'US-CA',
    'geo.placename': 'San Francisco, California',
    'geo.position': '37.7749;-122.4194',
    ICBM: '37.7749, -122.4194',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0F1E',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.calidigi.com/#organization',
      name: 'Calidigi',
      url: 'https://www.calidigi.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.calidigi.com/images/logo.png',
        width: 500,
        height: 200,
      },
      description:
        'California digital growth company offering web design, digital marketing, local SEO, AI solutions and branding.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1234 Digital Ave, Suite 500',
        addressLocality: 'San Francisco',
        addressRegion: 'CA',
        postalCode: '94103',
        addressCountry: 'US',
      },
      telephone: '+15550001234',
      email: 'hello@calidigi.com',
      sameAs: [
        'https://www.facebook.com/calidigi',
        'https://www.instagram.com/calidigi',
        'https://www.linkedin.com/company/calidigi',
        'https://twitter.com/calidigi',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.calidigi.com/#website',
      url: 'https://www.calidigi.com',
      name: 'Calidigi',
      publisher: { '@id': 'https://www.calidigi.com/#organization' },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${plusJakarta.variable} ${inter.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#0A0F1E" />
        <meta name="msapplication-TileColor" content="#0A0F1E" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <PublicShell>
          {children}
        </PublicShell>
      </body>
    </html>
  )
}
