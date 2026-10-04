import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found | Calidigi',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <main className="nf-wrap">
      <div className="nf-bg-orb nf-orb1" />
      <div className="nf-bg-orb nf-orb2" />

      <div className="nf-container">
        <div className="nf-badge">404 Error</div>

        <div className="nf-code-wrap">
          <span className="nf-four">4</span>
          <div className="nf-zero">
            <div className="nf-zero-inner">
              <i className="fas fa-magnifying-glass" />
            </div>
          </div>
          <span className="nf-four">4</span>
        </div>

        <h1 className="nf-heading">Page Not Found</h1>
        <p className="nf-sub">
          Oops! The page you&apos;re looking for has moved, been deleted, or never existed.
          Let&apos;s get you back on track.
        </p>

        <div className="nf-actions">
          <Link href="/" className="nf-btn-primary">
            <i className="fas fa-house" /> Back to Home
          </Link>
          <Link href="/contact-us" className="nf-btn-secondary">
            <i className="fas fa-envelope" /> Contact Us
          </Link>
        </div>

        <div className="nf-links">
          <p className="nf-links-label">Popular pages</p>
          <div className="nf-links-grid">
            <Link href="/services" className="nf-link-card">
              <i className="fas fa-rocket" />
              <span>Services</span>
            </Link>
            <Link href="/about" className="nf-link-card">
              <i className="fas fa-users" />
              <span>About Us</span>
            </Link>
            <Link href="/blog" className="nf-link-card">
              <i className="fas fa-newspaper" />
              <span>Blog</span>
            </Link>
            <Link href="/contact-us" className="nf-link-card">
              <i className="fas fa-phone" />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .nf-wrap {
          min-height: 100vh;
          background: var(--navy);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 60px 24px;
        }
        .nf-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .nf-orb1 {
          width: 500px; height: 500px;
          background: rgba(245,130,31,0.12);
          top: -100px; left: -100px;
        }
        .nf-orb2 {
          width: 400px; height: 400px;
          background: rgba(37,99,235,0.10);
          bottom: -80px; right: -80px;
        }
        .nf-container {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 680px;
          width: 100%;
        }
        .nf-badge {
          display: inline-block;
          background: rgba(245,130,31,0.15);
          border: 1px solid rgba(245,130,31,0.3);
          color: var(--orange);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 999px;
          margin-bottom: 40px;
          font-family: var(--font-body);
        }
        .nf-code-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 40px;
        }
        .nf-four {
          font-family: var(--font-head);
          font-size: clamp(100px, 18vw, 160px);
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(135deg, #fff 40%, rgba(255,255,255,0.3));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nf-zero {
          width: clamp(90px, 16vw, 140px);
          height: clamp(90px, 16vw, 140px);
          border-radius: 50%;
          border: 4px solid rgba(245,130,31,0.4);
          background: rgba(245,130,31,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: nf-pulse 3s ease-in-out infinite;
        }
        .nf-zero-inner {
          width: 70%;
          height: 70%;
          border-radius: 50%;
          background: rgba(245,130,31,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(28px, 5vw, 44px);
          color: var(--orange);
        }
        @keyframes nf-pulse {
          0%, 100% { transform: scale(1); border-color: rgba(245,130,31,0.4); }
          50%       { transform: scale(1.06); border-color: rgba(245,130,31,0.7); }
        }
        .nf-heading {
          font-family: var(--font-head);
          font-size: clamp(26px, 5vw, 38px);
          font-weight: 800;
          color: #fff;
          margin-bottom: 16px;
        }
        .nf-sub {
          font-family: var(--font-body);
          font-size: 16px;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto 40px;
        }
        .nf-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 56px;
        }
        .nf-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--orange);
          color: #fff;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          padding: 13px 28px;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.25s, transform 0.2s;
        }
        .nf-btn-primary:hover {
          background: var(--orange-dark);
          transform: translateY(-2px);
        }
        .nf-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.85);
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          padding: 13px 28px;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.25s, border-color 0.25s, transform 0.2s;
        }
        .nf-btn-secondary:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.3);
          transform: translateY(-2px);
        }
        .nf-links {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 40px;
        }
        .nf-links-label {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 20px;
        }
        .nf-links-grid {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .nf-link-card {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.25s;
        }
        .nf-link-card:hover {
          background: rgba(245,130,31,0.1);
          border-color: rgba(245,130,31,0.3);
          color: var(--orange);
          transform: translateY(-2px);
        }
        .nf-link-card i {
          font-size: 13px;
        }
      `}</style>
    </main>
  )
}
