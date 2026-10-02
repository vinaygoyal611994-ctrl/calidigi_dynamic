import type { Metadata } from 'next'
import ContactUsClient from './ContactUsClient'

export const metadata: Metadata = {
  title: 'Contact Us — Start Your Project | Calidigi California',
  description:
    "Get in touch with Calidigi — California's premier AI, software, and digital transformation company. Tell us about your project and receive a custom proposal within 48 hours.",
  alternates: {
    canonical: 'https://www.calidigi.com/contact-us',
    languages: {
      'en-US': 'https://www.calidigi.com/contact-us',
      'x-default': 'https://www.calidigi.com/contact-us',
    },
  },
  openGraph: {
    url: 'https://www.calidigi.com/contact-us',
    title: 'Contact Us — Start Your Project | Calidigi California',
    description: "Tell us about your project. We'll respond within 8 hours with a roadmap built for your industry and goals.",
  },
  twitter: {
    title: 'Contact Us — Start Your Project | Calidigi California',
    description: "Tell us about your project. We'll respond within 8 hours with a roadmap built for your industry and goals.",
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': 'https://www.calidigi.com/contact-us#webpage',
      url: 'https://www.calidigi.com/contact-us',
      name: 'Contact Us — Start Your Project | Calidigi California',
      description: 'Get in touch with Calidigi. Tell us about your project and receive a custom proposal within 48 hours.',
      isPartOf: { '@id': 'https://www.calidigi.com/#website' },
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.calidigi.com/' }, { '@type': 'ListItem', position: 2, name: 'Contact Us', item: 'https://www.calidigi.com/contact-us' }] },
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.calidigi.com/#organization',
      name: 'Calidigi',
      url: 'https://www.calidigi.com',
      email: 'hello@calidigi.com',
      telephone: '+15550001234',
      logo: 'https://www.calidigi.com/Cali%20Digi%20Logo%201.png',
      address: { '@type': 'PostalAddress', streetAddress: '1234 Digital Ave, Suite 500', addressLocality: 'San Francisco', addressRegion: 'CA', postalCode: '94103', addressCountry: 'US' },
      contactPoint: { '@type': 'ContactPoint', contactType: 'Customer Support', email: 'hello@calidigi.com', telephone: '+15550001234', availableLanguage: 'English', contactOption: 'TollFree' },
    },
  ],
}

export default function ContactUsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactUsClient />
    </>
  )
}
