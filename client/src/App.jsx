import { useEffect, useMemo, useState } from 'react'
import {
  brand,
  doctor,
  featuredServices,
  journalEntries,
  navItems,
  processSteps,
  servicePages,
  serviceSections,
  stats,
  testimonials,
  trustPoints,
  whyReviva,
} from './data/siteContent'

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const route = useMemo(() => resolveRoute(path), [path])

  const navigate = (nextPath) => {
    if (nextPath === path) {
      setMenuOpen(false)
      return
    }

    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f7f2eb_0%,#efe6d8_48%,#ded1bf_100%)] text-[color:var(--ink)]">
      <SiteChrome
        path={path}
        route={route}
        menuOpen={menuOpen}
        onNavigate={navigate}
        onToggleMenu={() => setMenuOpen((value) => !value)}
      />
      <main>{renderRoute(route, navigate)}</main>
      <SiteFooter onNavigate={navigate} />
    </div>
  )
}

function resolveRoute(path) {
  if (!path || path === '/') return { type: 'home' }
  if (path === '/about') return { type: 'about' }
  if (path === '/services') return { type: 'services' }

  const match = path.match(/^\/services\/([^/]+)(?:\/([^/]+))?$/)
  if (match) {
    return {
      type: match[2] ? 'service-subpage' : 'service',
      slug: match[1],
      subslug: match[2] || null,
    }
  }

  return { type: 'not-found' }
}

function renderRoute(route, onNavigate) {
  switch (route.type) {
    case 'home':
      return <HomePage onNavigate={onNavigate} />
    case 'about':
      return <AboutPage onNavigate={onNavigate} />
    case 'services':
      return <ServicesIndexPage onNavigate={onNavigate} />
    case 'service':
      return <ServicePage slug={route.slug} onNavigate={onNavigate} />
    case 'service-subpage':
      return <ServiceSubpagePage slug={route.slug} subslug={route.subslug} onNavigate={onNavigate} />
    default:
      return <NotFoundPage onNavigate={onNavigate} />
  }
}

