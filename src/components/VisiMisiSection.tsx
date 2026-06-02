import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

/* ─────────────────────────────────────────────
   Constants & variants
───────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.68, ease: EASE } },
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

const MISI = [
  {
    no: '01',
    title: 'Penguasaan Teknologi',
    desc: 'Melakukan penelitian dan pengembangan untuk penguasaan teknologi.',
  },
  {
    no: '02',
    title: 'Implementasi Solusi',
    desc: 'Mengimplementasikan teknologi untuk membantu menyelesaikan permasalahan energi dan pangan.',
  },
  {
    no: '03',
    title: 'Penelitian & Pengembangan',
    desc: 'Mengembangkan teknologi agar lebih efisien, ramah lingkungan, berdampak, dan berkelanjutan.',
  },
  {
    no: '04',
    title: 'Transfer Ilmu & Teknologi',
    desc: 'Melakukan proses transfer teknologi untuk pengembangan sumber daya manusia.',
  },
]

/* ─────────────────────────────────────────────
   Misi Card
───────────────────────────────────────────── */

function MisiCard({ no, title, desc }: { no: string; title: string; desc: string }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover="hover"
      initial="rest"
      animate="rest"
      style={{
        position: 'relative',
        background: '#ffffff',
        border: '1px solid #e8edf4',
        borderRadius: 14,
        padding: 'clamp(1.25rem, 2vw, 1.5rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        boxShadow: '0 1px 3px rgba(10,37,64,0.05)',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
      }}
    >
      {/* Left accent strip — reveals on hover */}
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

      {/* Hover background tint */}
      <motion.div
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.22 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(240,248,253,0.7) 0%, rgba(255,255,255,0) 55%)',
          borderRadius: 14,
          pointerEvents: 'none',
        }}
      />

      {/* Number badge */}
      <div
        style={{
          width: 32, height: 32,
          borderRadius: '50%',
          background: 'rgba(90,176,214,0.1)',
          border: '1px solid rgba(90,176,214,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: '0.64rem',
          color: '#0c6b96',
          letterSpacing: '0.04em',
        }}>
          {no}
        </span>
      </div>

      {/* Title */}
      <motion.p
        variants={{ rest: { color: '#0a2540' }, hover: { color: '#0c6b96' } }}
        transition={{ duration: 0.18 }}
        style={{
          position: 'relative',
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 'clamp(0.875rem, 1.05vw, 0.95rem)',
          margin: 0,
          lineHeight: 1.35,
          letterSpacing: '-0.015em',
        }}
      >
        {title}
      </motion.p>

      {/* Description */}
      <p style={{
        position: 'relative',
        fontFamily: 'var(--font-sans)',
        fontSize: 'clamp(0.775rem, 0.9vw, 0.84rem)',
        color: '#64748b',
        lineHeight: 1.75,
        margin: 0,
      }}>
        {desc}
      </p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

