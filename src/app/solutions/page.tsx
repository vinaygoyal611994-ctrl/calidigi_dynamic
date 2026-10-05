import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Integration, Custom Software & Technology Solutions | Calidigi',
  description:
    'Calidigi delivers enterprise-grade technology solutions: AI integration, custom software development, web & mobile apps, business automation, data analytics and cloud solutions for California businesses.',
  alternates: {
    canonical: 'https://www.calidigi.com/solutions',
    languages: { 'en-US': 'https://www.calidigi.com/solutions', 'x-default': 'https://www.calidigi.com/solutions' },
  },
  openGraph: {
    url: 'https://www.calidigi.com/solutions',
    title: 'AI Integration, Custom Software & Technology Solutions | Calidigi California',
    description: 'Calidigi delivers enterprise-grade technology solutions: AI integration, custom software development, web & mobile apps, business automation, data analytics and cloud solutions for California businesses.',
  },
  twitter: {
    title: 'AI Integration, Custom Software & Technology Solutions | Calidigi California',
    description: 'Calidigi delivers enterprise-grade technology solutions: AI integration, custom software development, web & mobile apps, business automation, data analytics and cloud solutions for California businesses.',
  },
}

export default function SolutionsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://www.calidigi.com/solutions#webpage',
        url: 'https://www.calidigi.com/solutions',
        name: 'AI Integration, Custom Software & Technology Solutions | Calidigi California',
        description: 'Enterprise-grade technology solutions: AI integration, custom software, web & mobile apps, automation and cloud.',
        isPartOf: { '@id': 'https://www.calidigi.com/#website' },
        breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.calidigi.com/' }, { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://www.calidigi.com/solutions' }] },
      },
      {
        '@type': 'Service',
        '@id': 'https://www.calidigi.com/solutions#service-ai',
        serviceType: 'AI Integration and Automation',
        name: 'AI Integration & Automation',
        description: 'Embed large language models, computer vision, and intelligent automation directly into your existing systems.',
        provider: { '@id': 'https://www.calidigi.com/#organization' },
        areaServed: { '@type': 'State', name: 'California' },
        url: 'https://www.calidigi.com/solutions',
      },
      {
        '@type': 'Service',
        '@id': 'https://www.calidigi.com/solutions#service-software',
        serviceType: 'Custom Software Development',
        name: 'Custom Software Development',
        description: 'End-to-end software engineered for your specific use case — from initial architecture to production deployment and ongoing maintenance.',
        provider: { '@id': 'https://www.calidigi.com/#organization' },
        areaServed: { '@type': 'State', name: 'California' },
        url: 'https://www.calidigi.com/solutions',
      },
      {
        '@type': 'Service',
        '@id': 'https://www.calidigi.com/solutions#service-cloud',
        serviceType: 'Cloud Architecture and DevOps',
        name: 'Cloud Architecture & DevOps',
        description: 'Design and deploy cloud infrastructure that scales automatically, recovers automatically, and costs only what you use.',
        provider: { '@id': 'https://www.calidigi.com/#organization' },
        areaServed: { '@type': 'State', name: 'California' },
        url: 'https://www.calidigi.com/solutions',
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* ── 1. HERO ── */}
      <section className="sol-hero" id="home">
        <div className="sol-hero-glow"></div>
        <div className="sol-hero-glow-2"></div>
        <div className="sol-hero-grid-bg"></div>
        <div className="container sol-hero-inner">
          <div className="sol-hero-content">
            <div className="badge badge-white"><i className="fas fa-microchip"></i> Technology Solutions</div>
            <h1>Enterprise Technology<br /><em>Built for the Future</em></h1>
            <p>From AI integration and custom software to cloud architecture and digital transformation — Calidigi engineers intelligent solutions that drive measurable business outcomes for ambitious California companies.</p>
            <div className="sol-hero-actions">
              <Link href="/contact-us" className="btn btn-primary">Start Your Project <i className="fas fa-arrow-right"></i></Link>
              <a href="#solutions" className="btn btn-outline-white">Explore Solutions</a>
            </div>
            <div className="sol-hero-proof">
              <div className="sol-hero-proof-item"><i className="fas fa-check-circle"></i><span>AI-native architecture</span></div>
              <div className="sol-hero-proof-item"><i className="fas fa-check-circle"></i><span>Scalable &amp; cloud-ready</span></div>
              <div className="sol-hero-proof-item"><i className="fas fa-check-circle"></i><span>Enterprise-grade security</span></div>
            </div>
          </div>
          <div className="sol-hero-visual">
            <div className="sol-tech-interface">
              <div className="sol-ti-header">
                <div className="sol-ti-dots">
                  <span className="sol-ti-dot red"></span>
                  <span className="sol-ti-dot yellow"></span>
                  <span className="sol-ti-dot green"></span>
                </div>
                <span className="sol-ti-title">Calidigi Intelligence Platform</span>
                <div className="sol-ti-status"><span className="sol-ti-status-dot"></span> Live</div>
              </div>
              <div className="sol-ti-body">
                <div className="sol-ti-metrics">
                  <div className="sol-ti-metric"><span className="sol-ti-metric-val">98.7%</span><span className="sol-ti-metric-label">Uptime SLA</span></div>
                  <div className="sol-ti-metric accent"><span className="sol-ti-metric-val">4.2ms</span><span className="sol-ti-metric-label">Avg. Response</span></div>
                  <div className="sol-ti-metric"><span className="sol-ti-metric-val">2.4M</span><span className="sol-ti-metric-label">API Calls/day</span></div>
                </div>
                <div className="sol-ti-modules">
                  <div className="sol-ti-module active">
                    <i className="fas fa-brain"></i>
                    <div><span className="sol-ti-mod-name">AI Engine</span><span className="sol-ti-mod-status">Running</span></div>
                    <div className="sol-ti-mod-bar"><div className="sol-ti-mod-fill" style={{ width: '87%' }}></div></div>
                  </div>
                  <div className="sol-ti-module">
                    <i className="fas fa-database"></i>
                    <div><span className="sol-ti-mod-name">Data Pipeline</span><span className="sol-ti-mod-status">Processing</span></div>
                    <div className="sol-ti-mod-bar"><div className="sol-ti-mod-fill" style={{ width: '62%' }}></div></div>
                  </div>
                  <div className="sol-ti-module">
                    <i className="fas fa-cloud"></i>
                    <div><span className="sol-ti-mod-name">Cloud Infra</span><span className="sol-ti-mod-status">Optimized</span></div>
                    <div className="sol-ti-mod-bar"><div className="sol-ti-mod-fill" style={{ width: '94%' }}></div></div>
                  </div>
                  <div className="sol-ti-module">
                    <i className="fas fa-shield-halved"></i>
                    <div><span className="sol-ti-mod-name">Security Layer</span><span className="sol-ti-mod-status">Protected</span></div>
                    <div className="sol-ti-mod-bar"><div className="sol-ti-mod-fill" style={{ width: '100%' }}></div></div>
                  </div>
                </div>
                <div className="sol-ti-tags">
                  <span>Python</span><span>React</span><span>Node.js</span><span>AWS</span><span>OpenAI</span><span>PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FOUR PILLARS ── */}
      <section className="sol-pillars" id="overview">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-layer-group"></i> Core Capability Areas</div>
            <h2>Four Technology Pillars That<br /><em className="text-orange">Power Modern Businesses</em></h2>
            <p>Every Calidigi solution is built around four interconnected technology pillars — designed to work independently or as a unified intelligent system.</p>
          </div>
          <div className="sol-pillars-grid">
            <div className="sol-pillar-card sol-pillar-ai">
              <div className="sol-pillar-icon"><i className="fas fa-brain"></i></div>
              <h3>Artificial Intelligence</h3>
              <p>Deploy intelligent models that automate decisions, predict outcomes, and surface insights your team can act on immediately.</p>
              <ul className="sol-pillar-list">
                <li><i className="fas fa-chevron-right"></i> Custom AI model training</li>
                <li><i className="fas fa-chevron-right"></i> LLM integration &amp; fine-tuning</li>
                <li><i className="fas fa-chevron-right"></i> Computer vision &amp; NLP</li>
                <li><i className="fas fa-chevron-right"></i> Predictive analytics</li>
              </ul>
              <div className="sol-pillar-badge">AI-First</div>
            </div>
            <div className="sol-pillar-card sol-pillar-software">
              <div className="sol-pillar-icon"><i className="fas fa-code"></i></div>
              <h3>Custom Software</h3>
              <p>Purpose-built applications engineered around your exact workflow, integrations, and scalability requirements.</p>
              <ul className="sol-pillar-list">
                <li><i className="fas fa-chevron-right"></i> SaaS product development</li>
                <li><i className="fas fa-chevron-right"></i> API design &amp; integration</li>
                <li><i className="fas fa-chevron-right"></i> Enterprise web applications</li>
                <li><i className="fas fa-chevron-right"></i> MVP to production</li>
              </ul>
              <div className="sol-pillar-badge">Full-Stack</div>
            </div>
            <div className="sol-pillar-card sol-pillar-mobile">
              <div className="sol-pillar-icon"><i className="fas fa-mobile-screen-button"></i></div>
              <h3>Web &amp; Mobile Apps</h3>
              <p>Fast, beautiful, and conversion-optimized digital experiences across every screen size and platform.</p>
              <ul className="sol-pillar-list">
                <li><i className="fas fa-chevron-right"></i> React &amp; Next.js applications</li>
                <li><i className="fas fa-chevron-right"></i> Native iOS &amp; Android</li>
                <li><i className="fas fa-chevron-right"></i> Progressive web apps (PWA)</li>
                <li><i className="fas fa-chevron-right"></i> Real-time applications</li>
              </ul>
              <div className="sol-pillar-badge">Cross-Platform</div>
            </div>
            <div className="sol-pillar-card sol-pillar-cloud">
              <div className="sol-pillar-icon"><i className="fas fa-cloud-arrow-up"></i></div>
              <h3>Cloud &amp; Infrastructure</h3>
              <p>Resilient, scalable cloud architecture that grows with your business and keeps costs predictable at every stage.</p>
              <ul className="sol-pillar-list">
                <li><i className="fas fa-chevron-right"></i> AWS, GCP &amp; Azure deployment</li>
                <li><i className="fas fa-chevron-right"></i> DevOps &amp; CI/CD pipelines</li>
                <li><i className="fas fa-chevron-right"></i> Microservices architecture</li>
                <li><i className="fas fa-chevron-right"></i> Performance &amp; cost optimization</li>
              </ul>
              <div className="sol-pillar-badge">Cloud-Native</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. CORE SOLUTIONS ── */}
      <section className="sol-solutions" id="solutions">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-blue"><i className="fas fa-cubes"></i> What We Build</div>
            <h2>Eight Solutions That <em className="text-orange">Solve Real Problems</em></h2>
            <p>Not templates. Not off-the-shelf plugins. We engineer solutions specifically designed around the complexity of your business — and built to scale.</p>
          </div>
          <div className="sol-cards-grid">
            {[
              { num: '01', cls: 'sol-icon-ai',        fas: 'fa-brain',              title: 'AI Integration & Automation',        desc: 'Embed large language models, computer vision, and intelligent automation directly into your existing systems — without rebuilding from scratch.', tags: ['GPT-4 / Claude Integration', 'Workflow Automation', 'Document AI', 'Chatbot Development', 'Recommendation Engines'], link: 'Discuss Your AI Project' },
              { num: '02', cls: 'sol-icon-software',   fas: 'fa-laptop-code',        title: 'Custom Software Development',         desc: 'End-to-end software engineered for your specific use case — from initial architecture to production deployment and ongoing maintenance.',          tags: ['SaaS Platforms', 'Enterprise Tools', 'Admin Dashboards', 'CRM & ERP Systems', 'Third-party Integrations'],           link: 'Build Your Software' },
              { num: '03', cls: 'sol-icon-web',        fas: 'fa-globe',              title: 'Web Application Development',         desc: 'High-performance web apps that handle real scale — React, Next.js, and Node.js architectures that deliver sub-second experiences.',              tags: ['React / Next.js', 'Real-time Features', 'E-commerce Platforms', 'Headless CMS', 'API-first Architecture'],             link: 'Start Your Web App' },
              { num: '04', cls: 'sol-icon-mobile',     fas: 'fa-mobile-screen-button', title: 'Mobile App Development',            desc: 'Native iOS and Android applications — and React Native / Flutter cross-platform solutions — built with the performance your users demand.',     tags: ['iOS (Swift)', 'Android (Kotlin)', 'React Native', 'Flutter', 'App Store Optimization'],                                  link: 'Plan Your Mobile App' },
              { num: '05', cls: 'sol-icon-auto',       fas: 'fa-gears',              title: 'Business Process Automation',        desc: 'Map, optimize, and automate repetitive business workflows — so your team spends time on work that actually creates value.',                   tags: ['RPA Implementation', 'Zapier / Make Workflows', 'Data Sync & ETL', 'Email Automation', 'Reporting Pipelines'],          link: 'Automate Your Business' },
              { num: '06', cls: 'sol-icon-data',       fas: 'fa-chart-column',       title: 'Data & Analytics Solutions',         desc: 'Turn raw data into business intelligence — with custom dashboards, data pipelines, and machine learning models that answer the right questions.', tags: ['BI Dashboards', 'Data Warehousing', 'ML Pipelines', 'Real-time Analytics', 'Customer Insights'],                         link: 'Unlock Your Data' },
              { num: '07', cls: 'sol-icon-cloud',      fas: 'fa-cloud',              title: 'Cloud Architecture & DevOps',        desc: 'Design and deploy cloud infrastructure that scales automatically, recovers automatically, and costs only what you use.',                      tags: ['AWS / GCP / Azure', 'Kubernetes & Docker', 'CI/CD Pipelines', 'Infrastructure as Code', 'Cost Optimization'],          link: 'Architect Your Cloud' },
              { num: '08', cls: 'sol-icon-transform',  fas: 'fa-arrows-spin',        title: 'Digital Transformation Consulting',  desc: 'Strategic technology advisory for businesses ready to modernize — from legacy system migration to enterprise-wide digital transformation roadmaps.', tags: ['Technology Audit', 'Roadmap Planning', 'Legacy Modernization', 'Change Management', 'ROI Forecasting'],                   link: 'Start Transformation' },
            ].map(({ num, cls, fas, title, desc, tags, link }) => (
              <div key={num} className="sol-card">
                <div className="sol-card-top">
                  <span className="sol-card-num">{num}</span>
                  <div className={`sol-card-icon ${cls}`}><i className={`fas ${fas}`}></i></div>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="sol-card-tags">{tags.map(t => <span key={t}>{t}</span>)}</div>
                <Link href="/contact-us" className="sol-card-link">{link} <i className="fas fa-arrow-right"></i></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. AI SPOTLIGHT ── */}
      <section className="sol-ai-spotlight" id="ai">
        <div className="sol-ai-glow"></div>
        <div className="container sol-ai-inner">
          <div className="sol-ai-content">
            <div className="badge badge-white"><i className="fas fa-microchip"></i> AI-First Philosophy</div>
            <h2>We Don&apos;t Add AI as an Afterthought.<br /><em>We Design Intelligence In.</em></h2>
            <p>Every solution Calidigi architects starts with the question: how can intelligence make this faster, smarter, and more valuable? From recommendation engines to autonomous agents — AI is the foundation, not the feature.</p>
            <div className="sol-ai-features">
              {[
                { icon: 'fa-robot',      title: 'Autonomous AI Agents',        desc: 'Multi-step reasoning agents that complete complex tasks, browse the web, call APIs, and make intelligent decisions with minimal human intervention.' },
                { icon: 'fa-comment-dots', title: 'Conversational AI & Chatbots', desc: 'Custom-trained LLM-powered assistants that know your products, policies, and customers — deployed on any platform in days, not months.' },
                { icon: 'fa-eye',        title: 'Computer Vision Systems',     desc: 'Real-time object detection, image classification, and visual quality control — for industries from retail and manufacturing to healthcare.' },
                { icon: 'fa-chart-line', title: 'Predictive Intelligence',     desc: 'Demand forecasting, churn prediction, fraud detection, and revenue modeling — trained on your data, not generic benchmarks.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="sol-ai-feature">
                  <div className="sol-ai-feature-icon"><i className={`fas ${icon}`}></i></div>
                  <div><h4>{title}</h4><p>{desc}</p></div>
                </div>
              ))}
            </div>
            <Link href="/contact-us" className="btn btn-primary">Talk to Our AI Team <i className="fas fa-arrow-right"></i></Link>
          </div>
          <div className="sol-ai-visual">
            <div className="sol-ai-card">
              <div className="sol-ai-card-header">
                <i className="fas fa-terminal"></i>
                <span>AI Capability Map</span>
              </div>
              <div className="sol-ai-capabilities">
                <div className="sol-ai-cap-row">
                  <div className="sol-ai-cap"><div className="sol-ai-cap-icon"><i className="fas fa-language"></i></div><span>NLP</span></div>
                  <div className="sol-ai-cap"><div className="sol-ai-cap-icon"><i className="fas fa-eye"></i></div><span>Vision</span></div>
                  <div className="sol-ai-cap"><div className="sol-ai-cap-icon"><i className="fas fa-wave-square"></i></div><span>Prediction</span></div>
                </div>
                <div className="sol-ai-cap-row">
                  <div className="sol-ai-cap"><div className="sol-ai-cap-icon"><i className="fas fa-robot"></i></div><span>Agents</span></div>
                  <div className="sol-ai-cap featured"><div className="sol-ai-cap-icon"><i className="fas fa-brain"></i></div><span>LLM Core</span></div>
                  <div className="sol-ai-cap"><div className="sol-ai-cap-icon"><i className="fas fa-gears"></i></div><span>Automation</span></div>
                </div>
                <div className="sol-ai-cap-row">
                  <div className="sol-ai-cap"><div className="sol-ai-cap-icon"><i className="fas fa-magnifying-glass-chart"></i></div><span>Analytics</span></div>
                  <div className="sol-ai-cap"><div className="sol-ai-cap-icon"><i className="fas fa-shield-halved"></i></div><span>AI Safety</span></div>
                  <div className="sol-ai-cap"><div className="sol-ai-cap-icon"><i className="fas fa-database"></i></div><span>RAG / Data</span></div>
                </div>
              </div>
              <div className="sol-ai-models">
                <span className="sol-ai-model-label">Supported Models</span>
                <div className="sol-ai-model-pills">
                  <span>GPT-4o</span><span>Claude 3</span><span>Gemini</span><span>Llama 3</span><span>Mistral</span><span>Custom</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PROCESS ── */}
      <section className="sol-process" id="process">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-diagram-project"></i> Our Process</div>
            <h2>How We Take You From <em className="text-orange">Idea to Production</em></h2>
            <p>A disciplined six-stage engineering process that eliminates surprises — and delivers working software on schedule, every time.</p>
          </div>
          <div className="sol-process-track">
            {[
              { n: '01', title: 'Discovery & Scoping',     desc: 'Deep-dive into your business requirements, technical constraints, integrations, and success criteria. Output: detailed scope document + architecture proposal.', time: 'Week 1',      orange: false },
              { n: '02', title: 'Architecture & Design',   desc: 'System architecture, database schema, API contracts, and UX wireframes — all validated before a single line of code is written.',                                time: 'Weeks 2–3',  orange: false },
              { n: '03', title: 'Sprint Development',      desc: 'Two-week agile sprints with working demos every cycle. You see real progress — not status updates — throughout the build.',                                      time: 'Weeks 4–12+', orange: false },
              { n: '04', title: 'QA & Security Testing',   desc: 'Automated test suites, load testing, penetration testing, and accessibility audits before any release reaches production.',                                      time: 'Concurrent', orange: false },
              { n: '05', title: 'Deployment & Launch',     desc: 'Zero-downtime production deployment with full CI/CD pipelines, monitoring, and rollback capabilities configured from day one.',                                  time: 'Go-live',    orange: false },
              { n: '06', title: 'Optimize & Scale',        desc: 'Post-launch monitoring, performance tuning, feature iteration, and ongoing engineering support as your product grows.',                                          time: 'Ongoing',    orange: true  },
            ].map(({ n, title, desc, time, orange }) => (
              <div key={n} className="sol-process-step">
                <div className={`sol-process-circle${orange ? ' sol-process-circle-orange' : ''}`}><span>{n}</span></div>
                <div className="sol-process-body">
                  <h4>{title}</h4>
                  <p>{desc}</p>
                  <div className="sol-process-duration"><i className="fas fa-clock"></i> {time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TECH STACK ── */}
      <section className="sol-stack" id="stack">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-blue"><i className="fas fa-layer-group"></i> Technology Stack</div>
            <h2>The Tools We Use to Build<br /><em className="text-orange">Production-Grade Products</em></h2>
            <p>We choose technology based on what&apos;s right for your project — not what&apos;s trending. Here&apos;s what we work with every day.</p>
          </div>
          <div className="sol-stack-grid">
            {[
              { icon: 'fa-server',              title: 'Backend & APIs',          pills: ['Node.js', 'Python', 'Django', 'FastAPI', 'Go', 'GraphQL', 'REST APIs', 'WebSockets'] },
              { icon: 'fa-desktop',             title: 'Frontend & Web',          pills: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'GSAP'] },
              { icon: 'fa-mobile-screen-button', title: 'Mobile',                 pills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo', 'Firebase', 'Push Notifications'] },
              { icon: 'fa-brain',               title: 'AI & Machine Learning',   pills: ['OpenAI API', 'Claude / Anthropic', 'LangChain', 'PyTorch', 'scikit-learn', 'Pinecone', 'Hugging Face'] },
              { icon: 'fa-cloud',               title: 'Cloud & DevOps',          pills: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Vercel'] },
              { icon: 'fa-database',            title: 'Databases & Storage',     pills: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Elasticsearch', 'S3 / GCS', 'PlanetScale'] },
            ].map(({ icon, title, pills }) => (
              <div key={title} className="sol-stack-cat">
                <div className="sol-stack-cat-head">
                  <div className="sol-stack-cat-icon"><i className={`fas ${icon}`}></i></div>
                  <h4>{title}</h4>
                </div>
                <div className="sol-stack-pills">{pills.map(p => <span key={p}>{p}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. INDUSTRIES ── */}
      <section className="sol-industries" id="industries">
        <div className="sol-ind-glow"></div>
        <div className="container">
          <div className="section-head light">
            <div className="badge badge-white"><i className="fas fa-building"></i> Industries We Serve</div>
            <h2>Built for Every Sector That<br /><em style={{ color: 'var(--orange)' }}>Technology Can Transform</em></h2>
            <p>Our solutions are deployed across industries — each configured to the specific workflows, compliance requirements, and user expectations of that sector.</p>
          </div>
          <div className="sol-ind-grid">
            {[
              { icon: 'fa-store',         title: 'Retail & E-commerce',        desc: 'Personalization engines, inventory automation, and omnichannel platforms that drive online revenue.' },
              { icon: 'fa-heartbeat',     title: 'Healthcare & MedTech',       desc: 'HIPAA-compliant patient portals, diagnostic AI tools, and telehealth platforms built to regulatory standard.' },
              { icon: 'fa-landmark',      title: 'Finance & FinTech',          desc: 'Fraud detection models, payment platforms, and regulatory-compliant financial dashboards.' },
              { icon: 'fa-graduation-cap', title: 'Education & EdTech',        desc: "Adaptive learning systems, LMS platforms, and AI tutors that personalize every student's journey." },
              { icon: 'fa-industry',      title: 'Manufacturing & Logistics',  desc: 'Computer vision quality control, supply chain optimization, and IoT data pipelines for operational efficiency.' },
              { icon: 'fa-utensils',      title: 'Hospitality & Food',         desc: 'Reservation systems, delivery optimization platforms, and loyalty apps that increase customer lifetime value.' },
              { icon: 'fa-house-chimney', title: 'Real Estate & PropTech',     desc: 'Listing platforms, AI-powered valuation models, and virtual tour technology for modern property businesses.' },
              { icon: 'fa-bolt',          title: 'Startups & Scale-ups',       desc: 'From MVP to Series B product — we build the technical foundation that investors and users expect.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="sol-ind-card">
                <div className="sol-ind-icon"><i className={`fas ${icon}`}></i></div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. RESULTS ── */}
      <section className="sol-results" id="results">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-chart-line"></i> Proven Outcomes</div>
            <h2>The Numbers That Define<br /><em className="text-orange">Our Track Record</em></h2>
            <p>Results delivered for real businesses — measured in performance improvements, time saved, and revenue generated.</p>
          </div>
          <div className="sol-results-grid">
            {[
              { icon: 'fa-rocket',   val: '10×',   label: 'Faster Time-to-Market',              desc: 'Our agile engineering process cuts average development timelines by 60–80% compared to traditional agencies.',              featured: true  },
              { icon: 'fa-percent',  val: '73%',   label: 'Average Cost Reduction via Automation', desc: 'Businesses that deploy our automation solutions see dramatic reductions in manual operating costs.',                    featured: false },
              { icon: 'fa-signal',   val: '99.9%', label: 'Platform Uptime SLA',                 desc: 'Every production system we deploy meets or exceeds 99.9% uptime through resilient cloud architecture.',                  featured: false },
              { icon: 'fa-users',    val: '150+',  label: 'Successful Deployments',              desc: 'Projects delivered across industries — from single-feature MVPs to full enterprise platform migrations.',                 featured: false },
              { icon: 'fa-star',     val: '4.9★',  label: 'Client Satisfaction Score',           desc: 'Consistently rated near-perfect across technical quality, communication, and delivery reliability.',                    featured: false },
              { icon: 'fa-clock',    val: '8hrs',  label: 'Average Response Time',               desc: 'Our team responds to client queries within one business day — and critical issues within hours.',                       featured: false },
            ].map(({ icon, val, label, desc, featured }) => (
              <div key={label} className={`sol-result-card${featured ? ' sol-result-featured' : ''}`}>
                <div className="sol-result-icon"><i className={`fas ${icon}`}></i></div>
                <div className="sol-result-val">{val}</div>
                <div className="sol-result-label">{label}</div>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CASE STUDIES ── */}
      <section className="sol-cases" id="cases">
        <div className="container">
          <div className="section-head">
            <div className="badge badge-orange"><i className="fas fa-folder-open"></i> Case Studies</div>
            <h2>Solutions We Built.<br /><em className="text-orange">Problems We Solved.</em></h2>
            <p>A look at three real technology projects — the challenge, the approach, and the outcome.</p>
          </div>
          <div className="sol-cases-grid">
            <div className="sol-case-card">
              <div className="sol-case-thumb sol-case-ai-thumb">
                <div className="sol-case-thumb-inner"><i className="fas fa-brain"></i><span>AI Solution</span></div>
              </div>
              <div className="sol-case-body">
                <div className="sol-case-tag">AI + Automation</div>
                <h3>AI-Powered Customer Support Platform</h3>
                <p>A California SaaS company handling 12,000 monthly support tickets replaced 70% of Tier-1 responses with a custom LLM agent trained on their knowledge base — reducing support costs by $180K/year.</p>
                <div className="sol-case-metrics">
                  <div className="sol-case-metric"><span className="sol-case-metric-val">70%</span><span>Tickets Automated</span></div>
                  <div className="sol-case-metric"><span className="sol-case-metric-val">$180K</span><span>Annual Savings</span></div>
                  <div className="sol-case-metric"><span className="sol-case-metric-val">4.8★</span><span>Customer Rating</span></div>
                </div>
              </div>
            </div>
            <div className="sol-case-card">
              <div className="sol-case-thumb sol-case-saas-thumb">
                <div className="sol-case-thumb-inner"><i className="fas fa-laptop-code"></i><span>SaaS Platform</span></div>
              </div>
              <div className="sol-case-body">
                <div className="sol-case-tag">Custom Software</div>
                <h3>Multi-Tenant SaaS Operations Platform</h3>
                <p>Built a full-stack B2B SaaS platform — complete with multi-tenancy, role-based access, Stripe billing integration, and real-time analytics — from zero to production in 14 weeks.</p>
                <div className="sol-case-metrics">
                  <div className="sol-case-metric"><span className="sol-case-metric-val">14 wks</span><span>Zero to Launch</span></div>
                  <div className="sol-case-metric"><span className="sol-case-metric-val">850+</span><span>Active Users</span></div>
                  <div className="sol-case-metric"><span className="sol-case-metric-val">99.97%</span><span>Uptime</span></div>
                </div>
              </div>
            </div>
            <div className="sol-case-card">
              <div className="sol-case-thumb sol-case-data-thumb">
                <div className="sol-case-thumb-inner"><i className="fas fa-chart-column"></i><span>Data Intelligence</span></div>
              </div>
              <div className="sol-case-body">
                <div className="sol-case-tag">Data &amp; Analytics</div>
                <h3>Real-Time Retail Analytics Engine</h3>
                <p>A regional retail chain with 28 locations needed centralized inventory, sales, and customer behavior intelligence. We built a real-time data warehouse and BI dashboard that cut stockouts by 41%.</p>
                <div className="sol-case-metrics">
                  <div className="sol-case-metric"><span className="sol-case-metric-val">41%</span><span>Fewer Stockouts</span></div>
                  <div className="sol-case-metric"><span className="sol-case-metric-val">28</span><span>Locations Unified</span></div>
                  <div className="sol-case-metric"><span className="sol-case-metric-val">3s</span><span>Data Latency</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. FREE CONSULTATION CTA ── */}
      <section className="sol-consult" id="contact">
        <div className="sol-consult-glow"></div>
        <div className="container sol-consult-inner">
          <div className="sol-consult-content">
            <div className="badge badge-white"><i className="fas fa-calendar-check"></i> Free Technology Consultation</div>
            <h2>Your Next Competitive Advantage<br /><em>Starts with a Conversation</em></h2>
            <p>Book a free 30-minute technology strategy session with our engineering team. We&apos;ll assess your current stack, identify the highest-impact opportunities, and outline a realistic path to your goals — with no obligation.</p>
            <div className="sol-consult-benefits">
              {['30-minute strategy call, zero cost', 'Honest technical assessment', 'Rough cost & timeline estimate', 'No sales pitch — real engineering advice'].map(b => (
                <div key={b} className="sol-consult-benefit"><i className="fas fa-check-circle"></i><span>{b}</span></div>
              ))}
            </div>
            <div className="sol-consult-actions">
              <Link href="/contact-us" className="btn btn-primary">Book Your Free Session <i className="fas fa-arrow-right"></i></Link>
              <a href="mailto:sales@calidigi.com" className="btn btn-outline-white">Email Our Team</a>
            </div>
          </div>
          <div className="sol-consult-card">
            <div className="sol-cc-header">
              <div className="sol-cc-avatar"><i className="fas fa-user-tie"></i></div>
              <div>
                <div className="sol-cc-name">Calidigi Engineering</div>
                <div className="sol-cc-role">Technology Solutions Team</div>
              </div>
              <div className="sol-cc-online"><span></span> Available</div>
            </div>
            <div className="sol-cc-body">
              <div className="sol-cc-item"><i className="fas fa-envelope"></i> sales@calidigi.com</div>
              <div className="sol-cc-item"><i className="fas fa-phone"></i> +1 (555) 000-1234</div>
              <div className="sol-cc-item"><i className="fas fa-location-dot"></i> San Francisco, CA</div>
              <div className="sol-cc-item"><i className="fas fa-clock"></i> Response within 8 hours</div>
            </div>
            <div className="sol-cc-tags">
              <span><i className="fas fa-shield-halved"></i> NDA Available</span>
              <span><i className="fas fa-lock"></i> Confidential</span>
              <span><i className="fas fa-star"></i> 4.9★ Rated</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