function SiteChrome({ path, route, menuOpen, onNavigate, onToggleMenu }) {
  const servicesActive = path === '/services' || path.startsWith('/services/')

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[rgba(255,255,255,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button className="group flex items-center gap-3 text-left" onClick={() => onNavigate('/')} type="button">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--gold),var(--peru))] text-base font-bold text-[color:var(--ink-strong)] shadow-[0_10px_30px_rgba(87,61,16,0.25)]">
            R
          </span>
          <span className="leading-tight">
            <span className="block text-[11px] uppercase tracking-[0.35em] text-[color:var(--muted)]">
              {brand.tagline}
            </span>
            <span className="block text-sm font-semibold text-[color:var(--ink-strong)] sm:text-base">
              {brand.name}
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              isActive={path === item.href || (item.href === '/services' && servicesActive)}
              onNavigate={onNavigate}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a className="text-sm font-medium text-[color:var(--ink)]" href={`tel:${brand.phoneGhaziabad.replace(/\s/g, '')}`}>
            Ghaziabad
          </a>
          <a
            className="rounded-full border border-[color:var(--border-strong)] px-4 py-2 text-sm font-semibold text-[color:var(--ink-strong)] transition hover:border-[color:var(--gold)] hover:bg-[color:var(--gold-soft)]"
            href={brand.whatsapp}
            rel="noreferrer"
            target="_blank"
          >
            WhatsApp
          </a>
          <button
            className="rounded-full bg-[color:var(--ink-strong)] px-4 py-2 text-sm font-semibold text-[color:var(--cream)] transition hover:bg-[color:var(--olive)]"
            onClick={() => onNavigate('/services')}
            type="button"
          >
            Explore services
          </button>
        </div>

        <button
          className="grid h-11 w-11 place-items-center rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--surface)] lg:hidden"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={onToggleMenu}
          type="button"
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full rounded-full bg-[color:var(--ink-strong)] transition ${
                menuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-[color:var(--ink-strong)] transition ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-full rounded-full bg-[color:var(--ink-strong)] transition ${
                menuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4 shadow-[0_20px_60px_rgba(44,44,53,0.12)] lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-3">
            {navItems.map((item) => (
              <MobileNavItem key={item.label} item={item} onNavigate={onNavigate} />
            ))}
            <div className="grid gap-2 rounded-[1.5rem] bg-[color:var(--cream-soft)] p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">Contact</p>
              <a href={`tel:${brand.phoneGhaziabad.replace(/\s/g, '')}`} className="font-medium text-[color:var(--ink-strong)]">
                Ghaziabad {brand.phoneGhaziabad}
              </a>
              <a href={`tel:${brand.phoneNoida.replace(/\s/g, '')}`} className="font-medium text-[color:var(--ink-strong)]">
                Noida {brand.phoneNoida}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}

function NavItem({ item, isActive, onNavigate }) {
  if (!item.children) {
    return (
      <button
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          isActive ? 'bg-[color:var(--gold-soft)] text-[color:var(--ink-strong)]' : 'text-[color:var(--ink)] hover:bg-[color:var(--cream-soft)]'
        }`}
        onClick={() => onNavigate(item.href)}
        type="button"
      >
        {item.label}
      </button>
    )
  }

  return (
    <div className="group relative">
      <button
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
          isActive ? 'bg-[color:var(--gold-soft)] text-[color:var(--ink-strong)]' : 'text-[color:var(--ink)] hover:bg-[color:var(--cream-soft)]'
        }`}
        onClick={() => onNavigate(item.href)}
        type="button"
      >
        {item.label}
        <span aria-hidden="true">v</span>
      </button>
      <div className="invisible absolute left-0 top-full w-[20rem] translate-y-3 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
        <div className="mt-3 rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-3 shadow-[0_20px_60px_rgba(44,44,53,0.14)]">
          {item.children.map((child) => (
            <button
              key={child.label}
              className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm text-[color:var(--ink)] transition hover:bg-[color:var(--cream-soft)]"
              onClick={() => onNavigate(child.href)}
              type="button"
            >
              <span>{child.label}</span>
              <span className="text-[color:var(--muted)]">-&gt;</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileNavItem({ item, onNavigate }) {
  if (!item.children) {
    return (
      <button
        className="flex items-center justify-between rounded-[1.2rem] bg-[color:var(--cream-soft)] px-4 py-4 text-left font-medium text-[color:var(--ink-strong)]"
        onClick={() => onNavigate(item.href)}
        type="button"
      >
        <span>{item.label}</span>
        <span>-&gt;</span>
      </button>
    )
  }

  return (
    <details className="group rounded-[1.2rem] bg-[color:var(--cream-soft)] px-4 py-3">
      <summary className="cursor-pointer list-none py-1 font-medium text-[color:var(--ink-strong)]">
        <div className="flex items-center justify-between">
          <span>{item.label}</span>
          <span className="text-[color:var(--muted)] transition group-open:rotate-180">v</span>
        </div>
      </summary>
      <div className="mt-3 grid gap-2 pb-2">
        <button className="rounded-xl px-3 py-2 text-left text-sm text-[color:var(--ink)]" onClick={() => onNavigate(item.href)} type="button">
          Overview
        </button>
        {item.children.map((child) => (
          <button
            key={child.label}
            className="rounded-xl px-3 py-2 text-left text-sm text-[color:var(--ink)] transition hover:bg-[color:var(--surface)]"
            onClick={() => onNavigate(child.href)}
            type="button"
          >
            {child.label}
          </button>
        ))}
      </div>
    </details>
  )
}

function HomePage({ onNavigate }) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(248,200,48,0.18),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(39,94,64,0.18),transparent_26%),radial-gradient(circle_at_70%_80%,rgba(87,61,16,0.16),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--olive)] shadow-[0_12px_24px_rgba(44,44,53,0.06)]">
              {brand.subtitle}
            </p>
            <h1 className="font-display text-5xl leading-none tracking-[-0.04em] text-[color:var(--ink-strong)] sm:text-7xl">
              Delhi NCR&apos;s leading aesthetic clinic for calm, clinical, confident care.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted-ink)] sm:text-xl">
              Bespoke dermatology and aesthetic medicine led by Dr. Aarushi Tyagi, built around trust, advanced devices, and natural-looking results.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <button
                className="rounded-full bg-[linear-gradient(135deg,var(--ink-strong),var(--olive))] px-6 py-3 text-sm font-semibold text-[color:var(--cream)] shadow-[0_16px_36px_rgba(39,94,64,0.24)] transition hover:translate-y-[-1px]"
                onClick={() => onNavigate('/services')}
                type="button"
              >
                Explore treatments
              </button>
              <a
                className="rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface)] px-6 py-3 text-sm font-semibold text-[color:var(--ink-strong)] transition hover:bg-[color:var(--cream-soft)]"
                href={brand.whatsapp}
                rel="noreferrer"
                target="_blank"
              >
                Book on WhatsApp
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-[1.8rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-[0_18px_50px_rgba(44,44,53,0.08)]"
                >
                  <div className="text-3xl font-semibold text-[color:var(--ink-strong)]">{stat.value}</div>
                  <p className="mt-2 text-sm text-[color:var(--muted-ink)]">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-8 h-40 w-40 rounded-full bg-[color:var(--gold-soft)] blur-3xl" />
            <div className="absolute right-4 top-4 h-48 w-48 rounded-full bg-[color:var(--olive-soft)] blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-[color:var(--border)] bg-[linear-gradient(160deg,rgba(255,255,255,0.82),rgba(248,242,235,0.92))] p-5 shadow-[0_26px_70px_rgba(44,44,53,0.16)]">
              <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#d8cab8_0%,#a58b68_46%,#6e5434_100%)] p-6 text-[color:var(--cream)]">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em]">
                    <span>Reviva</span>
                    <span>Clinic view</span>
                  </div>
                  <div className="mt-24 rounded-[1.6rem] bg-[rgba(255,255,255,0.12)] p-4 backdrop-blur-md">
                    <p className="text-sm font-semibold">A sanctuary for skin, science, and confidence.</p>
                    <p className="mt-2 text-sm text-[rgba(255,255,255,0.82)]">
                      Skin, hair, and aesthetic care designed with precision and restraint.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[2rem] bg-[color:var(--cream-soft)] p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">Visit us</p>
                    <div className="mt-3 space-y-2 text-sm text-[color:var(--ink-strong)]">
                      <p>Ghaziabad: {brand.phoneGhaziabad}</p>
                      <p>Noida: {brand.phoneNoida}</p>
                    </div>
                  </div>
                  <div className="rounded-[2rem] bg-[color:var(--surface)] p-5 ring-1 ring-[color:var(--border)]">
                    <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">Trust points</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {trustPoints.map((point) => (
                        <span
                          key={point}
                          className="rounded-full border border-[color:var(--border-strong)] bg-[color:var(--cream-soft)] px-3 py-1.5 text-xs font-medium text-[color:var(--ink-strong)]"
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {featuredServices.slice(0, 3).map((service) => (
                  <button
                    key={service.slug}
                    className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-4 text-left transition hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(44,44,53,0.08)]"
                    onClick={() => onNavigate(`/services/${service.slug}`)}
                    type="button"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[color:var(--gold-soft)] text-[color:var(--ink-strong)]">
                        <ServiceIcon name={service.icon} />
                      </span>
                      <span className="text-xs text-[color:var(--muted)]">{service.category}</span>
                    </div>
                    <h3 className="mt-4 font-semibold text-[color:var(--ink-strong)]">{service.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--muted-ink)]">{service.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionBlock eyebrow="About the clinic" title="A refined clinic built around science, restraint, and visible trust.">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Card>
            <p className="text-lg leading-8 text-[color:var(--muted-ink)]">
              In Reviva Skin & Surgery Clinic, we are committed to offering advanced, safe, and efficient dermatology and cosmetology treatments. If you are searching for a dermatologist in Ghaziabad or Noida, this is where expertise and warmth meet.
            </p>
            <p className="mt-4 text-lg leading-8 text-[color:var(--muted-ink)]">
              Led by Dr. Aarushi Tyagi, our clinic supports hair, skin, and nail concerns with individualized treatment plans designed around your needs rather than trends.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="rounded-full bg-[color:var(--ink-strong)] px-5 py-3 text-sm font-semibold text-[color:var(--cream)]"
                onClick={() => onNavigate('/about')}
                type="button"
              >
                Discover our clinic
              </button>
              <button
                className="rounded-full border border-[color:var(--border-strong)] px-5 py-3 text-sm font-semibold text-[color:var(--ink-strong)]"
                onClick={() => onNavigate('/services')}
                type="button"
              >
                Browse services
              </button>
            </div>
          </Card>

          <div className="grid gap-4">
            <InfoCard icon="shield" title="Safe, clinical care" description="Care built with patient safety and long-term skin health at the center." />
            <InfoCard icon="spark" title="Natural results" description="Results that refresh and elevate without looking overdone." />
            <InfoCard icon="leaf" title="Personalised plans" description="Every treatment path is mapped to your skin, hair, and lifestyle needs." />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="Signature treatments" title="Bespoke care for every skin concern.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredServices.map((service, index) => (
            <button
              key={service.slug}
              className="group rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 text-left shadow-[0_14px_40px_rgba(44,44,53,0.06)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(44,44,53,0.12)]"
              onClick={() => onNavigate(`/services/${service.slug}`)}
              type="button"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--gold-soft),var(--peru-soft))] text-[color:var(--ink-strong)]">
                  <ServiceIcon name={service.icon} />
                </div>
                <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-5 text-sm uppercase tracking-[0.25em] text-[color:var(--olive)]">{service.category}</p>
              <h3 className="mt-2 text-2xl font-semibold text-[color:var(--ink-strong)]">{service.title}</h3>
              <p className="mt-3 text-base leading-7 text-[color:var(--muted-ink)]">{service.description}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[color:var(--ink-strong)]">
                View more
                <span className="transition group-hover:translate-x-1">-&gt;</span>
              </div>
            </button>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="Meet your dermatologist" title={`${doctor.name} ${doctor.credentials}`}>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[2.3rem] bg-[linear-gradient(180deg,#3d352e_0%,#6f583c_100%)] p-6 text-[color:var(--cream)] shadow-[0_22px_60px_rgba(44,44,53,0.16)]">
            <div className="rounded-[1.9rem] border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.08)] p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-[rgba(255,255,255,0.72)]">Profile</span>
                <span className="rounded-full bg-[rgba(255,255,255,0.15)] px-3 py-1 text-xs">MBBS, MD, DNB</span>
              </div>
              <div className="mt-8 aspect-[4/5] rounded-[1.6rem] bg-[radial-gradient(circle_at_30%_20%,rgba(248,200,48,0.34),transparent_35%),linear-gradient(160deg,rgba(255,255,255,0.2),rgba(255,255,255,0.05))]" />
            </div>
          </div>
          <Card>
            <p className="text-lg leading-8 text-[color:var(--muted-ink)]">{doctor.bio}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {['Clinical dermatology', 'Aesthetic medicine', 'Skin and hair care', 'Patient-first planning'].map((item) => (
                <div key={item} className="rounded-[1.4rem] bg-[color:var(--cream-soft)] px-4 py-4 text-sm font-medium text-[color:var(--ink-strong)]">
                  {item}
                </div>
              ))}
            </div>
            <button
              className="mt-7 rounded-full bg-[color:var(--ink-strong)] px-5 py-3 text-sm font-semibold text-[color:var(--cream)]"
              onClick={() => onNavigate('/about')}
              type="button"
            >
              View full profile
            </button>
          </Card>
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="Why Reviva" title="Trusted by Delhi NCR for visible, lasting results.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {whyReviva.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_14px_40px_rgba(44,44,53,0.06)]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--gold-soft)] text-[color:var(--ink-strong)]">
                <ServiceIcon name={item.icon} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[color:var(--ink-strong)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted-ink)]">{item.description}</p>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="Our process" title="Your skin journey, in four simple steps.">
        <div className="grid gap-4 lg:grid-cols-4">
          {processSteps.map((step) => (
            <article
              key={step.step}
              className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_14px_40px_rgba(44,44,53,0.06)]"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--olive)]">{step.step}</p>
              <h3 className="mt-4 text-xl font-semibold text-[color:var(--ink-strong)]">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted-ink)]">{step.description}</p>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="Client stories" title="Loved by 5,000+ patients across Delhi NCR.">
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_14px_40px_rgba(44,44,53,0.06)]"
            >
              <div className="flex gap-1 text-[color:var(--gold)]" aria-hidden="true">
                {'*****'.split('').map((star, index) => (
                  <span key={`${testimonial.name}-${index}`}>{star}</span>
                ))}
              </div>
              <blockquote className="mt-4 text-base leading-8 text-[color:var(--muted-ink)]">{testimonial.quote}</blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-[color:var(--ink-strong)]">
                {testimonial.name}
                <span className="block text-xs font-medium uppercase tracking-[0.22em] text-[color:var(--muted)]">
                  {testimonial.treatment}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="Journal" title="From the dermatologist's desk.">
        <div className="grid gap-4 lg:grid-cols-3">
          {journalEntries.map((entry) => (
            <article
              key={entry.title}
              className="overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_14px_40px_rgba(44,44,53,0.06)]"
            >
              <div className="h-44 bg-[linear-gradient(135deg,rgba(87,61,16,0.72),rgba(39,94,64,0.88))] p-5 text-[color:var(--cream)]">
                <p className="text-xs uppercase tracking-[0.35em] text-[rgba(255,255,255,0.72)]">{entry.date}</p>
                <div className="mt-14 max-w-[16rem] text-2xl font-semibold leading-tight">{entry.title}</div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-7 text-[color:var(--muted-ink)]">{entry.description}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="Start your skin journey" title="Book a consultation with Dr. Aarushi Tyagi.">
        <div className="rounded-[2.4rem] border border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(248,242,235,0.88))] p-8 shadow-[0_18px_50px_rgba(44,44,53,0.08)] lg:p-10">
          <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted-ink)]">
            Personalised treatment plans, advanced dermatology, and aesthetic care designed around your goals.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={brand.whatsapp}
              rel="noreferrer"
              target="_blank"
              className="rounded-full bg-[color:var(--ink-strong)] px-6 py-3 text-sm font-semibold text-[color:var(--cream)]"
            >
              Book appointment
            </a>
            <button
              className="rounded-full border border-[color:var(--border-strong)] px-6 py-3 text-sm font-semibold text-[color:var(--ink-strong)]"
              onClick={() => onNavigate('/services')}
              type="button"
            >
              Browse treatments
            </button>
          </div>
        </div>
      </SectionBlock>
    </>
  )
}

