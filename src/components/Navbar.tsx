import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX, HiChevronDown } from 'react-icons/hi'
import { useNavigate, useLocation } from 'react-router-dom'
import { scrollToSection } from '../hooks/useSmoothScroll'

/* ─────────────────────────────────────────────
   Types & Constants
───────────────────────────────────────────── */

interface SubItem {
  label: string
  href:  string
  desc:  string
}

interface NavItem {
  label:    string
  href:     string
  children?: SubItem[]
}

const DIVISI_CHILDREN: SubItem[] = [
  { label: 'Lentera Energi',        href: '/divisi/lentera-energi',         desc: 'Energi Terbarukan' },
  { label: 'Lentera Agri Nusantara',href: '/divisi/lentera-agri-nusantara', desc: 'Pertanian & Peternakan' },
  { label: 'Ciheras University',    href: '/divisi/ciheras-university',     desc: 'Pendidikan & Riset' },
]

const NAV_ITEMS: NavItem[] = [
  { label: 'Beranda',                href: '#beranda' },
  { label: 'Tentang Kami',           href: '/about'   },
  { label: 'Divisi',                 href: '#divisi', children: DIVISI_CHILDREN },
  { label: 'Proyek',                 href: '/proyek'  },
  { label: 'Potensi Angin',          href: '/potensi-angin'  },
  { label: 'Tentang Cerita Ciheras', href: '/cerita-ciheras' },
]

const NAVBAR_HEIGHT = 80

/* ─────────────────────────────────────────────
   handleNav
───────────────────────────────────────────── */

