import Link from 'next/link'
import Image from 'next/image'

const companyLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blogs' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact-us', label: 'Contact' },
]

const serviceLinks = [
  'Web Design',
  'Digital Marketing',
  'Local SEO',
  'AI Solutions',
  'Branding',
  'Lead Generation',
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          <div className="footer-brand">
            <Image
              src="/images/logo.png"
              alt="Calidigi"
              width={160}
              height={60}
              loading="lazy"
              style={{ height: 'auto', width: '160px' }}
            />
            <div className="footer-tagline">
              Digital Marketing • Web Design • Local SEO • AI Solutions • Branding
            </div>
            <p>
              California&apos;s digital growth company — helping businesses build a stronger online
              presence, attract more customers and grow with the right digital strategy and AI solutions.
            </p>
            <div className="footer-social">
              <a href="#" className="f-soc" aria-label="Facebook" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="f-soc" aria-label="Instagram" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="f-soc" aria-label="LinkedIn" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="f-soc" aria-label="X/Twitter" rel="noopener noreferrer">
                <i className="fab fa-x-twitter"></i>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <i className="fas fa-chevron-right"></i>{label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link href="/services">
                    <i className="fas fa-chevron-right"></i>{service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Get In Touch</h4>
            <div className="footer-contact-row">
              <div className="fci"><i className="fas fa-location-dot"></i></div>
              <span className="fci-text">
                1234 Digital Ave, Suite 500<br />San Francisco, CA 94103
              </span>
            </div>
            <div className="footer-contact-row">
              <div className="fci"><i className="fas fa-envelope"></i></div>
              <span className="fci-text">
                <a href="mailto:sales@calidigi.com">sales@calidigi.com</a>
              </span>
            </div>
            <div className="footer-contact-row">
              <div className="fci"><i className="fas fa-phone"></i></div>
              <span className="fci-text">
                <a href="tel:+15550001234">+1 (555) 000-1234</a>
              </span>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <p>
              &copy; {new Date().getFullYear()} Calidigi. All rights reserved. Built with{' '}
              <span style={{ color: 'var(--orange)' }}>♥</span> in California.
            </p>
            <div className="footer-legal">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-of-service">Terms of Service</Link>
              <Link href="/cookie-policy">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
