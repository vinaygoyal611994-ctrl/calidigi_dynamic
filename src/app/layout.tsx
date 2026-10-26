import type { Metadata, Viewport } from 'next'
import './globals.css'
import PublicShell from '@/components/PublicShell'


export const metadata: Metadata = {
  metadataBase: new URL('https://www.calidigi.com'),
  title: {
    default: 'California Digital Marketing Solutions | Calidigi',
    template: '%s | Calidigi',
  },
  description:
    'Calidigi delivers web development, SEO, local SEO and AI automation to help California businesses attract more customers and grow online.',
  keywords: [
    'California digital marketing agency',
    'web development company in California',
    'SEO services in California',
    'local SEO services California',
    'AI automation services for businesses',
    'small business digital marketing California',
    'content marketing services California',
    'website SEO audit for small businesses',
    'digital marketing California',
    'local SEO California',
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
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://www.calidigi.com/#organization',
      name: 'Calidigi',
      url: 'https://www.calidigi.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.calidigi.com/images/logo.png',
        width: 500,
        height: 200,
      },
      image: 'https://www.calidigi.com/images/logo.png',
      description: 'Calidigi is a California digital marketing company offering web development, SEO services, local SEO, AI automation and branding to help businesses grow online.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1234 Digital Ave, Suite 500',
        addressLocality: 'San Francisco',
        addressRegion: 'CA',
        postalCode: '94103',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 37.7749,
        longitude: -122.4194,
      },
      telephone: '+13233876255',
      email: 'sales@calidigi.com',
      priceRange: '$$',
      areaServed: [
        { '@type': 'State', name: 'California' },
        { '@type': 'City', name: 'San Francisco' },
        { '@type': 'City', name: 'Los Angeles' },
        { '@type': 'City', name: 'San Diego' },
      ],
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Digital Marketing Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Services in California' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Local SEO Services California' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development California' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Automation Services for Businesses' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Content Marketing Services California' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing Solutions California' } },
        ],
      },
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
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://www.calidigi.com/blog?q={search_term_string}' },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#0A0F1E" />
        <meta name="msapplication-TileColor" content="#0A0F1E" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PND5KWGP');` }} />
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PND5KWGP" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        <PublicShell>
          {children}
        </PublicShell>
      </body>
    </html>
  )
}
