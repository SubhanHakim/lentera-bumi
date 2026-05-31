import { useRef } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { RiMailSendLine } from 'react-icons/ri'
import { LuChevronDown } from 'react-icons/lu'
import { scrollToSection } from '../hooks/useSmoothScroll'

/* ─────────────────────────────
   Constants
──────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const NAV_H = 80

/* ─────────────────────────────
   Variants
──────────────────────────── */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

/* ─────────────────────────────
   Component
──────────────────────────── */

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })

  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 600], ['0%', '14%'])

  return (
    <section
      id="beranda"
      ref={ref}
      style={{ position: 'relative', height: '100svh', overflow: 'hidden' }}
    >
      {/* ── Background parallax ── */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          y: bgY, scale: 1.08,
          willChange: 'transform',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}hero_Section.webp`}
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 50%' }}
        />
      </motion.div>

      {/* ── Dark overlay — bottom-to-top + left vignette ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to top, rgba(3,12,24,0.97) 0%, rgba(4,16,32,0.85) 25%, rgba(5,20,40,0.52) 50%, rgba(6,24,48,0.2) 70%, transparent 88%)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to right, rgba(3,12,24,0.7) 0%, rgba(3,12,24,0.35) 35%, transparent 65%)',
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: NAV_H,
        }}
      >
        {/* Inner max-width wrapper */}
        <div
          style={{
            maxWidth: 1400,
            width: '100%',
            margin: '0 auto',
            padding: '0 clamp(1.75rem, 5vw, 5rem)',
          }}
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >

            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                background: '#5ab0d6',
                boxShadow: '0 0 8px rgba(90,176,214,0.85)',
              }} />
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.28em',
              }}>
                Lentera Bumi Nusantara · Ciheras · Tasikmalaya
              </span>
            </motion.div>

            {/* Headline — two stacked lines, each in overflow:hidden for clip reveal */}
            <div style={{ overflow: 'hidden' }}>
              <motion.h1
                variants={fadeUp}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: 'clamp(2.2rem, 4.4vw, 4rem)',
                  lineHeight: 1.07,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  margin: '0 0 4px 0',
                }}
              >
                Teknologi Energi
              </motion.h1>
            </div>

            <div style={{ overflow: 'hidden', marginBottom: 36 }}>
              <motion.h1
                variants={fadeUp}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: 'clamp(2.2rem, 4.4vw, 4rem)',
                  lineHeight: 1.07,
                  letterSpacing: '-0.03em',
                  color: '#5ab0d6',
                  margin: 0,
                }}
              >
                dan Pemberdayaan
              </motion.h1>
            </div>

            {/* Accent line */}
            <motion.div
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                show: { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: EASE } },
              }}
              style={{
                height: 2,
                width: 'clamp(40px, 4vw, 60px)',
                background: 'linear-gradient(to right, #5ab0d6, transparent)',
                transformOrigin: 'left',
                marginBottom: 28,
              }}
            />

            {/* Paragraph */}
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.88rem, 1.05vw, 0.975rem)',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.62)',
                maxWidth: 560,
                margin: '0 0 40px 0',
              }}
            >
              Di tepi Pantai Ciheras, kami membangun turbin angin, melakukan
              transfer knowledge kepada mahasiswa, dan memberdayakan warga lokal —
              semuanya dalam satu ekosistem. Kepercayaan{' '}
              <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>PLN dan PT PJB</span>
              , serta{' '}
              <span style={{ color: '#7ecde8', fontWeight: 600 }}>1.050+ mahasiswa</span>
              {' '}yang telah berkarya di sini adalah bukti —{' '}
              <span style={{ color: '#fff', fontWeight: 700, fontStyle: 'italic' }}>kami bergerak.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14 }}
            >
              {/* Primary */}
              <motion.a
                href="#divisi"
                onClick={(e) => { e.preventDefault(); scrollToSection('#divisi') }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: 'clamp(0.82rem, 0.95vw, 0.9rem)',
                  color: '#0a3d5c',
                  background: '#ffffff',
                  borderRadius: 9999,
                  padding: '13px 28px',
                  letterSpacing: '0.01em',
                  textDecoration: 'none',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.22)',
                  whiteSpace: 'nowrap',
                }}
              >
                Jelajahi Divisi Kami
                <motion.span
                  style={{ display: 'inline-flex' }}
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <HiArrowRight size={15} />
                </motion.span>
              </motion.a>

              {/* Secondary */}
              <motion.a
                href="#hubungi-kami"
                onClick={(e) => { e.preventDefault(); scrollToSection('#hubungi-kami') }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: 'clamp(0.82rem, 0.95vw, 0.9rem)',
                  color: '#ffffff',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  borderRadius: 9999,
                  padding: '13px 28px',
                  backdropFilter: 'blur(12px)',
                  letterSpacing: '0.01em',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                <RiMailSendLine size={15} />
                Mulai Kolaborasi
              </motion.a>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* ── Scroll cue — absolute bottom ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          position: 'absolute', bottom: 28, left: '50%',
          transform: 'translateX(-50%)', zIndex: 10,
        }}
        aria-hidden="true"
      >
        <button
          onClick={() => scrollToSection('#stats')}
          aria-label="Scroll ke bawah"
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
            color: 'rgba(255,255,255,0.3)',
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)' }}
        >
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.52rem',
            textTransform: 'uppercase',
            letterSpacing: '0.26em',
          }}>
            Scroll
          </span>
          <motion.span
            style={{ display: 'flex' }}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <LuChevronDown size={15} />
          </motion.span>
        </button>
      </motion.div>
    </section>
  )
}
