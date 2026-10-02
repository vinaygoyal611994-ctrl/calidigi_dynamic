'use client'
import { useState } from 'react'

const faqs = [
  { q: 'What services does Calidigi provide?', a: 'Calidigi provides six core service areas: Digital Marketing (SEO, content, social, lead generation), Web Design & Development, Local SEO, Branding & Creative, AI Solutions, and Business Growth Solutions. We often combine multiple services into integrated strategies tailored to each client\'s specific business challenges and goals.' },
  { q: 'Can Calidigi combine multiple services into one solution?', a: 'Yes — this is actually how we prefer to work. Most business challenges require more than a single isolated service. We develop integrated digital strategies that bring together the right combination of branding, web design, SEO, marketing, and AI to create a cohesive system that moves your business toward its goals.' },
  { q: 'Do you work with startups and small businesses?', a: 'Absolutely. Calidigi works with businesses at all stages — from early-stage startups building their first digital presence to established companies looking to scale and modernize their digital operations. We tailor our approach and recommendations to fit each business\'s current stage and growth objectives.' },
  { q: 'Can you improve an existing website rather than building a new one?', a: 'Yes. We work with existing websites when improving or optimizing them makes more sense than a full rebuild. This can include performance optimization, conversion rate improvements, SEO enhancements, design updates, and functionality additions. We assess each situation individually and recommend what makes the most business sense.' },
  { q: 'Do you provide ongoing SEO and digital marketing support?', a: 'Yes. SEO and digital marketing are not one-time activities — they require consistent effort over time. We offer ongoing engagement options for businesses that want continued support with SEO, content, local search optimization, analytics, and digital marketing execution beyond the initial project.' },
  { q: 'Can Calidigi build custom AI solutions for our business?', a: 'Yes. We help businesses identify where AI can create real value — then design and implement practical AI solutions including workflow automation, AI chatbots, data analysis tools, content systems, and custom integrations with existing business software. We focus on practical AI that solves real problems, not AI for the sake of it.' },
  { q: 'Can you work with our existing technology and systems?', a: 'In most cases, yes. We assess your current technology stack as part of our discovery process and design solutions that integrate with or build on your existing systems where practical. When existing systems create limitations or inefficiencies, we\'ll explain why and present alternatives — but we never push technology for the sake of selling more services.' },
  { q: 'How does the project process work?', a: 'We follow a structured six-step approach: Discover (understand your business and goals), Strategize (develop the right plan), Design (create the experience), Build (develop and integrate), Launch (deploy and validate), and Grow (optimize and scale). The depth and duration of each phase depends on the scope of work involved.' },
  { q: 'How is project pricing determined?', a: "Pricing is based on the scope of work, complexity, and duration of the engagement. We discuss your specific needs during the initial conversation, then provide a clear scope and investment outline. We don't use one-size-fits-all packages because every business situation is different — the right solution depends on your goals, timeline, and budget." },
  { q: 'Do you provide ongoing support after a project launches?', a: 'Yes. We offer ongoing support and maintenance options for all project types — from technical website maintenance to continued SEO, content, marketing, and AI optimization. Many of our clients choose to work with us on an ongoing basis to continuously improve their digital performance over time.' },
]

export default function ServicesFaq() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="faq-container">
      {faqs.map(({ q, a }, i) => (
        <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
          <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
            <span className="faq-q-text">{q}</span>
            <div className="faq-toggle"><i className={`fas ${open === i ? 'fa-minus' : 'fa-plus'}`}></i></div>
          </div>
          <div className="faq-a">
            <div className="faq-a-inner"><p>{a}</p></div>
          </div>
        </div>
      ))}
    </div>
  )
}
