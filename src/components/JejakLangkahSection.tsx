import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion'

/* ─────────────────────────────────────────────
   Constants & variants
───────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.68, ease: EASE } },
}

const entryV: Variants = {
  hidden: { opacity: 0, x: -28 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

interface Milestone {
  year:  string
  title: string
  desc:  string
  tag?:  string
}

const MILESTONES: Milestone[] = [
  {
    year:  '2011',
    title: 'Awal Mula',
    tag:   'Riset',
    desc:  'Memulai riset turbin angin skala mikro untuk menjawab kebutuhan energi di daerah terpencil.',
  },
  {
    year:  '2012',
    title: 'Membentuk Lentera Angin Nusantara',
    tag:   'Pendirian',
    desc:  'Membangun site riset energi terbarukan di Ciheras sebagai pusat pengembangan teknologi.',
  },
  {
    year:  '2013',
    title: 'Proyek Energi di Sumba',
    tag:   'Proyek',
    desc:  'Mengembangkan pembangkit listrik hybrid untuk masyarakat di daerah terpencil.',
  },
  {
    year:  '2014',
    title: 'Small Wind Farm Ciheras',
    tag:   'Infrastruktur',
    desc:  'Mengembangkan infrastruktur turbin angin dan panel surya untuk riset lanjutan.',
  },
  {
    year:  '2016',
    title: 'Eksplorasi Potensi Lokal',
    tag:   'Diversifikasi',
    desc:  'Mengembangkan peternakan, pertanian, dan produk herbal berbasis masyarakat.',
  },
  {
    year:  '2017',
    title: 'Ciheras University',
    tag:   'Pendidikan',
    desc:  'Mengembangkan prototipe generator dan bilah turbin berbasis teknologi lokal.',
  },
  {
    year:  '2020',
    title: 'Produksi & Pertanian',
    tag:   'Skala Lanjut',
    desc:  'Membangun fasilitas produksi herbal dan pengembangan kebun kelor.',
  },
]

/* ─────────────────────────────────────────────
   Timeline line — animates height on scroll
───────────────────────────────────────────── */

function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 20%'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: 0, top: 0, bottom: 0,
        width: 2,
        background: '#e8edf4',
      }}
    >
      {/* Animated fill */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, #5ab0d6, #0c6b96)',
          scaleY,
          transformOrigin: 'top',
        }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Milestone entry
───────────────────────────────────────────── */

