'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blogs' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact-us', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">
            <Image
              src="/images/logo.png"
              alt="Calidigi — California Digital Growth"
              width={160}
              height={82}
              priority
              className="nav-logo-img"
            />
          </Link>

          <nav className="nav-links" role="navigation" aria-label="Main navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={pathname === href ? 'active' : ''}
              >
                {label}
              </Link>
            ))}
          </nav>

          <Link href="/contact-us" className="btn btn-primary nav-cta">
            Let&apos;s Grow Your Business <i className="fas fa-arrow-right"></i>
          </Link>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            id="hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="mob-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link href="/contact-us" className="mob-nav-cta" onClick={() => setMenuOpen(false)}>
          Let&apos;s Grow Your Business →
        </Link>
      </div>
    </>
  )
}
