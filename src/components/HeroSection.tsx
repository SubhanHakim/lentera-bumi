import { useRef } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import { LuChevronDown } from 'react-icons/lu'
import { scrollToSection } from '../hooks/useSmoothScroll'

/* ─────────────────────────────
   Constants
──────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

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
      style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden' }}
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
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 45%' }}
        />
      </motion.div>

      {/* ── Ambient Wind Flow Effect (represents the beach breeze of Ciheras) ── */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          initial={{ x: '-10%', opacity: 0 }}
          animate={inView ? { x: '110%', opacity: [0, 0.35, 0.35, 0] } : {}}
          transition={{
            duration: 8 + i * 2,
            delay: i * 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            zIndex: 2,
            pointerEvents: 'none',
            top: `${20 + i * 13}%`,
            left: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(90, 176, 214, 0.25), rgba(45, 212, 191, 0.2), transparent)',
            width: `${150 + i * 80}px`,
          }}
        />
      ))}

      {/* ── Ambient Radial Glow behind the title ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '8%',
          top: '35%',
          width: '38vw',
          height: '38vw',
          background: 'radial-gradient(circle, rgba(90, 176, 214, 0.08) 0%, transparent 70%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* ── Dark overlay — bottom-to-top + left vignette (tuned for high visibility of wind turbines) ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to top, rgba(3,12,24,0.75) 0%, rgba(3,12,24,0.3) 35%, rgba(3,12,24,0.05) 70%, transparent 95%)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to right, rgba(3,12,24,0.5) 0%, rgba(3,12,24,0.1) 45%, transparent 80%)',
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: 'relative', zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100svh',
          paddingTop: 'clamp(100px, 12vh, 140px)',
          paddingBottom: 'clamp(40px, 6vh, 80px)',
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
            {/* Headline — two stacked lines, each in overflow:hidden for clip reveal */}
            <div style={{ overflow: 'hidden' }}>
              <motion.h1
                variants={fadeUp}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 800,
                  fontSize: 'clamp(2.5rem, 6.2vw, 6.2rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  margin: 0,
                  textShadow: '0 2px 24px rgba(3,12,24,0.4)',
                }}
              >
                Teknologi
              </motion.h1>
            </div>

            <div style={{ overflow: 'hidden', marginTop: 12 }}>
              <motion.h1
                variants={fadeUp}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 800,
                  fontSize: 'clamp(2.5rem, 6.2vw, 6.2rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  margin: 0,
                  textShadow: '0 2px 24px rgba(3,12,24,0.4)',
                }}
              >
                <span style={{ fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', marginRight: 'clamp(10px, 1.5vw, 24px)' }}>dan</span>
                <span style={{ color: '#ffffff' }}>
                  Pemberdayaan
                </span>
              </motion.h1>
            </div>

            {/* Glowing Accent Anchor Line under the minimal title */}
            <motion.div
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                show: { scaleX: 1, opacity: 1, transition: { delay: 0.6, duration: 0.8, ease: EASE } },
              }}
              style={{
                height: '3px',
                width: '140px',
                background: 'linear-gradient(to right, #7ecde8, #2dd4bf, transparent)',
                transformOrigin: 'left',
                marginTop: '36px',
                borderRadius: '9999px',
                boxShadow: '0 0 12px rgba(45, 212, 191, 0.4)',
              }}
            />
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
          onClick={() => scrollToSection('#tentang')}
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
