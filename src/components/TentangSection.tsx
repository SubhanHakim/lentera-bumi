import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { LuWind, LuSprout, LuGraduationCap, LuArrowRight } from 'react-icons/lu'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────
   Constants & Animation Variants
───────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
  hover: {
    y: -6,
    scale: 1.015,
    transition: { duration: 0.3, ease: EASE },
  },
}


/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */

interface PillarCardProps {
  title: string
  desc: string
  icon: React.ReactNode
  link: string
  color: string
  bgLight: string
  accentColor: string
}

const PILLARS: PillarCardProps[] = [
  {
    title: 'Energi Terbarukan',
    desc: 'Pengembangan turbin angin skala mikro-menengah di pesisir Pantai Ciheras.',
    icon: <LuWind size={20} />,
    link: '/divisi/lentera-energi',
    color: '#0c6b96',
    bgLight: 'rgba(12, 107, 150, 0.05)',
    accentColor: '#5ab0d6',
  },
  {
    title: 'Pangan & Pertanian',
    desc: 'Pemberdayaan pertanian lokal dan peternakan domba terintegrasi.',
    icon: <LuSprout size={20} />,
    link: '/divisi/lentera-agri-nusantara',
    color: '#059669',
    bgLight: 'rgba(5, 150, 105, 0.05)',
    accentColor: '#10b981',
  },
  {
    title: 'Pendidikan & Riset',
    desc: 'Pusat transfer knowledge lapangan bagi ribuan mahasiswa seluruh Indonesia.',
    icon: <LuGraduationCap size={20} />,
    link: '/divisi/ciheras-university',
    color: '#7c3aed',
    bgLight: 'rgba(124, 58, 237, 0.05)',
    accentColor: '#8b5cf6',
  },
]

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */

export default function TentangSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.25 })

  return (
    <section
      id="tentang"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: '#f8fafc',
        borderTop: '3px solid #059669', // Match the teal-green from the eyebrow
        padding: 'clamp(4rem, 7vw, 7rem) 0',
      }}
    >
      {/* Subtle Background Patterns */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(5, 150, 105, 0.03) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '35vw',
          height: '35vw',
          background: 'radial-gradient(circle, rgba(12, 107, 150, 0.03) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        className="relative z-10 mx-auto"
        style={{
          maxWidth: '1400px',
          width: '100%',
          padding: '0 clamp(1.5rem, 5vw, 5rem)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brief Introduction Text */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-start"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {/* Section Tag */}
            <motion.p
              variants={fadeUpVariants}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(0.65rem, 0.85vw, 0.75rem)',
                color: '#059669', // Visual match with the image's green color
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                margin: '0 0 16px 0',
              }}
            >
              TENTANG KAMI
            </motion.p>

            {/* Main Headline */}
            <div style={{ overflow: 'hidden', marginBottom: 28 }}>
              <motion.h2
                variants={fadeUpVariants}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 3.8vw, 3.25rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#0a2540',
                  margin: 0,
                }}
              >
                Membangun Diri,<br />
                <span
                  style={{
                    color: '#0c6b96',
                    fontStyle: 'italic',
                    fontWeight: 600,
                  }}
                >
                  Membangun Negeri
                </span>
              </motion.h2>
            </div>

            {/* Paragraph Text */}
            <motion.p
              variants={fadeUpVariants}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                lineHeight: 1.85,
                color: '#475569',
                maxWidth: '540px',
                margin: '0 0 32px 0',
              }}
            >
              Lentera Bumi Nusantara adalah bisnis sosial yang bergerak di bidang
              energi terbarukan, pangan, dan pendidikan. Berawal dari gerakan
              Lentera Angin Nusantara (LAN) di pesisir Ciheras, Tasikmalaya, kami
              membangun ekosistem yang menghubungkan teknologi, komunitas, dan
              generasi muda dalam satu gerakan yang saling menguatkan.
            </motion.p>

            {/* Learn More link */}
            <motion.div variants={fadeUpVariants}>
              <Link
                to="/about"
                className="group"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: '#059669',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
              >
                Selengkapnya Tentang Kami
                <motion.span
                  className="inline-flex"
                  animate={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  style={{ color: '#059669' }}
                >
                  <LuArrowRight size={16} />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: 3 Pillars Cards */}
          <motion.div
            className="lg:col-span-6 flex flex-col gap-5 w-full"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {PILLARS.map((pillar, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpVariants}
                whileHover="hover"
                custom={idx}
              >
                <Link
                  to={pillar.link}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    textDecoration: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.01)',
                  }}
                  className="group"
                >
                  {/* Subtle hover background accent */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      width: '4px',
                      background: pillar.accentColor,
                      transition: 'transform 0.3s ease',
                      transform: 'scaleY(0.7)',
                    }}
                    className="group-hover:scale-y-100"
                  />

                  {/* Icon Container */}
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: pillar.bgLight,
                      color: pillar.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.3s ease',
                    }}
                    className="group-hover:bg-opacity-100 group-hover:scale-105"
                  >
                    {pillar.icon}
                  </div>

                  {/* Text Details */}
                  <div style={{ flexGrow: 1, textAlign: 'left' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        color: '#0a2540',
                        margin: '0 0 4px 0',
                        transition: 'color 0.2s ease',
                      }}
                      className="group-hover:text-slate-800"
                    >
                      {pillar.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.825rem',
                        lineHeight: 1.6,
                        color: '#64748b',
                        margin: 0,
                      }}
                    >
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div
                    style={{
                      color: '#94a3b8',
                      transition: 'all 0.25s ease',
                      transform: 'translateX(0)',
                    }}
                    className="group-hover:translate-x-2 group-hover:color-[#0a2540]"
                  >
                    <LuArrowRight size={18} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