function AboutPage({ onNavigate }) {
  return (
    <PageShell
      eyebrow="About us"
      title="A sanctuary for skin, science, and confidence."
      description="Reviva Skin & Surgery Clinic brings together advanced dermatology, thoughtful aesthetic medicine, and a calm patient experience."
      onNavigate={onNavigate}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <Card>
          <p className="text-lg leading-8 text-[color:var(--muted-ink)]">
            The clinic is led by Dr. Aarushi Tyagi, a board-certified dermatologist with deep experience in clinical and aesthetic care. We focus on safe treatments, balanced recommendations, and results that still feel like you.
          </p>
          <p className="mt-4 text-lg leading-8 text-[color:var(--muted-ink)]">
            This project is set up so you can later add the final service subpage content, doctor details, treatment FAQs, and any location-specific information without reworking the site structure.
          </p>
        </Card>
        <Card className="bg-[linear-gradient(160deg,rgba(87,61,16,0.94),rgba(39,94,64,0.82))] text-[color:var(--cream)]">
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(255,255,255,0.7)]">Clinic focus</p>
          <div className="mt-5 space-y-3 text-sm leading-7 text-[rgba(255,255,255,0.88)]">
            <p>Advanced dermatology</p>
            <p>Aesthetic medicine</p>
            <p>Hair and scalp solutions</p>
            <p>Laser and skin rejuvenation</p>
          </div>
        </Card>
      </div>
    </PageShell>
  )
}

