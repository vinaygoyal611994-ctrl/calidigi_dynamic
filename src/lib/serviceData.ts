export interface ServiceDetail {
  slug: string
  name: string
  icon: string
  metaTitle: string
  metaDescription: string
  h1: string
  heroBadge: string
  heroHeading: string
  heroSub: string
  heroDesc: string
  heroStats: { num: string; label: string }[]
  features: { icon: string; title: string; desc: string }[]
  process: { n: string; title: string; desc: string }[]
  faqs: { q: string; a: string }[]
  ctaHeading: string
  ctaDesc: string
  relatedSlugs: string[]
}

export const SERVICES: ServiceDetail[] = [
  {
    slug: 'local-seo',
    name: 'Local SEO',
    icon: 'fa-map-location-dot',
    metaTitle: 'Local SEO Services California | Calidigi',
    metaDescription: 'Calidigi helps California businesses rank higher on Google Maps and local search. Local SEO services for Los Angeles, San Francisco, San Diego and 100+ CA cities.',
    h1: 'Local SEO Services California | Google Maps Ranking | Calidigi',
    heroBadge: 'Local SEO Services',
    heroHeading: 'Get Found by Customers\nNear You on Google',
    heroSub: 'Local SEO for California Businesses',
    heroDesc: 'When local customers search for your services, they should find you — not your competitors. Calidigi builds local SEO strategies that put California businesses at the top of Google Maps, local packs, and nearby searches in Los Angeles, San Francisco, San Diego and beyond.',
    heroStats: [
      { num: '3×', label: 'More Map Pack Clicks' },
      { num: '100+', label: 'CA Cities Served' },
      { num: '4.9★', label: 'Client Rating' },
      { num: '150+', label: 'Businesses Helped' },
    ],
    features: [
      { icon: 'fa-store', title: 'Google Business Profile Optimization', desc: 'Complete GBP setup, category selection, photo strategy, weekly posts and Q&A to maximize your Map Pack visibility.' },
      { icon: 'fa-magnifying-glass-location', title: 'Local Keyword Research', desc: 'Find exactly what nearby customers search for — service + city + neighborhood combinations that drive real foot traffic and calls.' },
      { icon: 'fa-list-check', title: 'Local Citation Building', desc: 'Consistent NAP listings across 50+ directories — Yelp, Apple Maps, Bing, and industry-specific platforms that build local authority.' },
      { icon: 'fa-star', title: 'Review Generation Strategy', desc: 'Proven systems to generate a steady flow of Google reviews — the templates, timing, and tools that get customers to actually leave reviews.' },
      { icon: 'fa-file-lines', title: 'Local Landing Pages', desc: 'City and neighborhood-specific pages that rank for hyperlocal searches and convert visitors from your service area into leads.' },
      { icon: 'fa-chart-line', title: 'Local Rank Tracking & Reporting', desc: 'Monthly reports showing your Map Pack positions, GBP views, call clicks, and direction requests — tied to actual business impact.' },
    ],
    process: [
      { n: '01', title: 'Local Audit', desc: 'Analyze your current local presence, competitor positions, citation gaps, and GBP performance baseline.' },
      { n: '02', title: 'Strategy', desc: 'Build a city-specific keyword map and prioritized action plan based on your service area and competition level.' },
      { n: '03', title: 'Optimize', desc: 'Fix and optimize your GBP, clean citations, create local landing pages, and implement review generation.' },
      { n: '04', title: 'Grow', desc: 'Monitor rankings, expand to new neighborhoods and cities, and compound your local authority over time.' },
    ],
    faqs: [
      { q: 'How long does local SEO take to show results?', a: 'Most California businesses see measurable improvement in Map Pack visibility within 60–90 days of consistent local SEO work. Highly competitive markets like Los Angeles or San Francisco may take 3–6 months to see significant ranking gains.' },
      { q: 'Do you work with businesses outside San Francisco and Los Angeles?', a: 'Yes — we serve businesses across all of California including San Diego, Sacramento, Fresno, Riverside, Oakland, and 100+ other cities. Local SEO strategies are customized to your specific service area and competition level.' },
      { q: 'What is the Google Map Pack and why does it matter?', a: 'The Google Map Pack is the three-business listing that appears with a map at the top of local search results. It captures the majority of clicks for local queries and is often more valuable than ranking on the first page of regular organic results.' },
      { q: 'Can you help with multi-location local SEO?', a: 'Yes. We manage local SEO for businesses with multiple California locations — each location gets its own GBP, citation strategy, and local landing page to maximize visibility in each service area.' },
    ],
    ctaHeading: 'Ready to Rank Higher in Local Search?',
    ctaDesc: 'Tell us your city and service area. We will audit your current local SEO position and show you exactly what it will take to appear in the Google Map Pack for your most valuable searches.',
    relatedSlugs: ['digital-marketing', 'web-development', 'business-growth'],
  },
  {
    slug: 'web-development',
    name: 'Web Design & Development',
    icon: 'fa-code',
    metaTitle: 'Web Design & Development Services California | Calidigi',
    metaDescription: 'Custom website design and development for California businesses. Calidigi builds fast, SEO-optimized, high-converting websites for businesses in LA, SF, San Diego and beyond.',
    h1: 'Web Design & Development Services for California Businesses | Calidigi',
    heroBadge: 'Web Design & Development',
    heroHeading: 'Websites That Convert\nVisitors Into Customers',
    heroSub: 'Web Design for California Businesses',
    heroDesc: 'Your website is your most important sales tool — and most business websites are underperforming. Calidigi builds high-converting, fast, SEO-ready websites for California businesses that attract the right customers and turn them into real leads and revenue.',
    heroStats: [
      { num: '500+', label: 'Sites Delivered' },
      { num: '4–8wk', label: 'Launch Timeline' },
      { num: '98%', label: 'Client Retention' },
      { num: '2×', label: 'Avg Conversion Lift' },
    ],
    features: [
      { icon: 'fa-palette', title: 'Custom Website Design', desc: 'Purpose-built designs that reflect your brand, communicate your value clearly, and guide visitors toward conversion — not templates adapted to fit.' },
      { icon: 'fa-mobile-screen', title: 'Mobile-First Development', desc: 'Every website built for flawless mobile performance — over 60% of your visitors are on mobile, and Google ranks mobile experience first.' },
      { icon: 'fa-gauge-high', title: 'Core Web Vitals Optimization', desc: 'Fast load times, smooth interactions, and stable layouts that meet Google\'s performance standards and keep visitors from bouncing.' },
      { icon: 'fa-magnifying-glass', title: 'SEO-Ready Architecture', desc: 'Clean URL structure, proper heading hierarchy, schema markup, and technical SEO foundations built in from day one — not retrofitted later.' },
      { icon: 'fa-pen-to-square', title: 'CMS Integration', desc: 'Easy-to-use content management so your team can update pages, publish blogs, and manage content without needing a developer for every change.' },
      { icon: 'fa-shield-halved', title: 'Security & Maintenance', desc: 'SSL, WAF, regular updates, and tested backups so your website stays secure, available, and performing at its best after launch.' },
    ],
    process: [
      { n: '01', title: 'Discovery', desc: 'Understand your business, customers, goals, and competitive landscape before touching a single design element.' },
      { n: '02', title: 'Design', desc: 'Create wireframes and visual designs aligned to your brand and optimized for conversion — reviewed and refined with your feedback.' },
      { n: '03', title: 'Build', desc: 'Develop your website with clean code, CMS integration, SEO foundations, and performance optimization built in.' },
      { n: '04', title: 'Launch & Grow', desc: 'Deploy, test, and hand over your website — with training, documentation, and ongoing support options.' },
    ],
    faqs: [
      { q: 'How much does a business website cost in California?', a: 'Website costs vary based on scope, features, and complexity. We provide transparent custom quotes after understanding your specific needs. Contact us for a free proposal — most business websites are completed within 4–8 weeks.' },
      { q: 'Will my website rank on Google?', a: 'Every website we build includes SEO foundations — proper technical structure, clean code, fast load times, and on-page optimization. We also offer ongoing SEO services to grow your organic visibility over time.' },
      { q: 'Do you work with existing websites or only new builds?', a: 'Both. We design and build new websites from scratch, and we also redesign, optimize, and improve existing websites for businesses that want better performance from what they already have.' },
      { q: 'Can you build e-commerce websites?', a: 'Yes. We build e-commerce websites on Shopify and custom platforms for California retail businesses — including product pages, payment integration, inventory management, and conversion optimization.' },
    ],
    ctaHeading: 'Ready to Build a Website That Works?',
    ctaDesc: 'Tell us about your business and goals. We will show you what a high-converting website looks like for your industry — with a clear timeline and transparent pricing.',
    relatedSlugs: ['local-seo', 'digital-marketing', 'branding'],
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    icon: 'fa-chart-line',
    metaTitle: 'Digital Marketing Services California | Calidigi',
    metaDescription: 'Data-driven digital marketing for California businesses. Calidigi delivers SEO, content marketing, paid ads and lead generation that grow your business in LA, SF and San Diego.',
    h1: 'Digital Marketing Services California | SEO, Content & Lead Generation | Calidigi',
    heroBadge: 'Digital Marketing',
    heroHeading: 'Digital Marketing That\nGenerates Real Business',
    heroSub: 'Digital Marketing for California Businesses',
    heroDesc: 'Traffic without leads is just noise. Calidigi builds data-driven digital marketing strategies for California businesses that attract the right customers, generate qualified leads, and produce measurable revenue growth — not vanity metrics.',
    heroStats: [
      { num: '+247%', label: 'Avg Organic Traffic Lift' },
      { num: '30+', label: 'Industries Served' },
      { num: '$50M+', label: 'Revenue Generated' },
      { num: '150+', label: 'Businesses Helped' },
    ],
    features: [
      { icon: 'fa-magnifying-glass-chart', title: 'Search Engine Optimization (SEO)', desc: 'On-page, off-page, and technical SEO strategies that improve your Google rankings for the keywords your customers actually search.' },
      { icon: 'fa-pen-nib', title: 'Content Marketing', desc: 'Strategic blog content, service pages, and resources that build authority, answer customer questions, and drive organic traffic consistently.' },
      { icon: 'fa-bullhorn', title: 'Paid Search & Google Ads', desc: 'ROI-focused Google Ads campaigns built around intent-driven keywords — with dedicated landing pages that convert clicks into enquiries.' },
      { icon: 'fa-share-nodes', title: 'Social Media Marketing', desc: 'Platform-specific social strategies that build brand awareness, grow engaged audiences, and drive traffic to your website and offers.' },
      { icon: 'fa-funnel-dollar', title: 'Lead Generation', desc: 'Conversion-focused landing pages, lead magnets, and follow-up sequences designed to turn website visitors into qualified business leads.' },
      { icon: 'fa-chart-bar', title: 'Analytics & Reporting', desc: 'Monthly performance reports that show exactly what is working, what is not, and where your marketing budget is generating the best return.' },
    ],
    process: [
      { n: '01', title: 'Audit', desc: 'Analyze your current digital presence, traffic sources, keyword rankings, and competitor positioning to identify the biggest opportunities.' },
      { n: '02', title: 'Strategy', desc: 'Build a channel-specific marketing plan aligned to your business goals, customer journey, and available budget.' },
      { n: '03', title: 'Execute', desc: 'Implement SEO, content, paid campaigns, and lead generation systems with consistent quality and on-brand messaging.' },
      { n: '04', title: 'Optimize', desc: 'Review performance data monthly, refine what works, cut what does not, and continuously improve results over time.' },
    ],
    faqs: [
      { q: 'How long before digital marketing shows results?', a: 'Paid campaigns can generate leads within days. SEO and content marketing typically begin showing meaningful results in 3–6 months, with compounding returns over 12–24 months. We set realistic expectations based on your specific market and starting position.' },
      { q: 'Do you manage Google Ads for California businesses?', a: 'Yes. We create and manage Google Ads campaigns for California businesses — from keyword research and ad copy to dedicated landing pages and conversion tracking. We focus on cost-per-lead, not just click volume.' },
      { q: 'What industries do you work with?', a: 'We work across 30+ industries in California — healthcare, legal, home services, e-commerce, restaurants, real estate, SaaS, education, and more. Every strategy is customized to your specific industry, competition level, and local market.' },
      { q: 'How do you measure digital marketing success?', a: 'We track metrics tied to business outcomes — leads generated, cost per lead, conversion rate, organic traffic growth, and keyword rankings. We avoid vanity metrics and focus on what actually impacts your revenue.' },
    ],
    ctaHeading: 'Ready to Grow Your Business Online?',
    ctaDesc: 'Tell us your current marketing situation and growth goals. We will build a digital marketing plan designed around your specific business — with clear KPIs and realistic timelines.',
    relatedSlugs: ['local-seo', 'web-development', 'business-growth'],
  },
  {
    slug: 'ai-automation',
    name: 'AI Automation',
    icon: 'fa-brain',
    metaTitle: 'AI Automation Services for California Businesses | Calidigi',
    metaDescription: 'Calidigi builds AI automation solutions for California businesses — chatbots, workflow automation, AI lead qualification and custom AI integrations that save time and grow revenue.',
    h1: 'AI Automation Services for California Businesses | Calidigi',
    heroBadge: 'AI & Automation',
    heroHeading: 'AI Solutions That Solve\nReal Business Problems',
    heroSub: 'AI Automation for California Businesses',
    heroDesc: 'We do not use AI as a buzzword. Calidigi helps California businesses identify exactly where AI and automation create real value — reducing repetitive work, improving customer experience, and making smarter decisions — without over-engineering your operations.',
    heroStats: [
      { num: '18hrs', label: 'Avg Weekly Time Saved' },
      { num: '24/7', label: 'AI Support Coverage' },
      { num: '40%', label: 'Avg Cost Reduction' },
      { num: '90days', label: 'Typical Time to ROI' },
    ],
    features: [
      { icon: 'fa-headset', title: 'AI Customer Support Chatbots', desc: 'Intelligent chatbots trained on your business knowledge that handle common customer questions 24/7 — reducing support volume and improving response time.' },
      { icon: 'fa-user-check', title: 'AI Lead Qualification', desc: 'Automatically score, qualify, and route inbound leads so your sales team focuses on the highest-value opportunities and stops chasing dead ends.' },
      { icon: 'fa-gears', title: 'Business Workflow Automation', desc: 'Automate repetitive processes — appointment reminders, follow-up emails, invoice processing, onboarding sequences — with tools like Make, Zapier, and HubSpot.' },
      { icon: 'fa-microphone', title: 'AI Voice Agents', desc: 'Intelligent phone agents that handle inbound calls, qualify callers, take bookings, and answer FAQs — available around the clock without staff overhead.' },
      { icon: 'fa-pen-nib', title: 'AI Content & Marketing Automation', desc: 'AI-assisted content creation, SEO writing, email personalization, and social media automation that scales your marketing without scaling your team.' },
      { icon: 'fa-puzzle-piece', title: 'Custom AI Integrations', desc: 'Bespoke AI solutions built around your specific workflows, data, and business challenges — designed to integrate with the tools you already use.' },
    ],
    process: [
      { n: '01', title: 'Identify', desc: 'Map your current workflows and identify where repetitive tasks, slow processes, or manual bottlenecks are costing your business most.' },
      { n: '02', title: 'Design', desc: 'Design the right AI or automation solution for your specific problem — pragmatic, buildable, and tied to measurable business outcomes.' },
      { n: '03', title: 'Build', desc: 'Develop, test, and integrate the AI solution with your existing tools — with proper training data, prompts, and quality controls.' },
      { n: '04', title: 'Optimize', desc: 'Monitor performance, refine responses, and expand automation to additional workflows as you see the business impact compound.' },
    ],
    faqs: [
      { q: 'Do I need a tech team to use AI in my business?', a: 'No. Most of the AI solutions we implement for California small businesses require no internal tech team to maintain. We build, configure, and manage the solutions — your team just benefits from the results.' },
      { q: 'What types of businesses benefit most from AI automation?', a: 'Any business with repetitive customer interactions, high lead volume, or manual administrative tasks benefits significantly. Healthcare practices, legal firms, home service companies, e-commerce businesses, and restaurants in California are among the highest-impact categories.' },
      { q: 'How is Calidigi AI different from buying a generic chatbot tool?', a: 'Generic chatbot tools give you a template. We build AI solutions trained on your specific business — your services, pricing, FAQs, tone, and workflows. The result is an AI that genuinely represents your business, not a generic bot.' },
      { q: 'How quickly can an AI solution be deployed?', a: 'Simple chatbot and workflow automation implementations typically take 2–4 weeks from discovery to deployment. More complex custom AI integrations depend on scope — we provide a clear timeline during our initial consultation.' },
    ],
    ctaHeading: 'Ready to Put AI to Work in Your Business?',
    ctaDesc: 'Tell us where your team spends the most time on manual, repetitive work. We will identify the highest-impact AI automation opportunities and show you what is possible — with a realistic timeline and ROI estimate.',
    relatedSlugs: ['digital-marketing', 'web-development', 'business-growth'],
  },
  {
    slug: 'branding',
    name: 'Branding & Creative',
    icon: 'fa-palette',
    metaTitle: 'Branding & Logo Design Services California | Calidigi',
    metaDescription: 'Professional branding and logo design for California businesses. Calidigi creates brand identities that build recognition, trust and differentiation in LA, SF, San Diego and beyond.',
    h1: 'Branding & Logo Design Services for California Businesses | Calidigi',
    heroBadge: 'Branding & Creative',
    heroHeading: 'A Brand That Makes\nCustomers Choose You',
    heroSub: 'Branding for California Businesses',
    heroDesc: 'Your brand is the reason customers choose you over a competitor with the same price and similar services. Calidigi creates professional brand identities for California businesses that build instant recognition, communicate credibility, and stand out in competitive local markets.',
    heroStats: [
      { num: '500+', label: 'Brands Created' },
      { num: '30+', label: 'Industries' },
      { num: '4.9★', label: 'Client Rating' },
      { num: '98%', label: 'Client Retention' },
    ],
    features: [
      { icon: 'fa-lightbulb', title: 'Brand Strategy', desc: 'Define your brand positioning, target audience, unique value, and competitive differentiation — the strategic foundation everything else is built on.' },
      { icon: 'fa-vector-square', title: 'Logo Design', desc: 'A distinctive, versatile logo designed to work across all applications — digital, print, signage, merchandise, and social media — at any size.' },
      { icon: 'fa-swatchbook', title: 'Visual Identity System', desc: 'Complete color palette, typography system, iconography, and design patterns that create a consistent brand experience across every touchpoint.' },
      { icon: 'fa-book', title: 'Brand Guidelines', desc: 'A comprehensive style guide documenting how your brand looks, sounds, and feels — so every team member, agency, and vendor stays on-brand.' },
      { icon: 'fa-comment-dots', title: 'Brand Voice & Messaging', desc: 'Your brand\'s tone of voice, core messaging, tagline, and communication style — how your brand sounds as clearly as how it looks.' },
      { icon: 'fa-images', title: 'Digital Brand Assets', desc: 'Social media templates, email headers, presentation decks, and digital marketing assets built consistently on your new brand system.' },
    ],
    process: [
      { n: '01', title: 'Discover', desc: 'Understand your business, customers, competitors, and the impression you want to make — the foundation for every strategic brand decision.' },
      { n: '02', title: 'Position', desc: 'Define your brand positioning, personality, and value proposition — what you stand for and how you differentiate from competitors.' },
      { n: '03', title: 'Design', desc: 'Create logo concepts, visual identity options, and brand system elements — refined through collaborative review until exactly right.' },
      { n: '04', title: 'Deliver', desc: 'Final brand files in every format needed, a complete brand guidelines document, and digital assets ready to deploy immediately.' },
    ],
    faqs: [
      { q: 'How long does a branding project take?', a: 'Most branding projects — from discovery to final delivery — take 4–6 weeks depending on scope and revision cycles. A complete brand identity including strategy, logo, visual system, and guidelines is typically delivered within 6 weeks.' },
      { q: 'Do I own the brand and logo files after the project?', a: 'Yes. You receive full ownership of all brand files — including source files in every format (SVG, AI, EPS, PNG, PDF) — with unrestricted usage rights. The brand is yours entirely.' },
      { q: 'Can you update or refresh an existing brand without a full rebrand?', a: 'Yes. Many California businesses need a brand refresh rather than a full rebrand — modernizing a logo, updating the color palette, or creating a consistent visual system from existing assets. We assess your current brand and recommend the right level of work.' },
      { q: 'Do you also design websites and marketing materials after branding?', a: 'Yes. Many clients move from branding directly into website design and digital marketing — with the brand system already established, we can create a highly consistent digital presence across all channels.' },
    ],
    ctaHeading: 'Ready to Build a Brand That Stands Out?',
    ctaDesc: 'Tell us about your business and what you want your brand to communicate. We will show you what a strong brand identity looks like for your industry and your California market.',
    relatedSlugs: ['web-development', 'digital-marketing', 'business-growth'],
  },
  {
    slug: 'business-growth',
    name: 'Business Growth Solutions',
    icon: 'fa-seedling',
    metaTitle: 'Business Growth Solutions California | Calidigi',
    metaDescription: 'Integrated business growth solutions for California companies. Calidigi combines SEO, web design, AI and marketing automation to help you scale faster and generate more leads.',
    h1: 'Business Growth Solutions for California Companies | Calidigi',
    heroBadge: 'Business Growth Solutions',
    heroHeading: 'Integrated Solutions Built\nAround Your Growth Goals',
    heroSub: 'Business Growth for California Companies',
    heroDesc: 'Real business growth rarely comes from one service in isolation. Calidigi combines web design, SEO, digital marketing, AI automation, and branding into integrated growth strategies for California businesses that are ready to scale — and want a partner, not just a vendor.',
    heroStats: [
      { num: '150+', label: 'Businesses Helped' },
      { num: '$50M+', label: 'Revenue Generated' },
      { num: '30+', label: 'Industries' },
      { num: '4.9★', label: 'Client Rating' },
    ],
    features: [
      { icon: 'fa-crosshairs', title: 'Digital Growth Strategy', desc: 'A comprehensive digital strategy that connects your website, SEO, marketing, AI, and brand into a unified growth system — built around your specific business goals.' },
      { icon: 'fa-funnel-dollar', title: 'Lead Generation Systems', desc: 'End-to-end lead generation combining SEO, paid search, landing pages, and follow-up automation to create a consistent, scalable flow of qualified leads.' },
      { icon: 'fa-gears', title: 'Marketing Automation', desc: 'Automated nurture sequences, lead scoring, CRM integration, and follow-up workflows that convert more of your existing leads without adding headcount.' },
      { icon: 'fa-map-location-dot', title: 'Local & Regional Expansion', desc: 'Structured strategies for expanding your digital presence into new California cities and neighborhoods — local SEO, location pages, and city-specific campaigns.' },
      { icon: 'fa-chart-bar', title: 'Business Intelligence & Analytics', desc: 'Custom dashboards and AI-assisted data analysis that give you clear visibility into what is driving growth — and what is holding it back.' },
      { icon: 'fa-handshake', title: 'Ongoing Growth Partnership', desc: 'Monthly strategy reviews, continuous optimization, and strategic guidance as your business evolves — a long-term partner, not a one-time project.' },
    ],
    process: [
      { n: '01', title: 'Assess', desc: 'Understand your current digital position, growth goals, biggest challenges, and the competitive landscape in your California market.' },
      { n: '02', title: 'Plan', desc: 'Build an integrated growth roadmap — prioritized by impact, sequenced by dependency, and scoped to your budget and timeline.' },
      { n: '03', title: 'Execute', desc: 'Implement the strategy across web, SEO, marketing, automation, and AI — with clear accountability and regular milestone check-ins.' },
      { n: '04', title: 'Scale', desc: 'Use performance data to double down on what works, expand into new channels and markets, and build compounding digital growth.' },
    ],
    faqs: [
      { q: 'How is Business Growth Solutions different from your other services?', a: 'Individual services (Local SEO, Web Design, etc.) solve specific problems. Business Growth Solutions is for companies that want an integrated, multi-channel approach — where all the pieces work together as a unified system rather than separate initiatives.' },
      { q: 'What size of business is this right for?', a: 'Business Growth Solutions is best suited for California businesses generating at least $500K in annual revenue that are ready to invest in digital as a primary growth channel — typically 5–50 employees across any industry.' },
      { q: 'Do you offer month-to-month or long-term contracts?', a: 'We offer flexible engagement models based on scope. Growth programs typically run on 6–12 month agreements to allow enough time for compounding results, but we offer month-to-month options for specific service components.' },
      { q: 'How do you measure the ROI of a growth program?', a: 'We establish baseline metrics at the start of every engagement — leads, traffic, rankings, conversion rate — and report against these monthly. We tie everything to business outcomes: leads generated, customers acquired, and revenue attributed to digital channels.' },
    ],
    ctaHeading: 'Ready to Scale Your California Business?',
    ctaDesc: 'Tell us your growth goals and current situation. We will design an integrated digital growth strategy built specifically for your business — with clear priorities, timelines, and expected outcomes.',
    relatedSlugs: ['local-seo', 'digital-marketing', 'ai-automation'],
  },
]

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES.find(s => s.slug === slug)
}
