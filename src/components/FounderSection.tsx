import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

/* ─────────────────────────────────────────────
   Constants & variants
───────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const cardV: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: EASE } },
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

interface Founder {
  no:       string
  name:     string
  role:     string
  tagline:  string
  photo:    string
  photoPos: string
}

const FOUNDERS: Founder[] = [
  {
    no:       '01',
    name:     'Ricky Elson',
    role:     'Founder',
    tagline:  'Pelopor riset turbin angin skala mikro di Indonesia',
    photo:    'ricky.webp',
    photoPos: 'center 20%',
  },
  {
    no:       '02',
    name:     'Muhammad Nasrul',
    role:     'CEO',
    tagline:  'Memimpin visi dan strategi pertumbuhan Lentera Bumi Nusantara',
    photo:    'nasrul.webp',
    photoPos: 'center 15%',
  },
]

/* ─────────────────────────────────────────────
   Portrait card
───────────────────────────────────────────── */

function PortraitCard({ founder: f }: { founder: Founder }) {
  return (
    <motion.div
      variants={cardV}
      whileHover="hover"
      initial="rest"
      animate="rest"
      style={{
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        aspectRatio: '3 / 4',
        cursor: 'default',
        boxShadow: '0 8px 32px rgba(10,37,64,0.12), 0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      {/* ── Background photo ── */}
      <motion.img
        src={`${import.meta.env.BASE_URL}${f.photo}`}
        alt={f.name}
        variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: f.photoPos,
        }}
      />

      {/* ── Gradient overlays ── */}
      {/* Ambient dark layer */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(4,18,32,0.08) 0%, transparent 35%, rgba(4,18,32,0.7) 70%, rgba(4,18,32,0.95) 100%)',
      }} />
      {/* Hover: slight teal tint */}
      <motion.div
        aria-hidden
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, rgba(12,107,150,0.18) 0%, transparent 55%)',
        }}
      />

      {/* ── Corner bracket — top left ── */}
      <div aria-hidden style={{
        position: 'absolute', top: 20, left: 20,
        width: 32, height: 32,
        borderTop: '2px solid rgba(90,176,214,0.7)',
        borderLeft: '2px solid rgba(90,176,214,0.7)',
        borderRadius: '4px 0 0 0',
      }} />
      {/* ── Corner bracket — bottom right ── */}
      <div aria-hidden style={{
        position: 'absolute', bottom: 20, right: 20,
        width: 32, height: 32,
        borderBottom: '2px solid rgba(90,176,214,0.7)',
        borderRight: '2px solid rgba(90,176,214,0.7)',
        borderRadius: '0 0 4px 0',
      }} />

      {/* ── Number badge — top right ── */}
      <div style={{
        position: 'absolute', top: 18, right: 18,
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 6,
        padding: '4px 10px',
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: '0.62rem',
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.18em',
        }}>
          {f.no}
        </span>
      </div>

      {/* ── Bottom content ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        zIndex: 1,
      }}>

        {/* Role badge */}
        <motion.div
          variants={{ rest: { y: 0 }, hover: { y: -4 } }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{ marginBottom: 8 }}
        >
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: 'clamp(0.6rem, 0.75vw, 0.68rem)',
            color: '#5ab0d6',
            textTransform: 'uppercase',
            letterSpacing: '0.24em',
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: '#5ab0d6',
              boxShadow: '0 0 6px rgba(90,176,214,0.8)',
              flexShrink: 0,
            }} />
            {f.role}
          </span>
        </motion.div>

        {/* Name — large display */}
        <motion.h3
          variants={{ rest: { y: 0 }, hover: { y: -4 } }}
          transition={{ duration: 0.35, ease: EASE }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 800,
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.035em',
            color: '#ffffff',
            margin: '0 0 10px 0',
          }}
        >
          {f.name}
        </motion.h3>

        {/* Tagline — slides up on hover */}
        <motion.div
          variants={{ rest: { opacity: 0, y: 8 }, hover: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.78rem, 0.9vw, 0.85rem)',
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.65)',
            margin: 0,
          }}>
            {f.tagline}
          </p>
        </motion.div>

        {/* Accent line */}
        <motion.div
          variants={{
            rest: { scaleX: 0, opacity: 0 },
            hover: { scaleX: 1, opacity: 1 },
          }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            height: 2,
            background: 'linear-gradient(to right, #5ab0d6, transparent)',
            borderRadius: 1,
            marginTop: 14,
            transformOrigin: 'left',
          }}
        />
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

export default function FounderSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <section
      id="founder"
      ref={ref}
      style={{
        position: 'relative',
        background: '#f4f8fb',
        borderTop: '3px solid #5ab0d6',
        overflow: 'hidden',
      }}
    >
      {/* Decorative radial — bottom left */}
      <div aria-hidden style={{
        position: 'absolute',
        bottom: -80, left: -60,
        width: 480, height: 480,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(90,176,214,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1400, margin: '0 auto',
        padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
      }}>

        {/* ── Header ── */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
            alignItems: 'end',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
          }}
        >
          <div>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: 'clamp(0.58rem, 0.78vw, 0.68rem)',
                color: '#5ab0d6',
                textTransform: 'uppercase',
                letterSpacing: '0.32em',
                margin: '0 0 14px 0',
              }}
            >
              Tim Pemimpin
            </motion.p>

            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.06,
                letterSpacing: '-0.04em',
                color: '#0a2540',
                margin: 0,
              }}
            >
              Founder{' '}
              <span style={{ color: '#0c6b96' }}>&amp; CEO</span>
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.875rem, 1.05vw, 0.975rem)',
              lineHeight: 1.8,
              color: '#475569',
              margin: 0,
              maxWidth: 480,
            }}
          >
            Memimpin pengembangan inovasi energi terbarukan dan pemberdayaan
            masyarakat melalui solusi teknologi berkelanjutan untuk Indonesia.
          </motion.p>
        </motion.div>

        {/* ── Portrait cards grid ── */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(1.25rem, 2.5vw, 2rem)',
          }}
        >
          {FOUNDERS.map((f) => (
            <PortraitCard key={f.no} founder={f} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