function ServicesIndexPage({ onNavigate }) {
  const serviceGroups = navItems.find((item) => item.children)?.children || []

  return (
    <PageShell
      eyebrow="Services"
      title="Browse the core treatment categories."
      description="Each category below already has its own route, and each service page can expand into subpages later when you share the final content."
      onNavigate={onNavigate}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {serviceGroups.map((child) => (
          <button
            key={child.label}
            className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 text-left shadow-[0_14px_40px_rgba(44,44,53,0.06)] transition hover:-translate-y-1"
            onClick={() => onNavigate(child.href)}
            type="button"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--olive)]">Service</p>
            <h3 className="mt-3 text-xl font-semibold text-[color:var(--ink-strong)]">{child.label}</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted-ink)]">
              Open the dedicated treatment page and later add subpages like overview, benefits, recovery, and FAQs.
            </p>
          </button>
        ))}
      </div>
    </PageShell>
  )
}

function ServicePage({ slug, onNavigate }) {
  const service = servicePages.find((item) => item.slug === slug)

  if (!service) return <NotFoundPage onNavigate={onNavigate} />

  return (
    <PageShell
      eyebrow="Service"
      title={service.title}
      description={service.summary}
      onNavigate={onNavigate}
      backLabel="Back to services"
      backHref="/services"
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <p className="text-lg leading-8 text-[color:var(--muted-ink)]">
            This treatment page is ready for your final service copy. For now, it already gives you a branded structure, a strong intro, and a place to add service-specific details without changing the overall design.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {service.concerns.map((item) => (
              <div key={item} className="rounded-[1.3rem] bg-[color:var(--cream-soft)] px-4 py-4 text-sm font-medium text-[color:var(--ink-strong)]">
                {item}
              </div>
            ))}
          </div>
        </Card>
        <Card className="bg-[linear-gradient(160deg,rgba(87,61,16,0.9),rgba(206,180,129,0.92))] text-[color:var(--cream)]">
          <p className="text-xs uppercase tracking-[0.35em] text-[rgba(255,255,255,0.7)]">Page structure</p>
          <div className="mt-5 grid gap-3">
            {serviceSections.map((section) => (
              <button
                key={section}
                className="rounded-[1.2rem] border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.08)] px-4 py-3 text-left text-sm font-medium text-[color:var(--cream)]"
                onClick={() => onNavigate(`/services/${slug}/${slugify(section)}`)}
                type="button"
              >
                {section}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  )
}

function ServiceSubpagePage({ slug, subslug, onNavigate }) {
  const service = servicePages.find((item) => item.slug === slug)
  if (!service) return <NotFoundPage onNavigate={onNavigate} />

  return (
    <PageShell
      eyebrow={service.title}
      title={unslugify(subslug)}
      description="Subpage template ready for the final copy you will provide later."
      onNavigate={onNavigate}
      backLabel={service.title}
      backHref={`/services/${slug}`}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <p className="text-lg leading-8 text-[color:var(--muted-ink)]">
            Use this route for the detailed subpage content. It is already connected to the navigation and designed to accept final text, images, and FAQs later.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {['Hero copy', 'Treatment details', 'Before and after care', 'FAQ block'].map((item) => (
              <div key={item} className="rounded-[1.3rem] bg-[color:var(--cream-soft)] px-4 py-4 text-sm font-medium text-[color:var(--ink-strong)]">
                {item}
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--olive)]">Connected page</p>
          <div className="mt-4 rounded-[2rem] bg-[linear-gradient(160deg,rgba(248,200,48,0.2),rgba(39,94,64,0.22))] p-6">
            <p className="text-sm font-semibold text-[color:var(--ink-strong)]">{service.title}</p>
            <p className="mt-2 text-sm leading-7 text-[color:var(--muted-ink)]">{service.summary}</p>
          </div>
        </Card>
      </div>
    </PageShell>
  )
}

function NotFoundPage({ onNavigate }) {
  return (
    <PageShell
      eyebrow="404"
      title="We could not find that page."
      description="The route exists as a friendly placeholder, but the content has not been added yet."
      onNavigate={onNavigate}
      backLabel="Go home"
      backHref="/"
    />
  )
}

function PageShell({ eyebrow, title, description, children, onNavigate, backLabel, backHref }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="max-w-3xl">
        {backLabel ? (
          <button className="mb-6 text-sm font-medium text-[color:var(--olive)]" onClick={() => onNavigate(backHref)} type="button">
            &lt; {backLabel}
          </button>
        ) : null}
        <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--olive)]">{eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl leading-none tracking-[-0.04em] text-[color:var(--ink-strong)] sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--muted-ink)]">{description}</p>
      </div>
      <div className="mt-10">{children}</div>
    </section>
  )
}

function SectionBlock({ eyebrow, title, children }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--olive)]">{eyebrow}</p>
        <h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.04em] text-[color:var(--ink-strong)] sm:text-5xl">
          {title}
        </h2>
      </div>
      <div className="mt-10">{children}</div>
    </section>
  )
}

