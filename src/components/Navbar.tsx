import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { scrollToSection } from '../hooks/useSmoothScroll'

/* ─────────────────────────────────────────────
   Types & Constants
───────────────────────────────────────────── */

interface NavItem {
  label: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Beranda',                href: '#beranda' },
  { label: 'Tentang Kami',           href: '#tentang-kami' },
  { label: 'Divisi',                 href: '#divisi' },
  { label: 'Proyek',                 href: '#proyek' },
  { label: 'Potensi Angin',          href: '#potensi-angin' },
  { label: 'Tentang Cerita Ciheras', href: '#cerita-ciheras' },
]

const NAVBAR_HEIGHT = 80 // px — shared by spacer & scroll offset

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)

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
          <Logo />

          {/* CENTER — Desktop nav */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center flex-1 justify-center"
          >
            <ul role="list" className="flex items-center gap-0.5 m-0 p-0 list-none">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <DesktopNavLink item={item} />
                </li>
              ))}
            </ul>
          </nav>

          {/* RIGHT — CTA + hamburger */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <motion.a
              href="#hubungi-kami"
              onClick={(e) => handleNav(e, '#hubungi-kami')}
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
              }}
            >
              Hubungi Kami
            </motion.a>

            {/* Hamburger — mobile only */}
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
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  90, opacity: 0 }}
                    transition={{ duration: 0.18, ease: 'easeInOut' }}
                    className="flex"
                  >
                    <HiX size={24} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate:  90, opacity: 0 }}
                    animate={{ rotate:  0,  opacity: 1 }}
                    exit={{   rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18, ease: 'easeInOut' }}
                    className="flex"
                  >
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
              exit={{   opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden border-t border-white/10"
              style={{
                background: 'rgba(8, 58, 85, 0.97)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <ul
                role="list"
                className="m-0 p-0 list-none flex flex-col gap-0.5 px-4 py-4"
              >
                {NAV_ITEMS.map((item, i) => (
                  <MobileNavItem
                    key={item.href}
                    item={item}
                    index={i}
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
                    onClick={(e) => handleNav(e, '#hubungi-kami', () => setMobileOpen(false))}
                    className="flex items-center justify-center rounded-full bg-white font-semibold transition-colors hover:bg-sky-50"
                    style={{
                      color: '#0c6b96',
                      fontSize: 'var(--text-sm)',
                      padding: '0.65rem 1.5rem',
                      letterSpacing: '0.02em',
                      fontFamily: 'var(--font-sans)',
                    }}
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

function handleNav(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onClose?: () => void,
) {
  e.preventDefault()
  onClose?.()
  scrollToSection(href)
}

function Logo() {
  return (
    <a
      href="#beranda"
      onClick={(e) => handleNav(e, '#beranda')}
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

function DesktopNavLink({ item }: { item: NavItem }) {
  return (
    <motion.a
      href={item.href}
      onClick={(e) => handleNav(e, item.href)}
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
        color: 'rgba(255,255,255,0.82)',
      }}
    >
      {/* Hover pill background */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-md"
        variants={{
          rest:  { opacity: 0, scale: 0.88 },
          hover: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
        style={{ background: 'rgba(255,255,255,0.12)' }}
      />
      <motion.span
        className="relative z-10"
        variants={{
          rest:  { color: 'rgba(255,255,255,0.82)' },
          hover: { color: 'rgba(255,255,255,1)' },
        }}
        transition={{ duration: 0.12 }}
      >
        {item.label}
      </motion.span>
    </motion.a>
  )
}

function MobileNavItem({
  item,
  index,
  onClose,
}: {
  item: NavItem
  index: number
  onClose: () => void
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.22, ease: 'easeOut' }}
    >
      <a
        href={item.href}
        onClick={(e) => handleNav(e, item.href, onClose)}
        className="flex items-center rounded-md font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
        style={{
          fontSize: 'var(--text-sm)',
          padding: '0.65rem 0.75rem',
          letterSpacing: '0.01em',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {item.label}
      </a>
    </motion.li>
  )
}