function handleNav(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  opts: {
    navigate:    (path: string) => void
    currentPath: string
    onClose?:    () => void
  },
) {
  e.preventDefault()
  opts.onClose?.()

  if (href.startsWith('/')) {
    opts.navigate(href)
  } else if (href.startsWith('#')) {
    if (opts.currentPath === '/') {
      scrollToSection(href)
    } else {
      opts.navigate('/')
    }
  }
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const navigate     = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const navOpts = { navigate, currentPath: pathname }

  return (
    <>
      <motion.header
        role="banner"
        initial={{ y: -NAVBAR_HEIGHT, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
        style={{
          background: 'linear-gradient(135deg, #0a4f70 0%, #0c6b96 60%, #1080b2 100%)',
          boxShadow: scrolled
            ? '0 4px 24px rgba(10,79,112,0.35), 0 1px 4px rgba(0,0,0,0.15)'
            : '0 2px 12px rgba(10,79,112,0.2)',
        }}
      >
        {/* ── Main bar ── */}
        <div
          className="mx-auto flex items-center justify-between gap-6"
          style={{
            maxWidth: '1400px',
            height: `${NAVBAR_HEIGHT}px`,
            padding: '0 clamp(1.5rem, 5vw, 5rem)',
          }}
        >
          {/* LEFT — Logo */}
          <Logo navigate={navigate} currentPath={pathname} />

          {/* CENTER — Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center flex-1 justify-center">
            <ul role="list" className="flex items-center gap-0.5 m-0 p-0 list-none">
              {NAV_ITEMS.map((item) => (
                <li key={item.href} style={{ position: 'relative' }}>
                  {item.children
                    ? <DesktopDropdown item={item} navOpts={navOpts} />
                    : <DesktopNavLink  item={item} navOpts={navOpts} />
                  }
                </li>
              ))}
            </ul>
          </nav>

          {/* RIGHT — CTA + hamburger */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <motion.a
              href="#hubungi-kami"
              onClick={(e) => handleNav(e, '#hubungi-kami', navOpts)}
              whileHover={{ scale: 1.04, backgroundColor: '#f0f8fd' }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="hidden lg:inline-flex items-center rounded-full bg-white font-semibold shadow-sm whitespace-nowrap"
              style={{
                color: '#0c6b96',
                fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                padding: 'clamp(0.45rem, 0.8vw, 0.55rem) clamp(1rem, 1.8vw, 1.5rem)',
                letterSpacing: '0.02em',
                fontFamily: 'var(--font-sans)',
                textDecoration: 'none',
              }}
            >
              Hubungi Kami
            </motion.a>

            <button
              className="lg:hidden flex items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              style={{ width: 40, height: 40 }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }} className="flex">
                    <HiX size={24} />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }} className="flex">
                    <HiMenuAlt3 size={24} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden border-t border-white/10"
              style={{ background: 'rgba(8,58,85,0.97)', backdropFilter: 'blur(12px)' }}
            >
              <ul role="list" className="m-0 p-0 list-none flex flex-col gap-0.5 px-4 py-4">
                {NAV_ITEMS.map((item, i) => (
                  <MobileNavItem
                    key={item.href}
                    item={item}
                    index={i}
                    navOpts={navOpts}
                    onClose={() => setMobileOpen(false)}
                  />
                ))}

                <motion.li
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.05, duration: 0.24 }}
                  className="mt-2 pt-3 border-t border-white/10"
                >
                  <a
                    href="#hubungi-kami"
                    onClick={(e) => handleNav(e, '#hubungi-kami', { ...navOpts, onClose: () => setMobileOpen(false) })}
                    className="flex items-center justify-center rounded-full bg-white font-semibold transition-colors hover:bg-sky-50"
                    style={{ color: '#0c6b96', fontSize: 'var(--text-sm)', padding: '0.65rem 1.5rem', letterSpacing: '0.02em', fontFamily: 'var(--font-sans)', textDecoration: 'none' }}
                  >
                    Hubungi Kami
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

type NavOpts = { navigate: (p: string) => void; currentPath: string }

function Logo({ navigate, currentPath }: { navigate: (p: string) => void; currentPath: string }) {
  function handleLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    if (currentPath === '/') {
      scrollToSection('#beranda')
    } else {
      navigate('/')
    }
  }

  return (
    <a
      href="/"
      onClick={handleLogoClick}
      className="flex-shrink-0 flex items-center"
      aria-label="Lentera Bumi Nusantara — Beranda"
    >
      <img
        src={`${import.meta.env.BASE_URL}logo_lentera.webp`}
        alt="Lentera Bumi Nusantara"
        className="w-auto object-contain select-none"
        style={{ height: 'clamp(52px, 6vw, 68px)' }}
        draggable={false}
      />
    </a>
  )
}

function DesktopNavLink({ item, navOpts }: { item: NavItem; navOpts: NavOpts }) {
  const isActive =
    (item.href === '/about'   && navOpts.currentPath === '/about') ||
    (item.href === '/proyek'  && navOpts.currentPath === '/proyek') ||
    (item.href === '#beranda' && navOpts.currentPath === '/')

  return (
    <motion.a
      href={item.href}
      onClick={(e) => handleNav(e, item.href, navOpts)}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="relative rounded-md font-medium"
      style={{
        fontSize: 'clamp(0.7rem, 0.85vw, 0.8125rem)',
        padding: '0.4rem clamp(0.45rem, 0.7vw, 0.7rem)',
        letterSpacing: '0.015em',
        whiteSpace: 'nowrap',
        fontFamily: 'var(--font-sans)',
        color: isActive ? '#ffffff' : 'rgba(255,255,255,0.82)',
        textDecoration: 'none',
        display: 'block',
      }}
    >
      {isActive && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 2, left: '50%',
            transform: 'translateX(-50%)',
            width: 4, height: 4,
            borderRadius: '50%',
            background: '#5ab0d6',
          }}
        />
      )}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-md"
        variants={{ rest: { opacity: 0, scale: 0.88 }, hover: { opacity: 1, scale: 1 } }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
        style={{ background: 'rgba(255,255,255,0.12)' }}
      />
      <motion.span
        className="relative z-10"
        variants={{ rest: { color: isActive ? '#fff' : 'rgba(255,255,255,0.82)' }, hover: { color: 'rgba(255,255,255,1)' } }}
        transition={{ duration: 0.12 }}
      >
        {item.label}
      </motion.span>
    </motion.a>
  )
}