function Card({ children, className = '' }) {
  return <div className={`rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-7 shadow-[0_18px_50px_rgba(44,44,53,0.08)] ${className}`}>{children}</div>
}

function InfoCard({ icon, title, description }) {
  return (
    <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_18px_50px_rgba(44,44,53,0.08)]">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--gold-soft)] text-[color:var(--ink-strong)]">
        <ServiceIcon name={icon} />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-[color:var(--ink-strong)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[color:var(--muted-ink)]">{description}</p>
    </div>
  )
}

function SiteFooter({ onNavigate }) {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[rgba(255,255,255,0.92)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[color:var(--olive)]">Reviva Skin & Surgery</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[color:var(--muted-ink)]">
            A refined clinic website starter built in your palette, with service routes and page templates ready for the next content drop.
          </p>
        </div>
        <div className="grid gap-2 text-sm">
          <button className="text-left text-[color:var(--ink-strong)]" onClick={() => onNavigate('/about')} type="button">
            About us
          </button>
          <button className="text-left text-[color:var(--ink-strong)]" onClick={() => onNavigate('/services')} type="button">
            Services
          </button>
          <a className="text-[color:var(--ink-strong)]" href={brand.whatsapp} rel="noreferrer" target="_blank">
            WhatsApp
          </a>
        </div>
        <div className="grid gap-2 text-sm text-[color:var(--muted-ink)]">
          <p>{brand.phoneGhaziabad}</p>
          <p>{brand.phoneNoida}</p>
          <p>Ghaziabad and Noida</p>
        </div>
      </div>
    </footer>
  )
}

