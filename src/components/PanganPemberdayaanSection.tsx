import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────
   Constants & Animation Variants
───────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
}

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
}

const SPECS = [
  { label: 'Mitra Peternak',   value: '65+ Peternak Lokal' },
  { label: 'Populasi Ternak',   value: '800+ Ekor Kambing/Domba' },
  { label: 'Produk Unggulan',   value: 'Bubuk Kelor, Madu & VCO' },
  { label: 'Metode Olah VCO',   value: 'Fermentasi Tanpa Panas' },
]

export default function PanganPemberdayaanSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section
      id="pangan-pemberdayaan"
      ref={ref}
      style={{ background: '#f8fafc', borderTop: '3px solid #059669', overflow: 'hidden' }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'center',
        }}
      >
        {/* ── Left: image (matching Sky Dancer style exactly) ── */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{ position: 'relative' }}
        >
          {/* Corner accent — top left (overlaps image edge) */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 14, left: 14,
              width: 44, height: 44,
              borderTop: '3px solid #059669',
              borderLeft: '3px solid #059669',
              borderRadius: '6px 0 0 0',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          />

          {/* Corner accent — bottom right (overlaps image edge) */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              bottom: 14, right: 14,
              width: 44, height: 44,
              borderBottom: '3px solid #059669',
              borderRight: '3px solid #059669',
              borderRadius: '0 0 6px 0',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          />

          {/* Image */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)',
              aspectRatio: '4 / 3',
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}agri/agri_proses_kelor.webp`}
              alt="Lentera Agri Nusantara"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />

            {/* Subtle bottom gradient */}
            <div
              aria-hidden
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '40%',
                background: 'linear-gradient(to top, rgba(4,18,32,0.55), transparent)',
              }}
            />

            {/* Floating product badge */}
            <div
              style={{
                position: 'absolute', bottom: 18, left: 18,
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.22)',
                borderRadius: 8,
                padding: '6px 14px',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <span
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#059669', flexShrink: 0,
                  boxShadow: '0 0 6px #059669',
                }}
              />
              <span style={{
                fontWeight: 600,
                fontSize: 'clamp(0.6rem, 0.75vw, 0.68rem)',
                color: '#ffffff',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}>
                Divisi Agri LBN
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Right: content (matching Sky Dancer style exactly) ── */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
        >
          {/* Label */}
          <motion.p
            variants={fadeUp}
            style={{
              fontWeight: 600,
              fontSize: 'clamp(0.6rem, 0.85vw, 0.7rem)',
              color: '#059669',
              textTransform: 'uppercase',
              letterSpacing: '0.28em',
              marginBottom: 16,
            }}
          >
            Lentera Agri Nusantara
          </motion.p>

          {/* Heading */}
          <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
            <h2
              style={{
                fontWeight: 800,
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                margin: 0,
                color: '#0a2540',
              }}
            >
              <span
                style={{
                  color: '#059669',
                  position: 'relative',
                  display: 'inline-block',
                }}
              >
                Pangan dan
                {/* Underline accent */}
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: 0, bottom: -4,
                    width: '100%', height: 3,
                    background: 'linear-gradient(to right, #10b981, #059669)',
                    borderRadius: 2,
                  }}
                />
              </span>
              <br />
              <span style={{ color: '#0a2540' }}>Pemberdayaan</span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(0.85rem, 1.05vw, 0.95rem)',
              lineHeight: 1.8,
              color: '#64748b',
              marginBottom: 32,
            }}
          >
            Pemanfaatan potensi serta pengembangan teknologi pertanian dan peternakan untuk meningkatkan nilainya dan <strong style={{ color: '#0a2540' }}>memberdayakan masyarakat</strong> sekitar secara mandiri dan berkelanjutan.
          </motion.p>

          {/* Divider */}
          <motion.div
            variants={fadeUp}
            style={{
              height: 1,
              background: 'linear-gradient(to right, #e2e8f0 0%, transparent 80%)',
              marginBottom: 28,
            }}
          />

          {/* Specs grid */}
          <motion.div
            variants={containerV}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px 24px',
              marginBottom: 36,
            }}
          >
            {SPECS.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                style={{ display: 'flex', flexDirection: 'column', gap: 3 }}
              >
                <span style={{
                  fontWeight: 600,
                  fontSize: 'clamp(0.58rem, 0.72vw, 0.65rem)',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                }}>
                  {s.label}
                </span>
                <span style={{
                  fontWeight: 700,
                  fontSize: 'clamp(0.9rem, 1.15vw, 1.05rem)',
                  color: '#0a2540',
                  letterSpacing: '-0.01em',
                }}>
                  {s.value}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <Link
              to="/divisi/lentera-agri-nusantara"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontWeight: 700,
                fontSize: 'clamp(0.82rem, 0.98vw, 0.9rem)',
                color: '#059669',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                borderBottom: '2px solid #10b981',
                paddingBottom: 4,
                transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              Jelajahi divisi Lentera Agri Nusantara
              <HiArrowRight size={15} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
