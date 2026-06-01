import { useRef } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.3 } },
}

const lineV: Variants = {
  hidden: { opacity: 0, y: 36, clipPath: 'inset(0 0 100% 0)' },
  show: {
    opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.82, ease: EASE },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.68, ease: EASE } },
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function AboutStatementSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  /* Parallax on background image */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={ref}
      id="about-statement"
      style={{
        position: 'relative',
        height: '100svh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* ── Background layer (same pattern as HeroSection) ── */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          y: bgY, scale: 1.1,
          willChange: 'transform',
        }}
      >
        {/* Gradient base always behind image */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(135deg, #030c18 0%, #062030 40%, #0a3352 100%)',
        }} />
        <img
          src={`${import.meta.env.BASE_URL}hero_Section.webp`}
          alt=""
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 40%',
            zIndex: 1,
          }}
        />
      </motion.div>

      {/* ── Multi-layer cinematic overlay ── */}
      {/* Bottom-to-top gradient */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(2,9,20,0.97) 0%, rgba(3,13,28,0.82) 32%, rgba(4,16,34,0.58) 60%, rgba(4,16,34,0.72) 100%)',
      }} />
      {/* Radial vignette */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(2,9,20,0.5) 100%)',
      }} />
      {/* Subtle horizontal scan lines — industrial texture */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)',
        mixBlendMode: 'multiply',
      }} />

      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1400, width: '100%',
        margin: '0 auto',
        padding: '80px clamp(1.5rem, 5vw, 5rem) clamp(3rem, 5vw, 5rem)',
      }}>
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: 900,
            margin: '0 auto',
          }}
        >

          {/* ── Eyebrow bar ── */}
          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              marginBottom: 44,
            }}
          >
            <motion.div
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 0.5, ease: EASE } },
              }}
              style={{
                height: 1, width: 36,
                background: 'linear-gradient(to left, #5ab0d6, transparent)',
                transformOrigin: 'right',
              }}
            />
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 'clamp(0.56rem, 0.7vw, 0.62rem)',
              color: '#5ab0d6',
              textTransform: 'uppercase',
              letterSpacing: '0.36em',
              whiteSpace: 'nowrap',
            }}>
              Est. 2012 · Ciheras, Tasikmalaya
            </span>
            <motion.div
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 0.5, ease: EASE } },
              }}
              style={{
                height: 1, width: 36,
                background: 'linear-gradient(to right, #5ab0d6, transparent)',
                transformOrigin: 'left',
              }}
            />
          </motion.div>

          {/* ── Top rule ── */}
          <motion.div
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              show:   { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: EASE } },
            }}
            style={{
              width: '100%', height: 1,
              background: 'linear-gradient(to right, transparent, rgba(90,176,214,0.3) 30%, rgba(90,176,214,0.3) 70%, transparent)',
              transformOrigin: 'center',
              marginBottom: 48,
            }}
          />

          {/* ── Main heading — deconstructed lines ── */}
          <div style={{ marginBottom: 48 }}>

            {/* Prelude line — softer, italic */}
            <div style={{ overflow: 'hidden', marginBottom: 6 }}>
              <motion.p
                variants={lineV}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                  lineHeight: 1.2,
                  letterSpacing: '0.02em',
                  color: 'rgba(255,255,255,0.45)',
                  margin: 0,
                }}
              >
                Dengan semangat
              </motion.p>
            </div>

            {/* Declaration lines — bold, white */}
            {['Membangun Diri,', 'Membangun Negeri,'].map((line, i) => (
              <div key={line} style={{ overflow: 'hidden' }}>
                <motion.h2
                  variants={lineV}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 800,
                    fontSize: 'clamp(2.2rem, 5.5vw, 5rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.04em',
                    margin: 0,
                    color: i === 1 ? '#5ab0d6' : '#ffffff',
                  }}
                >
                  {line}
                </motion.h2>
              </div>
            ))}

            {/* Resolution line */}
            <div style={{ overflow: 'hidden', marginTop: 4 }}>
              <motion.p
                variants={lineV}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: 'clamp(1.1rem, 2.4vw, 2rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: 'rgba(255,255,255,0.65)',
                  margin: 0,
                }}
              >
                Lentera Bumi Nusantara{' '}
                <span style={{ fontStyle: 'italic', fontWeight: 400 }}>hadir.</span>
              </motion.p>
            </div>
          </div>

          {/* ── Bottom rule + accent dot ── */}
          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              marginBottom: 44, width: '100%', justifyContent: 'center',
            }}
          >
            <div style={{
              flex: 1, maxWidth: 120, height: 1,
              background: 'linear-gradient(to left, rgba(90,176,214,0.4), transparent)',
            }} />
            <div style={{
              width: 5, height: 5, borderRadius: '50%',
              background: '#5ab0d6',
              boxShadow: '0 0 8px rgba(90,176,214,0.7)',
            }} />
            <div style={{
              flex: 1, maxWidth: 120, height: 1,
              background: 'linear-gradient(to right, rgba(90,176,214,0.4), transparent)',
            }} />
          </motion.div>

          {/* ── Body paragraph ── */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
              lineHeight: 1.9,
              color: 'rgba(255,255,255,0.52)',
              maxWidth: 740,
              margin: 0,
            }}
          >
            Berpusat pada bidang riset dan pengembangan teknologi inti dari
            pembangkit listrik tenaga bayu skala mikro — antara lain bilah,
            generator, controller, dan data logger — serta pengembangan
            teknologi pertanian dan peternakan untuk meningkatkan nilainya dan
            memberdayakan masyarakat sekitar.{' '}
            <span style={{ color: 'rgba(255,255,255,0.82)', fontWeight: 500 }}>
              Manifestasi dari aktivitas tersebut hadir dalam bentuk karya dan
              kolaborasi bersama para stakeholder yang mempunyai misi serupa
              dalam mengembangkan Energi Baru Terbarukan di Indonesia.
            </span>
          </motion.p>

        </motion.div>
      </div>

      {/* ── Bottom taper — tapers dark into the border-top of next section ── */}
      <div aria-hidden style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
        height: 60,
        background: 'linear-gradient(to bottom, transparent, rgba(2,9,20,0.92))',
        pointerEvents: 'none',
      }} />
    </section>
  )
}