/* ── Desktop Dropdown ── */
function DesktopDropdown({ item, navOpts }: { item: NavItem; navOpts: NavOpts }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isDivisiActive = navOpts.currentPath.startsWith('/divisi')

  function onEnter() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setOpen(true)
  }
  function onLeave() {
    timerRef.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div ref={ref} onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ position: 'relative' }}>
      <motion.a
        href={item.href}
        onClick={(e) => handleNav(e, item.href, navOpts)}
        whileHover="hover"
        initial="rest"
        animate="rest"
        className="relative rounded-md font-medium inline-flex items-center gap-1"
        style={{
          fontSize: 'clamp(0.7rem, 0.85vw, 0.8125rem)',
          padding: '0.4rem clamp(0.45rem, 0.7vw, 0.7rem)',
          letterSpacing: '0.015em',
          whiteSpace: 'nowrap',
          fontFamily: 'var(--font-sans)',
          color: isDivisiActive ? '#ffffff' : 'rgba(255,255,255,0.82)',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        {isDivisiActive && (
          <span
            aria-hidden
            style={{
              position: 'absolute',
              bottom: 2, left: '50%',
              transform: 'translateX(-50%)',
              width: 4, height: 4,
              borderRadius: '50%',
              background: '#5ab0d6',
            }}
          />
        )}
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-md"
          variants={{ rest: { opacity: 0, scale: 0.88 }, hover: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          style={{ background: 'rgba(255,255,255,0.12)' }}
        />
        <motion.span
          className="relative z-10"
          variants={{ rest: { color: isDivisiActive ? '#fff' : 'rgba(255,255,255,0.82)' }, hover: { color: '#fff' } }}
          transition={{ duration: 0.12 }}
        >
          {item.label}
        </motion.span>
        <motion.span
          className="relative z-10"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          style={{ display: 'flex', color: isDivisiActive ? '#fff' : 'rgba(255,255,255,0.7)' }}
        >
          <HiChevronDown size={13} />
        </motion.span>
      </motion.a>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: '50%',
              transform: 'translateX(-50%)',
              minWidth: 260,
              background: 'rgba(6,42,62,0.98)',
              backdropFilter: 'blur(16px)',
              borderRadius: 14,
              border: '1px solid rgba(90,176,214,0.2)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)',
              overflow: 'hidden',
              zIndex: 100,
              padding: '6px',
            }}
          >
            {item.children!.map((child) => (
              <DropdownItem key={child.href} child={child} navOpts={navOpts} onClose={() => setOpen(false)} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DropdownItem({
  child, navOpts, onClose,
}: {
  child: SubItem
  navOpts: NavOpts
  onClose: () => void
}) {
  const isActive = navOpts.currentPath === child.href

  return (
    <motion.a
      href={child.href}
      onClick={(e) => {
        e.preventDefault()
        onClose()
        navOpts.navigate(child.href)
      }}
      whileHover={{ background: 'rgba(90,176,214,0.12)' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: '0.65rem 0.9rem',
        borderRadius: 10,
        textDecoration: 'none',
        background: isActive ? 'rgba(90,176,214,0.16)' : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      <span
        style={{
          fontSize: '0.8125rem',
          fontWeight: 600,
          color: isActive ? '#5ab0d6' : 'rgba(255,255,255,0.92)',
          letterSpacing: '0.01em',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {child.label}
      </span>
      <span
        style={{
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {child.desc}
      </span>
    </motion.a>
  )
}

/* ── Mobile nav item (with accordion for children) ── */
function MobileNavItem({
  item, index, navOpts, onClose,
}: {
  item:    NavItem
  index:   number
  navOpts: NavOpts
  onClose: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = !!item.children?.length

  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.22, ease: 'easeOut' }}
    >
      <div
        className="flex items-center justify-between rounded-md hover:bg-white/10 transition-colors"
        style={{ cursor: 'pointer' }}
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault()
            setExpanded((v) => !v)
          }
        }}
      >
        <a
          href={item.href}
          onClick={(e) => {
            if (!hasChildren) {
              handleNav(e, item.href, { ...navOpts, onClose })
            } else {
              e.preventDefault()
            }
          }}
          className="flex-1 font-medium text-white/80 hover:text-white"
          style={{ fontSize: 'var(--text-sm)', padding: '0.65rem 0.75rem', letterSpacing: '0.01em', fontFamily: 'var(--font-sans)', textDecoration: 'none', display: 'block' }}
        >
          {item.label}
        </a>
        {hasChildren && (
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.22 }}
            style={{ paddingRight: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'flex' }}
          >
            <HiChevronDown size={15} />
          </motion.span>
        )}
      </div>

      {/* Sub-items accordion */}
      <AnimatePresence>
        {hasChildren && expanded && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="list"
            className="m-0 p-0 list-none overflow-hidden"
            style={{ paddingLeft: '0.75rem' }}
          >
            {item.children!.map((child) => (
              <li key={child.href}>
                <a
                  href={child.href}
                  onClick={(e) => {
                    e.preventDefault()
                    onClose()
                    navOpts.navigate(child.href)
                  }}
                  className="flex flex-col gap-0.5 rounded-md hover:bg-white/10 transition-colors"
                  style={{
                    padding: '0.55rem 0.75rem',
                    textDecoration: 'none',
                    borderLeft: '2px solid rgba(90,176,214,0.3)',
                    marginLeft: '0.25rem',
                    marginBottom: '0.15rem',
                  }}
                >
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-sans)' }}>
                    {child.label}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {child.desc}
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.li>
  )
}