function ServiceIcon({ name }) {
  const common = 'h-5 w-5'

  switch (name) {
    case 'spark':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l1.9 5.8L20 9.7l-5.8 1.9L12 17.4l-2.2-5.8L4 9.7l5.8-1.9L12 2z" />
          <path d="M19 14l.9 2.5L22 17.4l-2.1.9L19 20.8l-.9-2.5-2.1-.9 2.1-.9L19 14z" />
        </svg>
      )
    case 'face':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 19c1.1 1 2.5 1.5 4 1.5s2.9-.5 4-1.5" />
          <path d="M7 9.5c1-2 2.9-3.3 5-3.3s4 1.3 5 3.3" />
          <path d="M6.5 12c0-3 2.5-6.5 5.5-6.5s5.5 3.5 5.5 6.5-2.5 5.5-5.5 5.5S6.5 15 6.5 12z" />
        </svg>
      )
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l7 3v5c0 4.7-2.8 8.6-7 10-4.2-1.4-7-5.3-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'leaf':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 5c-5.5.4-10 3.8-12 9-.7 1.7-.9 3.5-.9 5.5 2.2.1 4-.2 5.6-.9 5.2-2 8.6-6.5 9-12.1-.5-.8-1.1-1.6-1.7-2.5z" />
          <path d="M9 15c1.5-1.5 4-3.5 7.5-5.5" />
        </svg>
      )
    case 'pulse':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12h4l2-4 3 8 2-4h5" />
          <path d="M3 6h18v12H3z" />
        </svg>
      )
    case 'target':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 12l5-5" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L4 9.1l5.8-.8L12 3z" />
        </svg>
      )
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function unslugify(value) {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export default App
