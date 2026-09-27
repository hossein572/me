import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpLeft,
  Check,
  CheckCheck,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Figma,
  Github,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Monitor,
  MousePointer2,
  Palette,
  Server,
  Sparkles,
  Terminal,
  X,
  Zap,
} from 'lucide-react'
import { profile, projects } from './data'
import type { Project } from './data'

const ProjectDialog = lazy(() => import('./components/ProjectDialog'))
const navItems = [
  { id: 'home', label: 'خانه' },
  { id: 'projects', label: 'پروژه‌ها' },
  { id: 'skills', label: 'مهارت‌ها' },
  { id: 'about', label: 'درباره من' },
]
const categories = [
  { id: 'all', label: 'همه پروژه‌ها', count: '۰۳' },
  { id: 'web', label: 'وب‌سایت' },
  { id: 'dashboard', label: 'داشبورد' },
  { id: 'app', label: 'اپلیکیشن' },
]

function ReactMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-12 -11 24 22" fill="none" aria-hidden="true">
      <circle r="2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1">
        <ellipse rx="11" ry="4.3" />
        <ellipse rx="11" ry="4.3" transform="rotate(60)" />
        <ellipse rx="11" ry="4.3" transform="rotate(120)" />
      </g>
    </svg>
  )
}

function HeroArtwork() {
  return (
    <div className="hero-art" aria-label="تصویرسازی سبک از طراحی رابط کاربری و کدنویسی" role="img">
      <div className="art-circle circle-one" />
      <div className="art-circle circle-two" />
      <span className="art-plus plus-one">+</span>
      <span className="art-plus plus-two">+</span>
      <span className="art-dot" />
      <div className="design-window" dir="ltr">
        <div className="window-bar">
          <span />
          <span />
          <span />
          <span className="window-title">a little idea. a great experience.</span>
          <span className="window-dots">•••</span>
        </div>
        <div className="design-canvas">
          <div className="canvas-nav">
            <span className="canvas-logo">
              a<span>•</span>
            </span>
            <span className="canvas-nav-lines">
              <i />
              <i />
              <i />
            </span>
            <span className="canvas-menu">↗</span>
          </div>
          <div className="canvas-grid">
            <div className="canvas-copy">
              <span className="canvas-eyebrow">DESIGNED TO MAKE A DIFFERENCE</span>
              <strong>
                Less, but
                <br />
                <span>better.</span>
              </strong>
              <p>
                Good design is invisible.
                <br />
                Great experiences are unforgettable.
              </p>
              <span className="canvas-cta">
                Explore the possibilities <ArrowUpLeft size={10} />
              </span>
            </div>
            <div className="sculpture">
              <div className="sculpture-ring ring-back" />
              <div className="sculpture-ring ring-front" />
              <div className="sculpture-shadow" />
            </div>
          </div>
          <div className="canvas-bottom">
            <span>DESIGN WITH PURPOSE</span>
            <span>
              01 — 03 <ArrowLeft size={10} />
            </span>
          </div>
        </div>
      </div>
      <div className="floating-tool figma-tool">
        <Figma size={31} strokeWidth={1.9} />
      </div>
      <div className="floating-tool react-tool">
        <ReactMark size={35} />
      </div>
      <div className="code-window" dir="ltr">
        <div className="code-bar">
          <span className="code-file">
            <span className="code-file-dot" /> portfolio.tsx
          </span>
          <span className="code-language">TSX</span>
        </div>
        <div className="code-body">
          <div>
            <span className="line-number">1</span>
            <span className="code-purple">const</span> developer = {'{'}
          </div>
          <div>
            <span className="line-number">2</span>
            <span className="code-key">name:</span>{' '}
            <span className="code-green">'Hossein Rezaei'</span>,
          </div>
          <div>
            <span className="line-number">3</span>
            <span className="code-key">focus:</span>{' '}
            <span className="code-green">'details & experience'</span>,
          </div>
          <div>
            <span className="line-number">4</span>
            <span className="code-key">passion:</span> <span className="code-blue">Infinity</span>
          </div>
          <div>
            <span className="line-number">5</span>
            {'};'}
            <span className="code-caret" />
          </div>
        </div>
      </div>
      <div className="art-cursor">
        <MousePointer2 size={24} fill="currentColor" />
        <span>خلاقیت، در هر جزئیات</span>
      </div>
      <div className="art-caption">
        <span className="caption-line" />
        جایی که طراحی و کد به هم می‌رسند
        <span className="caption-line" />
      </div>
    </div>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('')
  const [copied, setCopied] = useState(false)
  const [draft, setDraft] = useState('')
  const [mailUrl, setMailUrl] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()
    if (!name || !email || !message) {
      setStatus('لطفاً نام، ایمیل و متن پیام را کامل کنید. وارد کردن فاصله کافی نیست.')
      return
    }
    const body = `سلام حسین،\n\n${message}\n\nنام: ${name}\nایمیل: ${email}`
    const url = `mailto:${profile.email}?subject=${encodeURIComponent(`درخواست همکاری از ${name}`)}&body=${encodeURIComponent(body)}`
    setDraft(body)
    setMailUrl(url)
    setCopied(false)
    setStatus(
      'پیش‌نویس آماده شد؛ برای ارسال نهایی، آن را در برنامهٔ ایمیل باز کنید. این فرم پیام را روی سرور ذخیره یا ارسال نمی‌کند.',
    )
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft)
      setCopied(true)
    } catch {
      setStatus(
        'کپی خودکار در این مرورگر در دسترس نیست. متن آماده را از کادر زیر انتخاب و کپی کنید.',
      )
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={submit}
      onChange={() => {
        setStatus('')
        setDraft('')
        setMailUrl('')
        setCopied(false)
      }}
    >
      <div className="form-heading">
        <span>بیایید با یک سلام شروع کنیم</span>
        <span className="form-spark">
          <Sparkles size={20} />
        </span>
      </div>
      <div className="form-row">
        <label htmlFor="name">
          نام شما
          <input
            id="name"
            name="name"
            placeholder="چطور صداتون کنم؟"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
          />
        </label>
        <label htmlFor="email">
          ایمیل شما
          <input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            placeholder="you@example.com"
            autoComplete="email"
            required
            maxLength={160}
          />
        </label>
      </div>
      <label htmlFor="message">
        کمی از ایده‌تون بگید
        <textarea
          id="message"
          name="message"
          placeholder="دوست دارید با هم چه چیزی بسازیم؟"
          rows={4}
          required
          minLength={10}
          maxLength={2000}
        />
      </label>
      <div className="form-bottom">
        <button type="submit" className="button button-primary">
          آماده‌سازی پیام
          <ArrowUpLeft size={20} />
        </button>
        <span>
          <CheckCheck size={16} />
          اطلاعات شما اینجا ذخیره نمی‌شود.
        </span>
      </div>
      {status && (
        <div className="form-result" role="status">
          <p>{status}</p>
          {draft && (
            <>
              <textarea aria-label="متن آمادهٔ ایمیل" readOnly value={draft} rows={5} />
              <div className="draft-actions">
                <a className="button button-primary" href={mailUrl}>
                  باز کردن ایمیل
                  <ExternalLink size={17} />
                </a>
                <button className="button button-secondary" type="button" onClick={copyDraft}>
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? 'متن کپی شد' : 'کپی متن'}
                </button>
              </div>
            </>
          )}
        </div>
      )}
      <p className="form-footnote">
        نسخهٔ نمایشی · پیش از انتشار، آدرس ایمیل نمونه را جایگزین کنید.
      </p>
    </form>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [filter, setFilter] = useState('all')
  const [project, setProject] = useState<Project | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const filteredProjects =
    filter === 'all' ? projects : projects.filter((item) => item.category === filter)

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    )
      return
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )
    revealElements.forEach((element) => {
      element.classList.add('will-reveal')
      revealObserver.observe(element)
    })
    return () => revealObserver.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -60% 0px', threshold: 0 },
    )
    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    function handleOutside(event: MouseEvent) {
      if (!(event.target as Element).closest('.site-header')) setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('pointerdown', handleOutside)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('pointerdown', handleOutside)
    }
  }, [menuOpen])

  return (
    <>
      <a className="skip-link" href="#main">
        رفتن به محتوای اصلی
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="brand"
            href="#home"
            title="بازگشت به خانه"
            onClick={() => setMenuOpen(false)}
          >
            <span className="brand-icon">
              <Code2 size={24} strokeWidth={2.4} />
            </span>
            <span className="brand-text">
              حسین<span className="brand-period">.</span>
              <small>طراح و توسعه‌دهنده</small>
            </span>
          </a>
          <nav
            className={`main-nav ${menuOpen ? 'is-open' : ''}`}
            id="main-navigation"
            aria-label="منوی اصلی"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                aria-current={activeSection === item.id ? 'location' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a className="mobile-contact" href="#contact" onClick={() => setMenuOpen(false)}>
              ارتباط با من
              <ArrowUpLeft size={18} />
            </a>
          </nav>
          <a href="#contact" className="header-cta">
            بیایید صحبت کنیم
            <ArrowUpLeft size={18} />
          </a>
          <button
            ref={menuButtonRef}
            className="menu-toggle icon-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="availability">
                <span className="status-dot" />
                آماده برای همکاری‌های تازه
              </div>
              <h1>
                طراحی و توسعه
                <br />
                <span>تجربه‌های دیجیتال</span>
                <br />
                مدرن<span className="heading-dot">.</span>
              </h1>
              <p className="hero-description">
                سلام، من <strong>حسین رضایی</strong> هستم؛ توسعه‌دهنده و طراح.
                <br className="desktop-break" /> ایده‌ها را به تجربه‌هایی زیبا، سریع و کاربردی تبدیل
                می‌کنم.
                <br className="desktop-break" /> با دقت در جزئیات، برای آدم‌ها؛ نه فقط
                صفحه‌نمایش‌ها.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="button button-primary">
                  مشاهده پروژه‌ها
                  <ArrowUpLeft size={21} />
                </a>
                <a href="#contact" className="button button-secondary">
                  ارتباط با من
                  <ArrowLeft size={19} />
                </a>
              </div>
              <div className="hero-note">
                <span className="tiny-avatars">
                  <span>ا</span>
                  <span>م</span>
                  <span>س</span>
                </span>
                <span>
                  <span className="note-stars">✦ ✦ ✦ ✦ ✦</span>
                  <span>ساخته‌شده با دقت، تحویل‌شده با افتخار</span>
                </span>
              </div>
            </div>
            <HeroArtwork />
          </div>
          <div className="container hero-bottom">
            <span className="hero-location">
              <MapPin size={15} />
              ساکن تهران، همکار از هر کجا
            </span>
            <a href="#projects" className="scroll-cue">
              کمی پایین‌تر، بیشتر آشنا شویم
              <ArrowDown size={15} />
            </a>
            <span className="hero-index" dir="ltr">
              DESIGN. CODE. CREATE.
            </span>
          </div>
        </section>

        <div className="tech-strip">
          <div className="container tech-inner">
            <span className="tech-intro">
              ابزارهایی برای
              <br />
              <strong>ساختن ایده‌های بهتر</strong>
            </span>
            <div className="tech-logos" dir="ltr">
              <span>
                <ReactMark />
                React
              </span>
              <span className="next-logo">
                <i>N</i>Next.js
              </span>
              <span>
                <span className="ts-logo">TS</span>TypeScript
              </span>
              <span>
                <Figma size={25} />
                Figma
              </span>
              <span>
                <svg
                  viewBox="0 0 32 24"
                  width="31"
                  height="24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M16 3C9.6 3 8 7.3 8 9.4c2.1-2.8 4.5-3.9 7.2-2.7 1.5.6 2.5 2.2 4.2 3.1 3.3 1.9 8.6 1.4 12.6-5-2.1 2.8-4.5 3.9-7.2 2.7C23.3 6.9 22.3 3 16 3ZM8 12C1.6 12 0 16.3 0 18.4c2.1-2.8 4.5-3.9 7.2-2.7 1.5.6 2.5 2.2 4.2 3.1 3.3 1.9 8.6 1.4 12.6-5-2.1 2.8-4.5 3.9-7.2 2.7C15.3 15.9 14.3 12 8 12Z" />
                </svg>
                Tailwind CSS
              </span>
              <span>
                <Github size={25} />
                GitHub
              </span>
            </div>
          </div>
        </div>

        <section className="projects-section section-space" id="projects">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <div className="eyebrow">
                  <span className="eyebrow-dash" />
                  از ایده تا تجربه
                </div>
                <h2>
                  چند کار، از دنیای من<span className="heading-dot">.</span>
                </h2>
                <p>ترکیبی از تفکر، طراحی و کد؛ با یک هدف: تجربه‌ای بهتر.</p>
              </div>
              <a className="text-link" href="#contact">
                پروژهٔ بعدی، شاید ایدهٔ شما
                <ArrowUpLeft size={19} />
              </a>
            </div>
            <div className="project-toolbar">
              <div className="project-filters" role="group" aria-label="فیلتر پروژه‌ها">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={filter === category.id ? 'selected' : ''}
                    aria-pressed={filter === category.id}
                    onClick={() => setFilter(category.id)}
                  >
                    {category.label}
                    {category.count && <span>{category.count}</span>}
                  </button>
                ))}
              </div>
              <span className="projects-caption">
                منتخب پروژه‌ها <span>/ ۱۴۰۳ — ۱۴۰۴</span>
              </span>
            </div>
            <div className="project-grid" aria-live="polite">
              {filteredProjects.map((item) => (
                <article className="project-card" key={item.id}>
                  <button
                    className="project-image-button"
                    onClick={() => setProject(item)}
                    aria-label={`مشاهده پروژه ${item.title}`}
                  >
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      width="900"
                      height="640"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="image-arrow">
                      <ArrowUpLeft size={23} />
                    </span>
                    <span className="project-image-label">{item.label}</span>
                  </button>
                  <div className="project-content">
                    <div className="project-title-row">
                      <h3>
                        <button onClick={() => setProject(item)}>{item.title}</button>
                      </h3>
                      <span>{item.number}</span>
                    </div>
                    <p>{item.description}</p>
                    <div className="project-card-bottom">
                      <div className="tags" dir="ltr">
                        {item.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <button
                        className="project-open"
                        onClick={() => setProject(item)}
                        aria-label={`جزئیات پروژه ${item.title}`}
                      >
                        <ArrowUpLeft size={20} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="project-footnote">
              <span className="small-dot" />
              هر پروژه، فرصتی برای بهتر ساختن و بیشتر یاد گرفتن است.
            </div>
          </div>
        </section>

        <section className="skills-section section-space" id="skills">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <div className="eyebrow">
                  <span className="eyebrow-dash" />
                  جعبه‌ابزار من
                </div>
                <h2>
                  از پیکسل تا زیرساخت<span className="heading-dot">.</span>
                </h2>
                <p>مهارت‌هایی که ایده‌ها را به محصولی واقعی تبدیل می‌کنند.</p>
              </div>
              <span className="section-side-note">
                <Layers3 size={18} />
                یادگیری، بخشی از هر روز من است
              </span>
            </div>
            <div className="skills-grid" data-reveal>
              {[
                {
                  title: 'Frontend',
                  label: 'تجربه‌ای که دیده می‌شود',
                  icon: Monitor,
                  className: 'blue',
                  description: 'رابط‌های سریع، واکنش‌گرا و دسترس‌پذیر؛ با کدی تمیز و قابل نگهداری.',
                  skills: ['React & Next.js', 'TypeScript', 'Tailwind CSS'],
                },
                {
                  title: 'Backend',
                  label: 'منطق پشت هر تجربه',
                  icon: Server,
                  className: 'purple',
                  description: 'ساخت سرویس‌های قابل اتکا و ارتباطی روان بین داده و رابط کاربری.',
                  skills: ['Node.js', 'REST API', 'PostgreSQL'],
                },
                {
                  title: 'UI / UX',
                  label: 'طراحی با نگاه انسانی',
                  icon: Palette,
                  className: 'orange',
                  description: 'حل مسئله با طراحی؛ از شناخت کاربر تا آخرین جزئیات یک کامپوننت.',
                  skills: ['Figma', 'Design Systems', 'Prototyping'],
                },
                {
                  title: 'DevOps',
                  label: 'از توسعه تا انتشار',
                  icon: Terminal,
                  className: 'green',
                  description: 'فرایند توسعه منظم و انتشار مطمئن، برای محصولی همیشه در دسترس.',
                  skills: ['Git & GitHub', 'Docker', 'CI / CD'],
                },
              ].map((skill) => (
                <article className="skill-card" key={skill.title}>
                  <div className="skill-top">
                    <span className={`skill-icon ${skill.className}`}>
                      <skill.icon size={24} />
                    </span>
                    <span className="skill-corner">↗</span>
                  </div>
                  <h3 dir="ltr">{skill.title}</h3>
                  <span className="skill-label">{skill.label}</span>
                  <p>{skill.description}</p>
                  <ul dir="ltr">
                    {skill.skills.map((item) => (
                      <li key={item}>
                        <span />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section section-space" id="about">
          <div className="container about-grid">
            <div className="about-visual" data-reveal>
              <div className="about-pattern" />
              <div className="about-stamp" dir="ltr">
                <span>CRAFTED WITH CARE</span>
                <Sparkles size={24} />
                <span>BUILT WITH PURPOSE</span>
              </div>
              <div className="about-terminal" dir="ltr">
                <div className="about-terminal-header">
                  <span className="terminal-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>about-me.json</span>
                  <Code2 size={16} />
                </div>
                <div className="about-code">
                  <span className="muted-code">{'{'}</span>
                  <p>
                    <span>"name"</span>: <b>"Hossein Rezaei"</b>,
                  </p>
                  <p>
                    <span>"role"</span>: <b>"Creative Developer"</b>,
                  </p>
                  <p>
                    <span>"location"</span>: <b>"Tehran, Iran"</b>,
                  </p>
                  <p>
                    <span>"mindset"</span>: [
                  </p>
                  <p className="indented">
                    <b>"Keep it simple"</b>,
                  </p>
                  <p className="indented">
                    <b>"Make it meaningful"</b>,
                  </p>
                  <p className="indented">
                    <b>"Never stop learning"</b>
                  </p>
                  <p>],</p>
                  <p>
                    <span>"coffee"</span>: <em>true</em>
                  </p>
                  <span className="muted-code">{'}'}</span>
                </div>
              </div>
              <div className="about-note">
                <span>
                  <Zap size={18} />
                </span>
                کد تمیز. طراحی دقیق. حس خوب.
              </div>
            </div>
            <div className="about-content" data-reveal>
              <div className="eyebrow">
                <span className="eyebrow-dash" />
                کمی نزدیک‌تر
              </div>
              <h2>
                فراتر از کد،
                <br />
                به تجربه فکر می‌کنم<span className="heading-dot">.</span>
              </h2>
              <p>
                من حسینم؛ یک توسعه‌دهنده با ذهن طراح. به نظرم بهترین محصولات، جایی ساخته می‌شوند که
                منطق کدنویسی با ظرافت طراحی همراه می‌شود.
              </p>
              <p>
                از پیدا کردن راه‌حل‌های ساده برای مسئله‌های پیچیده لذت می‌برم. برای من، یک پروژه
                وقتی تمام می‌شود که هم خوب کار کند و هم استفاده از آن حس خوبی داشته باشد.
              </p>
              <div className="about-values">
                <span>
                  <Check size={17} />
                  توجه واقعی به جزئیات
                </span>
                <span>
                  <Check size={17} />
                  ارتباط شفاف و مسئولانه
                </span>
                <span>
                  <Check size={17} />
                  کیفیت، قبل از کمیت
                </span>
                <span>
                  <Check size={17} />
                  همیشه در حال یادگیری
                </span>
              </div>
              <a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary resume-button"
              >
                مشاهده و دریافت رزومه
                <Download size={18} />
              </a>
              <span className="resume-note">یک معرفی کوتاه‌تر، برای همراه داشتن</span>
            </div>
          </div>
        </section>

        <section className="contact-section section-space" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy" data-reveal>
              <div className="eyebrow">
                <span className="eyebrow-dash" />
                شروع یک اتفاق خوب
              </div>
              <h2>
                ایده‌ای در ذهن دارید؟
                <br />
                <span>بیایید واقعی‌اش کنیم.</span>
              </h2>
              <p>
                برای ساخت یک محصول تازه، بهتر کردن تجربهٔ فعلی،
                <br className="desktop-break" /> یا حتی یک گفت‌وگوی دوستانه، خوشحال می‌شوم از شما
                بشنوم.
              </p>
              <a className="contact-email" href={`mailto:${profile.email}`}>
                <span className="email-icon">
                  <Mail size={21} />
                </span>
                <span>
                  <small>مستقیم برایم بنویسید</small>
                  <strong dir="ltr">{profile.email}</strong>
                </span>
                <ArrowUpLeft size={21} />
              </a>
              <div className="contact-status">
                <span className="status-dot" />
                آمادهٔ همکاری به‌صورت پروژه‌ای و ریموت
              </div>
              <div className="contact-decoration" aria-hidden="true">
                <span>let’s build</span>
                <strong>
                  something great<span>↗</span>
                </strong>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <a className="brand footer-brand" href="#home">
            <span className="brand-icon">
              <Code2 size={22} />
            </span>
            <span className="brand-text">
              حسین<span className="brand-period">.</span>
            </span>
          </a>
          <p>با فکر طراحی شد. با علاقه ساخته شد.</p>
          <a href="#home" className="back-top">
            بازگشت به بالا
            <ArrowUpLeft size={19} />
          </a>
        </div>
        <div className="container footer-bottom">
          <span>© ۱۴۰۵ حسین رضایی · پورتفولیوی نمونه</span>
          <span>
            کمتر، اما بهتر.
            <span className="footer-blue-dot" />
          </span>
        </div>
      </footer>
      <Suspense
        fallback={
          project ? (
            <div className="dialog-loading" role="status">
              در حال آماده‌سازی جزئیات…
              <button className="button button-secondary" onClick={() => setProject(null)}>
                انصراف
              </button>
            </div>
          ) : null
        }
      >
        {project && <ProjectDialog project={project} onClose={() => setProject(null)} />}
      </Suspense>
    </>
  )
}
