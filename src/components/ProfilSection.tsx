import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export default function ProfilSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        background: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Dot-grid texture */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.3,
        }}
      />
      {/* Blue glow — top-right */}
      <div
        aria-hidden
        style={{
          position: 'absolute', top: -100, right: -100, pointerEvents: 'none',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(90,176,214,0.09) 0%, transparent 70%)',
        }}
      />

      <div
        style={{
          position: 'relative', zIndex: 10,
          maxWidth: 1400, margin: '0 auto',
          padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'start',
        }}
      >
        {/* Left — label + heading */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
              background: '#5ab0d6', boxShadow: '0 0 8px rgba(90,176,214,0.8)',
            }} />
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)',
              color: '#5ab0d6',
              textTransform: 'uppercase',
              letterSpacing: '0.28em',
            }}>
              Profil
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 'clamp(1.85rem, 3.5vw, 2.9rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              color: '#0a2540',
              margin: '0 0 20px 0',
            }}
          >
            Dengan semangat <br />
            Membangun Diri, <br />
            <span style={{ color: '#0c6b96' }}>Membangun Negeri</span>
          </motion.h2>

          {/* Accent bar */}
          <motion.div
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              show:   { scaleX: 1, opacity: 1, transition: { duration: 0.48, ease: EASE } },
            }}
            style={{
              height: 3, width: 48,
              background: 'linear-gradient(to right, #5ab0d6, rgba(90,176,214,0.2))',
              borderRadius: 2,
              transformOrigin: 'left',
            }}
          />
        </motion.div>

        {/* Right — paragraphs */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 8 }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
              lineHeight: 1.85,
              color: '#475569',
              margin: 0,
            }}
          >
            Berpusat pada bidang riset dan pengembangan teknologi inti dari pembangkit listrik
            tenaga bayu skala mikro, antara lain bilah, generator, controller, dan data logger
            serta pengembangan teknologi pertanian dan peternakan untuk meningkatkan nilainya
            dan memberdayakan masyarakat sekitar.
          </motion.p>

          <motion.div
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              show:   { scaleX: 1, opacity: 1, transition: { duration: 0.4, ease: EASE } },
            }}
            style={{
              height: 1,
              background: 'linear-gradient(to right, #e2e8f0, transparent)',
              transformOrigin: 'left',
            }}
          />

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
              lineHeight: 1.85,
              fontWeight: 500,
              color: '#0a2540',
              margin: 0,
            }}
          >
            Manifestasi dari aktifitas tersebut hadir dalam bentuk karya dan juga kolaborasi
            bersama para stakeholder yang mempunyai misi serupa dalam mengembangkan{' '}
            <span style={{ color: '#0c6b96' }}>Energi Baru Terbarukan di Indonesia</span>.
          </motion.p>
        </motion.div>

      </div>
    </section>
  )
}
