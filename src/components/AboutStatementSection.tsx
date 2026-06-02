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
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function AboutStatementSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

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
        minHeight: '100svh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'clamp(100px, 12vh, 140px)',
        paddingBottom: 'clamp(40px, 6vh, 80px)',
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

      {/* ── Content (Left-Aligned Clean Layout echoing Division Headers) ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1400, width: '100%',
        margin: '0 auto',
        padding: '0 clamp(1.75rem, 5vw, 5rem)',
      }}>
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
          }}
        >

          {/* ── Eyebrow (matching Divisi 01 page style exactly) ── */}
          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                background: '#5ab0d6', boxShadow: '0 0 8px rgba(90,176,214,0.85)',
              }}
            />
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
            }}>
              PROFIL
            </span>
          </motion.div>

          {/* ── Heading (matching Divisi title style exactly, bold white & brand blue) ── */}
          <motion.div variants={fadeUp} style={{ marginBottom: 20 }}>
            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Dengan semangat <br />
              Membangun Diri, <br />
              <span style={{ color: '#5ab0d6' }}>Membangun Negeri,</span> <br />
              <span style={{ fontSize: 'clamp(1.1rem, 2vw, 1.8rem)', fontWeight: 500, color: 'rgba(255, 255, 255, 0.7)', display: 'block', marginTop: 12 }}>
                Lentera Bumi Nusantara hadir.
              </span>
            </h1>
          </motion.div>

          {/* ── Accent Line (matching Division accent exactly) ── */}
          <motion.div
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              show: { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: EASE } }
            }}
            style={{
              height: 2,
              width: 'clamp(40px, 4vw, 60px)',
              background: 'linear-gradient(to right, #5ab0d6, transparent)',
              transformOrigin: 'left',
              marginBottom: 28,
            }}
          />

          {/* ── Description (Left-aligned, highly readable line-length, NO BUTTONS) ── */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              maxWidth: 580, // perfect reading width identical to Division headers
              width: '100%',
            }}
          >
            {/* Paragraph 1 */}
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.88rem, 1.05vw, 0.975rem)',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.62)',
                margin: 0,
              }}
            >
              Berpusat pada bidang riset dan pengembangan teknologi inti dari pembangkit listrik tenaga bayu skala mikro, antara lain bilah, generator, controller, dan data logger serta pengembangan teknologi pertanian dan peternakan untuk meningkatkan nilainya dan memberdayakan masyarakat sekitar.
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.88rem, 1.05vw, 0.975rem)',
                lineHeight: 1.8,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.85)',
                margin: 0,
              }}
            >
              Manifestasi dari aktifitas tersebut hadir dalam bentuk karya dan juga kolaborasi bersama para stakeholder yang mempunyai misi serupa dalam mengembangkan Energi Baru Terbarukan di Indonesia.
            </motion.p>
          </div>

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
