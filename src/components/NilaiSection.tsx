import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { HiUserGroup, HiLightBulb, HiAcademicCap, HiHeart } from 'react-icons/hi'
import type { IconType } from 'react-icons'

/* ─────────────────────────────────────────────
   Constants & variants
───────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const pillarV: Variants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

interface Nilai {
  no:     string
  prefix: string
  root:   string
  desc:   string
  Icon:   IconType
}

const NILAI: Nilai[] = [
  {
    no:     '01',
    prefix: 'Ber',
    root:   'sama',
    Icon:   HiUserGroup,
    desc:   'Permasalahan negeri ini tidak akan selesai bila dipikirkan sendirian. Perlu kerjasama dan kolaborasi dalam menghasilkan suatu karya.',
  },
  {
    no:     '02',
    prefix: 'Ber',
    root:   'karya',
    Icon:   HiLightBulb,
    desc:   'Mengidentifikasi masalah dan menemukan solusinya. Menghasilkan suatu karya untuk menyelesaikan permasalahan sangat diperlukan.',
  },
  {
    no:     '03',
    prefix: 'Ber',
    root:   'kembang',
    Icon:   HiAcademicCap,
    desc:   'Senantiasa memperbaiki diri agar terus dapat menghasilkan karya terbaik melalui perbaikan berkelanjutan.',
  },
  {
    no:     '04',
    prefix: 'Ber',
    root:   'manfaat',
    Icon:   HiHeart,
    desc:   'Suatu karya yang dilakukan bersama haruslah dapat memberi manfaat dan dapat diaplikasikan untuk menyelesaikan permasalahan.',
  },
]

/* ─────────────────────────────────────────────
   Pillar card
───────────────────────────────────────────── */

function PillarCard({ nilai: n }: { nilai: Nilai }) {
  return (
    <motion.div
      variants={pillarV}
      whileHover="hover"
      initial="rest"
      animate="rest"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: 'clamp(1.75rem, 3vw, 2.5rem) clamp(1.5rem, 2.5vw, 2rem)',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'default',
        gap: 0,
      }}
    >
      {/* Hover background tint */}
      <motion.div
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', inset: 0, borderRadius: 20,
          background: 'rgba(255,255,255,0.04)',
          pointerEvents: 'none',
        }}
      />

      {/* Top accent bar */}
      <motion.div
        variants={{ rest: { scaleX: 0, opacity: 0 }, hover: { scaleX: 1, opacity: 1 } }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 2,
          background: 'linear-gradient(to right, #5ab0d6, transparent)',
          transformOrigin: 'left',
          borderRadius: '20px 20px 0 0',
        }}
      />

      {/* Ghost number watermark */}
      <div aria-hidden style={{
        position: 'absolute',
        bottom: -16, right: -8,
        fontFamily: 'var(--font-sans)',
        fontWeight: 900,
        fontSize: 'clamp(5rem, 10vw, 9rem)',
        lineHeight: 1,
        color: 'rgba(255,255,255,0.025)',
        letterSpacing: '-0.06em',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        {n.no}
      </div>

      {/* Index + icon row */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'clamp(1.5rem, 2.5vw, 2rem)',
        position: 'relative',
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: '0.64rem',
          color: '#5ab0d6',
          letterSpacing: '0.2em',
        }}>
          {n.no}
        </span>

        {/* Icon ring */}
        <motion.div
          variants={{
            rest:  { background: 'rgba(90,176,214,0.08)', borderColor: 'rgba(90,176,214,0.15)' },
            hover: { background: 'rgba(90,176,214,0.18)', borderColor: 'rgba(90,176,214,0.4)' },
          }}
          transition={{ duration: 0.25 }}
          style={{
            width: 40, height: 40,
            borderRadius: '50%',
            border: '1px solid rgba(90,176,214,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <motion.span
            variants={{ rest: { color: '#5ab0d6' }, hover: { color: '#7ecde8' } }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex' }}
          >
            <n.Icon size={18} />
          </motion.span>
        </motion.div>
      </div>

      {/* ── Signature typography: "Ber" + root ── */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
        {/* "Ber" prefix — small, teal */}
        <div style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
          color: '#5ab0d6',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          lineHeight: 1,
          marginBottom: 2,
        }}>
          {n.prefix}—
        </div>

        {/* Root word — large, white */}
        <motion.div
          variants={{
            rest:  { color: '#ffffff' },
            hover: { color: '#7ecde8' },
          }}
          transition={{ duration: 0.25 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            textTransform: 'capitalize',
          }}
        >
          {n.root.charAt(0).toUpperCase() + n.root.slice(1)}
        </motion.div>
      </div>

      {/* Thin divider */}
      <motion.div
        variants={{
          rest:  { background: 'rgba(255,255,255,0.07)' },
          hover: { background: 'rgba(90,176,214,0.3)' },
        }}
        transition={{ duration: 0.3 }}
        style={{ height: 1, width: '100%', marginBottom: 20 }}
      />

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'clamp(0.78rem, 0.92vw, 0.875rem)',
        lineHeight: 1.78,
        color: 'rgba(255,255,255,0.5)',
        margin: 0,
        position: 'relative',
      }}>
        {n.desc}
      </p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

export default function NilaiSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <section
      id="nilai"
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #041220 0%, #062030 50%, #0a3352 100%)',
        borderTop: '3px solid #5ab0d6',
      }}
    >
      {/* Subtle grid texture */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage:
          'linear-gradient(rgba(90,176,214,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(90,176,214,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />

      {/* Radial glow top-right */}
      <div aria-hidden style={{
        position: 'absolute', top: '-15%', right: '-5%', zIndex: 0,
        width: '45%', height: '70%',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(12,107,150,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1400, margin: '0 auto',
        padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
      }}>

        {/* ── Section header ── */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 'clamp(0.58rem, 0.78vw, 0.68rem)',
              color: '#5ab0d6',
              textTransform: 'uppercase',
              letterSpacing: '0.32em',
              margin: '0 0 16px 0',
            }}
          >
            Filosofi &amp; Nilai
          </motion.p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.04em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Nilai{' '}
              <span style={{ color: '#5ab0d6' }}>LBN</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.82rem, 1vw, 0.9rem)',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.45)',
                maxWidth: 380,
                margin: 0,
              }}
            >
              Empat prinsip yang menjadi fondasi setiap langkah dan karya
              Lentera Bumi Nusantara.
            </motion.p>
          </div>
        </motion.div>

        {/* ── 4 Pillars grid ── */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(0.875rem, 1.5vw, 1.25rem)',
          }}
        >
          {NILAI.map((n) => (
            <PillarCard key={n.no} nilai={n} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