function MilestoneEntry({ milestone: m, index }: { milestone: Milestone; index: number }) {
  const isLast = index === MILESTONES.length - 1

  return (
    <motion.div
      variants={entryV}
      className="milestone-entry"
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 3vw, 2.5rem) 1fr',
        alignItems: 'start',
        paddingBottom: isLast ? 0 : 'clamp(2rem, 4vw, 3.5rem)',
      }}
    >
      {/* ── Year column ── */}
      <div className="milestone-year" style={{ paddingTop: 2, textAlign: 'right', paddingRight: 0 }}>
        <motion.span
          whileHover={{ color: '#0c6b96' }}
          transition={{ duration: 0.2 }}
          style={{
            display: 'block',
            fontFamily: 'var(--font-sans)',
            fontWeight: 800,
            fontSize: 'clamp(1rem, 1.6vw, 1.35rem)',
            letterSpacing: '-0.03em',
            color: '#0a2540',
            lineHeight: 1,
            cursor: 'default',
          }}
        >
          {m.year}
        </motion.span>
      </div>

      {/* ── Node column ── */}
      <div className="milestone-node" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}>
        {/* Horizontal connector */}
        <div style={{
          position: 'absolute',
          top: 7,
          left: 0, right: 0,
          height: 1,
          background: 'linear-gradient(to right, #5ab0d6, #e8edf4)',
        }} />

        {/* Node dot */}
        <div style={{
          width: 14, height: 14,
          borderRadius: '50%',
          background: '#5ab0d6',
          border: '2.5px solid #ffffff',
          boxShadow: '0 0 0 3px rgba(90,176,214,0.2)',
          zIndex: 1,
          flexShrink: 0,
          marginTop: 1,
        }} />
      </div>

      {/* ── Card column ── */}
      <motion.div
        whileHover="hover"
        initial="rest"
        animate="rest"
        className="milestone-card"
        style={{
          position: 'relative',
          background: '#ffffff',
          border: '1px solid #e8edf4',
          borderRadius: 14,
          padding: 'clamp(1.1rem, 1.8vw, 1.5rem) clamp(1.25rem, 2vw, 1.75rem)',
          overflow: 'hidden',
          boxShadow: '0 1px 4px rgba(10,37,64,0.04)',
        }}
      >
        {/* Left accent on hover */}
        <motion.div
          variants={{
            rest:  { scaleY: 0, opacity: 0 },
            hover: { scaleY: 1, opacity: 1 },
          }}
          transition={{ duration: 0.28, ease: EASE }}
          style={{
            position: 'absolute',
            left: 0, top: 0, bottom: 0,
            width: 3,
            background: 'linear-gradient(to bottom, #5ab0d6, #0c6b96)',
            transformOrigin: 'top',
            borderRadius: '14px 0 0 14px',
          }}
        />

        {/* Hover tint */}
        <motion.div
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.22 }}
          style={{
            position: 'absolute', inset: 0, borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(240,248,253,0.6) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />

        {/* Ghost year watermark */}
        <div aria-hidden style={{
          position: 'absolute',
          right: -8, bottom: -14,
          fontFamily: 'var(--font-sans)',
          fontWeight: 900,
          fontSize: 'clamp(3.5rem, 6vw, 6rem)',
          lineHeight: 1,
          color: 'rgba(10,37,64,0.04)',
          letterSpacing: '-0.05em',
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          {m.year}
        </div>

        {/* Tag + title row */}
        <div style={{
          display: 'flex', alignItems: 'center',
          flexWrap: 'wrap', gap: '6px 10px',
          marginBottom: 8, position: 'relative',
        }}>
          {m.tag && (
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '0.6rem',
              color: '#0c6b96',
              background: '#eff8fd',
              borderRadius: 4,
              padding: '2px 8px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              {m.tag}
            </span>
          )}
        </div>

        <motion.h3
          variants={{ rest: { color: '#0a2540' }, hover: { color: '#0c6b96' } }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'relative',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
            margin: '0 0 8px 0',
          }}
        >
          {m.title}
        </motion.h3>

        <p style={{
          position: 'relative',
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(0.8rem, 0.92vw, 0.875rem)',
          lineHeight: 1.75,
          color: '#64748b',
          margin: 0,
        }}>
          {m.desc}
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

export default function JejakLangkahSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })

  return (
    <section
      id="jejak-langkah"
      ref={ref}
      style={{
        position: 'relative',
        background: '#ffffff',
        borderTop: '3px solid #5ab0d6',
        overflow: 'hidden',
      }}
    >
      {/* Decorative radial blur — top right */}
      <div aria-hidden style={{
        position: 'absolute',
        top: -100, right: -80,
        width: 460, height: 460,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(90,176,214,0.06) 0%, transparent 65%)',
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
          style={{
            display: 'flex', flexWrap: 'wrap',
            alignItems: 'flex-end', justifyContent: 'space-between',
            gap: 24, marginBottom: 'clamp(3rem, 6vw, 5.5rem)',
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
              Rekam Jejak
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
                margin: '0 0 6px 0',
              }}
            >
              Jejak Langkah
            </motion.h2>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.06,
                letterSpacing: '-0.04em',
                color: '#0c6b96',
                margin: 0,
              }}
            >
              Lentera Bumi Nusantara
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.82rem, 1vw, 0.9rem)',
              lineHeight: 1.78,
              color: '#64748b',
              maxWidth: 360,
              margin: 0,
            }}
          >
            Perjalanan kami dalam membangun energi, pangan, dan pemberdayaan
            masyarakat dari tahun ke tahun.
          </motion.p>
        </motion.div>

        {/* ── Timeline ── */}
        <div style={{ position: 'relative', paddingLeft: 2 }}>

          {/* Animated vertical line */}
          <TimelineLine />

          {/* Entries — offset right of the line */}
          <motion.div
            variants={containerV}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            style={{ paddingLeft: 'clamp(1rem, 2vw, 1.5rem)' }}
          >
            {MILESTONES.map((m, i) => (
              <MilestoneEntry key={m.year} milestone={m} index={i} />
            ))}
          </motion.div>

        </div>

        <style>{`
          @media (max-width: 600px) {
            .milestone-entry {
              grid-template-columns: 24px 1fr !important;
              gap: 12px !important;
            }
            .milestone-year {
              grid-column: 2;
              text-align: left !important;
              padding-bottom: 6px;
            }
            .milestone-node {
              grid-column: 1;
              grid-row: 1 / 3;
              height: 100%;
            }
            .milestone-card {
              grid-column: 2;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
