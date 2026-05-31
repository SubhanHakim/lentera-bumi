import { useEffect, useRef } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  type Variants,
} from 'framer-motion'

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

interface Kontribusi {
  numericTarget: number
  suffix: string
  label: string
  desc: string
  color: string
}

const DATA: Kontribusi[] = [
  {
    numericTarget: 1050,
    suffix: '+',
    label: 'Mahasiswa',
    desc: 'Mahasiswa dari berbagai universitas telah berkarya dan melakukan riset langsung di Pantai Ciheras.',
    color: '#0c6b96',
  },
  {
    numericTarget: 3,
    suffix: '+',
    label: 'Desa Teraliri Listrik',
    desc: 'Desa di sekitar Ciheras kini menikmati akses energi bersih dari turbin angin yang kami bangun.',
    color: '#0e8a6e',
  },
  {
    numericTarget: 21100,
    suffix: '+',
    label: 'KK Penerima Qurban',
    desc: 'Kepala keluarga di wilayah pesisir telah menerima manfaat nyata dari program sosial LBN.',
    color: '#b45309',
  },
  {
    numericTarget: 50,
    suffix: '+',
    label: 'Lapangan Pekerjaan',
    desc: 'Warga lokal Ciheras mendapat pekerjaan dan mitra usaha langsung dari ekosistem Lentera Bumi Nusantara.',
    color: '#7c3aed',
  },
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ─────────────────────────────────────────────
   Variants
───────────────────────────────────────────── */

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function KontribusiSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section
      id="kontribusi"
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #041220 0%, #062030 45%, #0a3350 100%)',
      }}
    >
      {/* Subtle grid texture */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'linear-gradient(rgba(90,176,214,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(90,176,214,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          zIndex: 0,
        }}
      />

      {/* Radial glow — top-left */}
      <div
        aria-hidden
        style={{
          position: 'absolute', top: '-10%', left: '-5%',
          width: '50%', height: '70%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(12,107,150,0.18) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative', zIndex: 1,
          maxWidth: 1400,
          margin: '0 auto',
          padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
        }}
      >
        {/* ── Header ── */}
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
              fontSize: 'clamp(0.6rem, 0.8vw, 0.7rem)',
              color: '#5ab0d6',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              marginBottom: 16,
            }}
          >
            Angka Kontribusi
          </motion.p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 3.8vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Kontribusi{' '}
              <span style={{ color: '#5ab0d6' }}>Kami</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.875rem, 1.05vw, 0.95rem)',
                lineHeight: 1.78,
                color: 'rgba(255,255,255,0.52)',
                margin: 0,
                maxWidth: 520,
              }}
            >
              Dampak yang kami ciptakan bukan hanya soal energi — melainkan
              tentang manusia, komunitas, dan masa depan yang lebih berdaya.
            </motion.p>
          </div>
        </motion.div>

        {/* ── Cards grid ── */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(1rem, 1.5vw, 1.5rem)',
          }}
        >
          {DATA.map((item) => (
            <KontribusiCard key={item.label} item={item} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Card
───────────────────────────────────────────── */

function KontribusiCard({ item, inView }: { item: Kontribusi; inView: boolean }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.07)' }}
      transition={{ duration: 0.22 }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: 'clamp(1.75rem, 2.5vw, 2.5rem)',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        backdropFilter: 'blur(8px)',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 3,
          background: item.color,
          opacity: 0.85,
          borderRadius: '16px 16px 0 0',
        }}
      />

      {/* Big count-up number */}
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 'clamp(2.6rem, 4.5vw, 4rem)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: '#ffffff',
        }}
      >
        <CountUp target={item.numericTarget} suffix={item.suffix} inView={inView} accentColor={item.color} />
      </div>

      {/* Thin divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />

      {/* Label + desc */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: 'clamp(0.875rem, 1.05vw, 1rem)',
          color: '#ffffff',
          margin: 0,
          letterSpacing: '-0.01em',
        }}>
          {item.label}
        </p>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(0.775rem, 0.9vw, 0.85rem)',
          lineHeight: 1.72,
          color: 'rgba(255,255,255,0.45)',
          margin: 0,
        }}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Count-up
───────────────────────────────────────────── */

function CountUp({
  target,
  suffix,
  inView,
  accentColor,
}: {
  target: number
  suffix: string
  inView: boolean
  accentColor: string
}) {
  const count = useMotionValue(0)
  const display = useTransform(count, (v) => Math.round(v).toLocaleString('id-ID'))
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const ctrl = animate(count, target, {
      duration: target > 1000 ? 2.2 : 1.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    })
    return ctrl.stop
  }, [inView, count, target])

  return (
    <span>
      <motion.span>{display}</motion.span>
      <span style={{ color: accentColor }}>{suffix}</span>
    </span>
  )
}
