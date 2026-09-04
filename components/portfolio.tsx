"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  Code2,
  Database,
  Download,
  Mail,
  Menu,
  Microscope,
  MoveRight,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const journey = [
  {
    period: "2026 — NOW",
    company: "EY",
    role: "Data Scientist · AI & Data",
    location: "Chicago",
    copy: "Building at the intersection of enterprise scale, applied AI, and rigorous data science.",
    tone: "cyan",
  },
  {
    period: "SUMMER 2025",
    company: "Aetna · CVS Health",
    role: "Machine Learning Graduate Intern",
    location: "Boston",
    copy: "Improved a hospital readmission model and engineered a cloud pipeline for clinical notes spanning more than 10 million patients.",
    tone: "orange",
  },
  {
    period: "2023 — 2025",
    company: "Michigan Medicine",
    role: "Machine Learning Research Assistant",
    location: "Ann Arbor",
    copy: "Developed computer vision methods for traumatic brain injury research and led first-author work on automated optic nerve measurement.",
    tone: "violet",
  },
  {
    period: "SUMMER 2024",
    company: "Flatiron Health",
    role: "Machine Learning Engineer Intern",
    location: "New York",
    copy: "Built an LLM-powered clinical document service and a human-in-the-loop framework on AWS, reaching 95% categorization accuracy.",
    tone: "lime",
  },
];

const work = [
  {
    number: "01",
    title: "The Dialectic",
    subtitle: "Multi-agent LLM debate system",
    description: "A real-time framework where Speaker, Challenger, and Judge agents pressure-test ideas through counter-example-guided debate.",
    tags: ["Python", "Next.js", "LLM agents"],
    accent: "#6ef3d6",
  },
  {
    number: "02",
    title: "Clinical Intelligence",
    subtitle: "Document categorization at scale",
    description: "An active-learning system combining language models, clustering, and human review to turn complex clinical text into reliable signal.",
    tags: ["LLMs", "AWS", "Active learning"],
    accent: "#ff6b45",
  },
  {
    number: "03",
    title: "Decision Systems",
    subtitle: "Risk prediction from patient notes",
    description: "A GCP-native inference pipeline that transformed unstructured notes into predictive features and made large-scale processing 42× faster.",
    tags: ["Vertex AI", "XGBoost", "BigQuery"],
    accent: "#a98cff",
  },
];

