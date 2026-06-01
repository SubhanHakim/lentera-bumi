import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { HiLocationMarker, HiExternalLink, HiStar } from 'react-icons/hi'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

const MAP_SRC =
  'https://maps.google.com/maps?q=Lentera+Bumi+Nusantara,+Ciheras,+Kabupaten+Tasikmalaya&output=embed&z=15'

const GMAPS_LINK =
  'https://maps.google.com/?q=Lentera+Bumi+Nusantara,+Ciheras,+Cipatujah,+Tasikmalaya'

/* ─────────────────────────────────────────────
   Detail row — light theme
───────────────────────────────────────────── */

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: '0.6rem',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.22em',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 500,
        fontSize: 'clamp(0.8rem, 0.95vw, 0.875rem)',
        color: '#334155',
        lineHeight: 1.55,
      }}>
        {value}
      </span>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

export default function LokasiSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section
      id="lokasi"
      ref={ref}
      style={{ position: 'relative', borderTop: '3px solid #5ab0d6', overflow: 'hidden' }}
    >
      <div
        className="lokasi-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1fr)',
          minHeight: 'clamp(520px, 75vh, 700px)',
        }}
      >

        {/* ══════════════════════════════
            LEFT — Info panel (LIGHT)
        ══════════════════════════════ */}
        <div style={{
          position: 'relative',
          background: '#ffffff',
          borderRight: '1px solid #e8edf4',
          overflow: 'hidden',
        }}>
          {/* Subtle radial accent top-right */}
          <div aria-hidden style={{
            position: 'absolute', top: -60, right: -60,
            width: 300, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(90,176,214,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />

          <motion.div
            variants={containerV}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            style={{
              position: 'relative', zIndex: 1,
              height: '100%',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: 'clamp(2.5rem, 4vw, 3.5rem) clamp(2.5rem, 5vw, 4.5rem)',
            }}
          >
            {/* Eyebrow */}
            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 'clamp(0.58rem, 0.75vw, 0.65rem)',
              color: '#5ab0d6',
              textTransform: 'uppercase',
              letterSpacing: '0.32em',
              margin: '0 0 16px 0',
            }}>
              Lokasi Kami
            </motion.p>

            {/* Heading */}
            <motion.h2 variants={fadeUp} style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 'clamp(1.9rem, 3.8vw, 3.2rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: '#0a2540',
              margin: '0 0 4px 0',
            }}>
              Lokasi
            </motion.h2>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 'clamp(1.9rem, 3.8vw, 3.2rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: '#0c6b96',
              margin: '0 0 28px 0',
            }}>
              Ciheras
            </motion.h2>

            {/* Coordinates badge */}
            <motion.div variants={fadeUp} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#f0f8fd',
              border: '1px solid rgba(90,176,214,0.3)',
              borderRadius: 8,
              padding: '8px 14px',
              marginBottom: 28,
              width: 'fit-content',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#5ab0d6',
                boxShadow: '0 0 6px rgba(90,176,214,0.6)',
                flexShrink: 0,
                animation: 'pulse-dot 2s infinite',
              }} />
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.72rem',
                color: '#0c6b96',
                letterSpacing: '0.1em',
                fontVariantNumeric: 'tabular-nums',
              }}>
                7°43′47″ S · 108°5′16″ E
              </span>
            </motion.div>

            {/* Divider */}
            <motion.div variants={fadeUp} style={{
              height: 1,
              background: 'linear-gradient(to right, #e2e8f0, transparent)',
              marginBottom: 24,
            }} />

            {/* Detail rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
              <DetailRow
                label="Alamat"
                value="Ciheras, Cipatujah, Kabupaten Tasikmalaya, Jawa Barat 46189"
              />
              <DetailRow label="Kawasan"       value="Pantai Selatan Jawa · Pesisir Tasikmalaya" />
              <DetailRow label="Google Rating"  value="4.9 / 5  (383 ulasan)" />
            </div>

            {/* CTA button */}
            <motion.div variants={fadeUp}>
              <motion.a
                href={GMAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, backgroundColor: '#0a5a80' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: 'clamp(0.78rem, 0.92vw, 0.875rem)',
                  color: '#ffffff',
                  background: '#0c6b96',
                  borderRadius: 10,
                  padding: '11px 22px',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  boxShadow: '0 4px 14px rgba(12,107,150,0.25)',
                }}
              >
                <HiLocationMarker size={15} style={{ flexShrink: 0 }} />
                Buka di Google Maps
                <HiExternalLink size={13} style={{ opacity: 0.7, flexShrink: 0 }} />
              </motion.a>
            </motion.div>

            {/* Rating stars */}
            <motion.div variants={fadeUp} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              marginTop: 20,
            }}>
              {[1,2,3,4,5].map((i) => (
                <HiStar key={i} size={14} style={{ color: i <= 4 ? '#f59e0b' : '#e2e8f0' }} />
              ))}
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                color: '#94a3b8',
                marginLeft: 5,
                letterSpacing: '0.04em',
              }}>
                4.9 · 383 ulasan di Google
              </span>
            </motion.div>

          </motion.div>
        </div>

        {/* ══════════════════════════════
            RIGHT — Map
        ══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          style={{ position: 'relative', minHeight: 400 }}
        >
          <iframe
            src={MAP_SRC}
            title="Lokasi Lentera Bumi Nusantara — Ciheras, Tasikmalaya"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              border: 'none', display: 'block',
            }}
          />
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .lokasi-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
      `}</style>
    </section>
  )
}
