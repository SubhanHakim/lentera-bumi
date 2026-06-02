import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { LuWind, LuZap, LuCpu, LuDatabase, LuArrowRight } from 'react-icons/lu'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────
   Constants & Animation Variants
───────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: EASE },
  },
  hover: {
    y: -8,
    scale: 1.018,
    transition: { duration: 0.3, ease: EASE },
  },
}

/* ─────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────── */

interface Topik {
  index: string
  title: string
  subtitle: string
  skills: string[]
  icon: React.ReactNode
  accentColor: string
  bgLight: string
  shadowColor: string
}

const TOPIK_DATA: Topik[] = [
  {
    index: '01',
    title: 'Bilah',
    subtitle: 'Blade Design',
    skills: ['Desain Aerodinamika', 'Pemilihan Material', 'Uji Kekuatan'],
    icon: <LuWind size={24} />,
    accentColor: '#0c6b96',
    bgLight: 'rgba(12, 107, 150, 0.05)',
    shadowColor: 'rgba(12, 107, 150, 0.25)',
  },
  {
    index: '02',
    title: 'Generator',
    subtitle: 'Electromagnetic Design',
    skills: ['Prinsip Elektromagnetik', 'Desain Stator-Rotor', 'Pengujian Performa'],
    icon: <LuZap size={24} />,
    accentColor: '#10b981',
    bgLight: 'rgba(16, 185, 129, 0.05)',
    shadowColor: 'rgba(16, 185, 129, 0.25)',
  },
  {
    index: '03',
    title: 'Controller',
    subtitle: 'Control System',
    skills: ['Sistem Kontrol Turbin', 'Elektronika Daya', 'Pemrograman'],
    icon: <LuCpu size={24} />,
    accentColor: '#d97706',
    bgLight: 'rgba(217, 119, 6, 0.05)',
    shadowColor: 'rgba(217, 119, 6, 0.25)',
  },
  {
    index: '04',
    title: 'Data Logger',
    subtitle: 'Monitoring System',
    skills: ['Sensor & Akuisisi Data', 'Monitoring Real-time', 'Analisis Performa'],
    icon: <LuDatabase size={24} />,
    accentColor: '#7c3aed',
    bgLight: 'rgba(124, 58, 237, 0.05)',
    shadowColor: 'rgba(124, 58, 237, 0.25)',
  },
]

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */

export default function TopikKuasaiSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      id="topik-kuasai"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: '#ffffff',
        borderTop: '3px solid #5ab0d6',
        padding: 'clamp(4rem, 7vw, 7rem) 0',
      }}
    >
      {/* Background Dot Texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.35,
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
        {/* ── Section Header ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <motion.p
              variants={fadeUpVariants}
              className="font-semibold uppercase tracking-[0.28em] mb-3"
              style={{ fontSize: 'clamp(0.6rem, 0.85vw, 0.7rem)', color: '#0c6b96' }}
            >
              Kompetensi Teknik EBT
            </motion.p>
            <motion.h2
              variants={fadeUpVariants}
              className="font-bold leading-[1.1] m-0"
              style={{
                fontSize: 'clamp(1.9rem, 3.8vw, 3.25rem)',
                letterSpacing: '-0.035em',
                color: '#0a2540',
              }}
            >
              4 Topik Utama <br className="hidden sm:inline" />
              Yang Kami <span style={{ color: '#0c6b96' }}>Kuasai</span>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUpVariants}
            className="text-slate-500 leading-[1.75] lg:max-w-[420px]"
            style={{ fontSize: 'clamp(0.82rem, 1.05vw, 0.9rem)', margin: 0 }}
          >
            Penguasaan teknologi hulu-ke-hilir untuk kemandirian energi baru terbarukan (EBT) Nusantara — klik pada topik untuk melihat detail deskripsi di halaman Ciheras University.
          </motion.p>
        </motion.div>

        {/* ── Topics Cards Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TOPIK_DATA.map((topik) => (
            <motion.div
              key={topik.index}
              variants={fadeUpVariants}
              whileHover="hover"
            >
              <Link
                to="/divisi/ciheras-university"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '32px 28px',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.25s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.01)',
                }}
                className="group"
              >
                {/* Accent border top bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: topik.accentColor,
                    transform: 'scaleX(0.7)',
                    transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className="group-hover:scale-x-100"
                />

                {/* Top Row: Index + Icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 800,
                      fontSize: '1.25rem',
                      color: 'rgba(10, 37, 64, 0.15)',
                      letterSpacing: '-0.02em',
                      transition: 'color 0.25s ease',
                    }}
                    className="group-hover:color-navy"
                  >
                    {topik.index}
                  </span>
                  
                  {/* Icon Wrapper */}
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: topik.bgLight,
                      color: topik.accentColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 0 0 ${topik.shadowColor}`,
                      transition: 'all 0.3s ease',
                    }}
                    className="group-hover:scale-110 group-hover:bg-opacity-100"
                  >
                    {topik.icon}
                  </div>
                </div>

                {/* Headline Text */}
                <div style={{ flexGrow: 1, marginBottom: 28 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      color: '#0a2540',
                      margin: '0 0 6px 0',
                    }}
                  >
                    {topik.title}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 500,
                      fontSize: '0.78rem',
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: 20,
                    }}
                  >
                    {topik.subtitle}
                  </div>

                  {/* Skills/Tags List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {topik.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          fontSize: '0.825rem',
                          color: '#475569',
                        }}
                      >
                        {/* Dot Bullet */}
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: topik.accentColor,
                            flexShrink: 0,
                            opacity: 0.7,
                          }}
                        />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Link */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 18,
                    borderTop: '1px solid #f1f5f9',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#64748b',
                    transition: 'color 0.25s ease',
                  }}
                  className="group-hover:text-slate-800"
                >
                  <span>Lihat Detail Deskripsi</span>
                  <motion.span
                    style={{ color: topik.accentColor, display: 'inline-flex' }}
                    animate={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <LuArrowRight size={14} />
                  </motion.span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