const capabilities = [
  { icon: BrainCircuit, title: "Applied AI", copy: "LLM systems, machine learning, active learning, and evaluation built for real operational constraints." },
  { icon: Microscope, title: "Scientific rigor", copy: "Bioinformatics and statistical training that keeps evidence, uncertainty, and reproducibility in view." },
  { icon: Database, title: "Production data", copy: "Cloud-native pipelines across GCP and AWS, designed to move from prototype to dependable scale." },
  { icon: Code2, title: "Product craft", copy: "Technical systems translated into clear, human-centered interfaces that people can actually use." },
];

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <nav className={`nav${scrolled ? " nav-scrolled" : ""}`} aria-label="Primary navigation">
        <a className="wordmark" href="#top" onClick={closeMenu}>
          <span className="wordmark-box">CG</span>
          <span>CHRISTINE GENG</span>
        </a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className={`nav-links${menuOpen ? " is-open" : ""}`}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#journey" onClick={closeMenu}>Journey</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a className="nav-contact" href="mailto:cgeng@umich.edu" onClick={closeMenu}>Let&apos;s talk <ArrowUpRight size={15} /></a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb orb-one" aria-hidden="true" />
        <div className="hero-orb orb-two" aria-hidden="true" />
        <div className="hero-copy">
          <div className="availability"><span /> AI & Data · Chicago</div>
          <h1>Building intelligence for <em>high-stakes</em> decisions.</h1>
          <p className="hero-lede">I&apos;m Christine Geng, a data scientist turning complex data into AI systems that are rigorous, scalable, and deeply human.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore selected work <ArrowDownRight size={18} /></a>
            <a className="button button-ghost" href="/Christine_Geng_resume.pdf" download>Résumé <Download size={17} /></a>
          </div>
        </div>

        <div className="signal-panel" aria-label="Selected career impact">
          <div className="panel-header">
            <span>SIGNAL / 001</span>
            <span className="live-label"><i /> LIVE PROFILE</span>
          </div>
          <div className="signal-visual" aria-hidden="true">
            <div className="orbit orbit-one"><span /></div>
            <div className="orbit orbit-two"><span /></div>
            <div className="core">CG</div>
          </div>
          <div className="metrics">
            <div><strong>42×</strong><span>faster inference</span></div>
            <div><strong>10M+</strong><span>patient scale</span></div>
            <div><strong>95%</strong><span>model accuracy</span></div>
          </div>
          <div className="panel-footer"><span>ML SYSTEMS</span><span>CLINICAL AI</span><span>DATA PRODUCTS</span></div>
        </div>

        <a className="scroll-cue" href="#about"><span>Scroll to explore</span><ArrowDownRight size={17} /></a>
      </section>

      <section className="about section" id="about">
        <div className="section-kicker"><span>01</span> About</div>
        <div className="about-layout">
          <h2>Technical depth.<br /><span>Human context.</span></h2>
          <div className="about-copy">
            <p className="large-copy">I work where statistical thinking, software engineering, and real-world consequence meet.</p>
            <p>With a background in data science and bioinformatics from the University of Michigan, I&apos;ve built machine learning systems across healthcare, research, and enterprise environments. I care about the full arc: asking the right question, creating trustworthy signal, and shipping something people can use.</p>
            <div className="degree-row">
              <div><span>2026</span><strong>M.S. Bioinformatics</strong><small>University of Michigan · 4.0 GPA</small></div>
              <div><span>2025</span><strong>B.S. Statistics & Data Science</strong><small>University of Michigan · LSA Honors</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="capabilities section" aria-labelledby="capabilities-title">
        <div className="section-kicker light"><span>02</span> Approach</div>
        <div className="capabilities-head">
          <h2 id="capabilities-title">From ambiguity<br />to <em>signal.</em></h2>
          <p>I bring research fluency and product instincts to problems that demand both.</p>
        </div>
        <div className="capability-grid">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <article className="capability-card" key={item.title}>
                <div className="capability-top"><Icon size={22} /><span>0{index + 1}</span></div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="journey section" id="journey">
        <div className="section-kicker"><span>03</span> Career journey</div>
        <div className="journey-heading">
          <h2>Built across<br /><span>disciplines.</span></h2>
          <p>Healthcare, research, and enterprise — one throughline: making sophisticated systems useful in the real world.</p>
        </div>
        <div className="timeline">
          {journey.map((item) => (
            <article className="timeline-item" key={item.company}>
              <div className="timeline-marker"><span className={`tone-${item.tone}`} /></div>
              <div className="timeline-period">{item.period}</div>
              <div className="timeline-role">
                <h3>{item.company}</h3>
                <p>{item.role}</p>
              </div>
              <p className="timeline-copy">{item.copy}</p>
              <div className="timeline-location">{item.location}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="work section" id="work">
        <div className="section-kicker light"><span>04</span> Selected work</div>
        <div className="work-heading">
          <h2>Proof, not<br /><em>promises.</em></h2>
          <div><p>Case studies are being shaped for public release. Here&apos;s the signal in the meantime.</p><span className="coming-soon"><Sparkles size={14} /> Portfolio expanding soon</span></div>
        </div>
        <div className="work-list">
          {work.map((project) => (
            <article className="work-card" key={project.number} style={{ "--project-accent": project.accent } as React.CSSProperties}>
              <div className="project-number">{project.number}</div>
              <div className="project-main">
                <span>{project.subtitle}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="project-arrow"><ArrowUpRight size={24} /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="community section">
        <div className="community-card">
          <div className="community-index">05 / BEYOND THE MODEL</div>
          <div>
            <h2>Building the field I want to work in.</h2>
            <p>As an executive board member and capstone mentor with Girls Who Code, I taught Python and guided students through data-driven research — helping more people see themselves as builders.</p>
          </div>
          <div className="community-badge"><Check size={19} /><span>MENTORSHIP<br />& ACCESS</span></div>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-stamp" aria-hidden="true"><span>CG</span></div>
        <div className="contact-copy">
          <span className="contact-eyebrow">AVAILABLE FOR THE RIGHT CONVERSATION</span>
          <h2>Let&apos;s build what&apos;s <em>next.</em></h2>
          <p>Interested in ambitious AI, data products, or the future of intelligent systems? I&apos;d love to hear from you.</p>
          <a className="contact-link" href="mailto:cgeng@umich.edu">cgeng@umich.edu <MoveRight size={28} /></a>
        </div>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/cgeng" target="_blank" rel="noreferrer"><span className="linkedin-glyph">in</span> LinkedIn <ArrowUpRight size={15} /></a>
          <a href="mailto:cgeng@umich.edu"><Mail size={17} /> Email <ArrowUpRight size={15} /></a>
          <a href="/Christine_Geng_resume.pdf" download><Download size={17} /> Résumé <ArrowUpRight size={15} /></a>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span className="wordmark-box">CG</span><span>AI WITH CONSEQUENCE.</span></div>
        <p>© 2026 Christine Geng</p>
        <a href="#top">Back to top <ArrowUpRight size={14} /></a>
      </footer>
    </main>
  );
}