export default function VisiMisiSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section
      id="visi-misi"
      ref={ref}
      style={{
        position: 'relative',
        background: '#ffffff',
        borderTop: '3px solid #5ab0d6',
        overflow: 'hidden',
      }}
    >
      {/* ── Decorative background shapes ── */}
      <div aria-hidden style={{
        position: 'absolute',
        top: -120, right: -120,
        width: 520, height: 520,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(90,176,214,0.055) 0%, transparent 68%)',
        pointerEvents: 'none',
      }} />
      <div aria-hidden style={{
        position: 'absolute',
        bottom: -100, left: -80,
        width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(12,107,150,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* ── Outer container ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1400,
        margin: '0 auto',
        padding: 'clamp(4.5rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5rem)',
      }}>

        {/* ════════════════════════════════════════
            GRID: Visi | divider | Misi
        ════════════════════════════════════════ */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,5fr) 1px minmax(0,7fr)',
            gap: 'clamp(2.5rem, 5vw, 5.5rem)',
            alignItems: 'start',
          }}
          className="vm-grid"
        >

          {/* ════════════════
              LEFT — VISI
          ════════════════ */}
          <div style={{ position: 'relative' }}>

            {/* Ghost "01" watermark */}
            <div aria-hidden style={{
              position: 'absolute',
              top: -28, left: -12,
              fontFamily: 'var(--font-sans)',
              fontWeight: 900,
              fontSize: 'clamp(7rem, 14vw, 13rem)',
              lineHeight: 1,
              color: '#f0f5f8',
              letterSpacing: '-0.06em',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 0,
            }}>
              01
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Eyebrow */}
              <motion.p
                variants={fadeUp}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: 'clamp(0.58rem, 0.78vw, 0.68rem)',
                  color: '#5ab0d6',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  margin: '0 0 20px 0',
                }}
              >
                01 — Visi Kami
              </motion.p>

              {/* Heading */}
              <motion.h2
                variants={fadeUp}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 800,
                  fontSize: 'clamp(3rem, 5.5vw, 4.75rem)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.045em',
                  color: '#0a2540',
                  margin: '0 0 20px 0',
                }}
              >
                Visi
              </motion.h2>

              {/* Accent bar */}
              <motion.div
                variants={{
                  hidden: { scaleX: 0, opacity: 0 },
                  show:   { scaleX: 1, opacity: 1, transition: { duration: 0.48, ease: EASE } },
                }}
                style={{
                  height: 3,
                  width: 44,
                  background: 'linear-gradient(to right, #5ab0d6, rgba(90,176,214,0.2))',
                  borderRadius: 2,
                  transformOrigin: 'left',
                  marginBottom: 36,
                }}
              />

              {/* Blockquote vision */}
              <motion.div variants={fadeUp} style={{ position: 'relative', paddingLeft: 20 }}>
                {/* Left quote bar */}
                <div style={{
                  position: 'absolute',
                  left: 0, top: 4, bottom: 4,
                  width: 3,
                  background: 'linear-gradient(to bottom, #5ab0d6, rgba(90,176,214,0.1))',
                  borderRadius: 2,
                }} />

                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.9rem, 1.15vw, 1.05rem)',
                  fontWeight: 400,
                  color: '#334155',
                  lineHeight: 1.85,
                  margin: 0,
                }}>
                  Memanfaatkan potensi energi dan pangan untuk bersama-sama membangun{' '}
                  <span style={{ color: '#0c6b96', fontWeight: 600 }}>
                    sustainable community
                  </span>{' '}
                  di Nusantara melalui penguasaan, penerapan, dan pengembangan teknologi baru.
                </p>
              </motion.div>
            </div>
          </div>

          {/* ════════════════
              DIVIDER
          ════════════════ */}
          <motion.div
            variants={{
              hidden: { scaleY: 0, opacity: 0 },
              show:   { scaleY: 1, opacity: 1, transition: { duration: 0.7, ease: EASE } },
            }}
            style={{
              alignSelf: 'stretch',
              background: 'linear-gradient(to bottom, transparent, #dde5ed 20%, #dde5ed 80%, transparent)',
              transformOrigin: 'center',
            }}
            className="vm-divider"
          />

          {/* ════════════════
              RIGHT — MISI
          ════════════════ */}
          <div style={{ position: 'relative' }}>

            {/* Ghost "02" watermark */}
            <div aria-hidden style={{
              position: 'absolute',
              top: -28, right: -12,
              fontFamily: 'var(--font-sans)',
              fontWeight: 900,
              fontSize: 'clamp(7rem, 14vw, 13rem)',
              lineHeight: 1,
              color: '#f0f5f8',
              letterSpacing: '-0.06em',
              userSelect: 'none',
              pointerEvents: 'none',
              zIndex: 0,
            }}>
              02
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Eyebrow */}
              <motion.p
                variants={fadeUp}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: 'clamp(0.58rem, 0.78vw, 0.68rem)',
                  color: '#5ab0d6',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  margin: '0 0 20px 0',
                }}
              >
                02 — Program Kami
              </motion.p>

              {/* Heading */}
              <motion.h2
                variants={fadeUp}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 800,
                  fontSize: 'clamp(3rem, 5.5vw, 4.75rem)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.045em',
                  color: '#0a2540',
                  margin: '0 0 20px 0',
                }}
              >
                Misi
              </motion.h2>

              {/* Accent bar */}
              <motion.div
                variants={{
                  hidden: { scaleX: 0, opacity: 0 },
                  show:   { scaleX: 1, opacity: 1, transition: { duration: 0.48, ease: EASE } },
                }}
                style={{
                  height: 3,
                  width: 44,
                  background: 'linear-gradient(to right, #0c6b96, rgba(12,107,150,0.15))',
                  borderRadius: 2,
                  transformOrigin: 'left',
                  marginBottom: 32,
                }}
              />

              {/* 2 × 2 cards */}
              <motion.div
                variants={containerV}
                className="misi-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 'clamp(0.75rem, 1.2vw, 1rem)',
                }}
              >
                {MISI.map((m) => (
                  <MisiCard key={m.no} {...m} />
                ))}
              </motion.div>
            </div>
          </div>

        </motion.div>
      </div>

      {/* ── Mobile: hide divider column, collapse to 1-col ── */}
      <style>{`
        @media (max-width: 860px) {
          .vm-grid {
            grid-template-columns: 1fr !important;
            gap: clamp(2.5rem, 6vw, 3.5rem) !important;
          }
          .vm-divider { display: none !important; }
        }
        @media (max-width: 600px) {
          .misi-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
