import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { LuArrowRight, LuMapPin, LuWind, LuSun, LuSchool } from 'react-icons/lu'
import { Link, useLocation } from 'react-router-dom'

/* ─────────────────────────────────────────────
   Constants & Animation Variants
───────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: EASE },
  },
}

const fadeRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE },
  },
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */

export default function SiteCiherasSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.25 })
  const location = useLocation()
  const isAboutPage = location.pathname.includes('/about')

  return (
    <section
      id="site-ciheras"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: '#ffffff', // Clean white background to alternate with ProyekSection's off-white #f8fafc
      }}
    >
      {/* Subtle Background Pattern */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '35vw',
          height: '35vw',
          background: 'radial-gradient(circle, rgba(12, 107, 150, 0.02) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)', // Standard padding matching homepage sections
        }}
        className="relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Description & Title */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-start"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {/* Eyebrow */}
            <motion.div
              variants={fadeUpVariants}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 16,
              }}
            >
              <LuMapPin size={14} style={{ color: '#0c6b96' }} />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: 'clamp(0.65rem, 0.85vw, 0.75rem)',
                  color: '#0c6b96',
                  textTransform: 'uppercase',
                  letterSpacing: '0.22em',
                }}
              >
                KAWASAN OPERASIONAL
              </span>
            </motion.div>

            {/* Title */}
            <div style={{ overflow: 'hidden', marginBottom: 24 }}>
              <motion.h2
                variants={fadeUpVariants}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 3.8vw, 3.25rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  color: '#0a2540',
                  margin: 0,
                }}
              >
                Site <span style={{ color: '#0c6b96', fontStyle: 'italic', fontWeight: 600 }}>Ciheras</span>
              </motion.h2>
            </div>

            {/* Description Text */}
            <motion.p
              variants={fadeUpVariants}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                lineHeight: 1.85,
                color: '#64748b',
                maxWidth: '480px',
                margin: '0 0 28px 0',
              }}
            >
              Lentera Bumi Nusantara mengembangkan kawasan pembelajaran energi terbarukan di Ciheras yang mencakup turbin angin skala mikro, sistem tenaga surya, serta fasilitas penelitian lapangan.
            </motion.p>

            {/* Mini Core Facilities Bullet List */}
            <motion.div
              variants={fadeUpVariants}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px 24px',
                marginBottom: 36,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
                <LuWind size={15} style={{ color: '#0c6b96' }} />
                <span>Skala Mikro</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
                <LuSun size={15} style={{ color: '#0c6b96' }} />
                <span>Tenaga Surya</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
                <LuSchool size={15} style={{ color: '#0c6b96' }} />
                <span>Riset Lapangan</span>
              </div>
            </motion.div>

            {/* Premium Call to Action */}
            {!isAboutPage && (
              <motion.div variants={fadeUpVariants}>
                <Link
                  to="/about"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    background: '#0c6b96',
                    borderRadius: '9999px',
                    padding: '14px 28px',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(12, 107, 150, 0.15)',
                    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#0a4a6e'
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(12, 107, 150, 0.3)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#0c6b96'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(12, 107, 150, 0.15)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Pelajari Tentang Kami
                  <LuArrowRight size={16} />
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column: High-impact single image with technical border accents */}
          <motion.div
            className="lg:col-span-7"
            variants={fadeRightVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            style={{ position: 'relative' }}
          >
            {/* Corner accent — top left (overlaps image edge) */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 14,
                left: 14,
                width: 44,
                height: 44,
                borderTop: '3px solid #0c6b96',
                borderLeft: '3px solid #0c6b96',
                borderRadius: '6px 0 0 0',
                zIndex: 3,
                pointerEvents: 'none',
              }}
            />

            {/* Corner accent — bottom right (overlaps image edge) */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 14,
                right: 14,
                width: 44,
                height: 44,
                borderBottom: '3px solid #0c6b96',
                borderRight: '3px solid #0c6b96',
                borderRadius: '0 0 6px 0',
                zIndex: 3,
                pointerEvents: 'none',
              }}
            />

            {/* Image Container */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)',
                aspectRatio: '4 / 3',
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}site_ciheras.webp`}
                alt="Operasional Site Ciheras"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />

              {/* Subtle bottom gradient */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(4, 18, 32, 0.55), transparent)',
                }}
              />

              {/* Floating Location/Operational Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 18,
                  left: 18,
                  background: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  borderRadius: 8,
                  padding: '6px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#0c6b96',
                    flexShrink: 0,
                    boxShadow: '0 0 6px #5ab0d6',
                  }}
                />
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: 'clamp(0.6rem, 0.75vw, 0.68rem)',
                    color: '#ffffff',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                >
                  SITE OPERASIONAL LBN
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
