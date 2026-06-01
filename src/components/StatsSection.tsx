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
   Types & data
───────────────────────────────────────────── */

interface Stat {
  index: string
  value: string
  numericTarget?: number
  suffix?: string
  label: string
  sublabel: string
}

const STATS: Stat[] = [
  {
    index: '01',
    value: '1.100+',
    numericTarget: 1100,
    suffix: '+',
    label: 'Mahasiswa Berkarya',
    sublabel:
      'Lebih dari seribu mahasiswa dari berbagai universitas telah melakukan riset dan transfer knowledge langsung di lapangan.',
  },
  {
    index: '02',
    value: 'PLN & PJB',
    label: 'Mitra Strategis BUMN',
    sublabel:
      'Kepercayaan dua perusahaan energi nasional terbesar membuktikan kapabilitas teknologi dan rekam jejak kami.',
  },
  {
    index: '03',
    value: 'Ciheras',
    label: 'Pantai Tasikmalaya, Jabar',
    sublabel:
      'Situs riset dan operasional kami berdiri di tepi pantai berpotensi angin tinggi, menjadi ekosistem energi terpadu.',
  },
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ─────────────────────────────────────────────
   Animation variants
───────────────────────────────────────────── */

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
}

const revealLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.55, ease: EASE } },
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="stats"
      ref={ref}
      className="relative bg-white overflow-hidden"
      style={{ borderTop: '3px solid #5ab0d6' }}
    >
      <div
        className="relative z-10 mx-auto"
        style={{ maxWidth: '1400px', padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}
      >
        {/* ── Section header ── */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="font-semibold uppercase tracking-[0.28em] mb-3"
              style={{ fontSize: 'clamp(0.6rem, 0.85vw, 0.7rem)', color: '#5ab0d6' }}
            >
              Dalam Angka
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-bold leading-[1.1] m-0"
              style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.25rem)', letterSpacing: '-0.03em', color: '#0a2540' }}
            >
              <span style={{ color: '#0a2540' }}>Bukan sekadar rencana —</span><br />
              <span style={{ color: '#0c6b96' }}>ini jejaknya.</span>
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            className="text-slate-500 leading-[1.75] lg:max-w-[380px]"
            style={{ fontSize: 'clamp(0.82rem, 1.05vw, 0.9rem)' }}
          >
            Setiap angka di bawah ini adalah hasil kerja nyata — dari pantai,
            laboratorium lapangan, hingga ruang diskusi bersama komunitas lokal
            dan mahasiswa.
          </motion.p>
        </motion.div>

        {/* ── Stats grid ── */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-100"
        >
          {STATS.map((stat) => (
            <StatCard key={stat.index} stat={stat} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Stat card
───────────────────────────────────────────── */

function StatCard({ stat, inView }: { stat: Stat; inView: boolean }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex flex-col gap-5 cursor-default bg-white hover:bg-[#f0f8fc] transition-colors duration-300"
      style={{ padding: 'clamp(2rem, 3vw, 3rem) clamp(1.5rem, 2.5vw, 2.5rem)' }}
    >
      {/* Hover accent line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"
        style={{ background: '#5ab0d6', transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      />

      {/* Index */}
      <span
        className="font-semibold"
        style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)', color: '#5ab0d6', letterSpacing: '0.18em' }}
      >
        {stat.index}
      </span>

      {/* Value */}
      <div
        className="font-bold text-[#0a2540] leading-none"
        style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', letterSpacing: '-0.04em' }}
      >
        {stat.numericTarget !== undefined ? (
          <CountUp target={stat.numericTarget} suffix={stat.suffix ?? ''} inView={inView} />
        ) : (
          stat.value
        )}
      </div>

      {/* Divider */}
      <motion.div
        variants={revealLine}
        className="origin-left h-px w-full"
        style={{ background: 'linear-gradient(to right, #5ab0d6 0%, #e2e8f0 60%)' }}
      />

      {/* Label + sublabel */}
      <div>
        <p
          className="font-semibold text-[#0a2540] mb-2"
          style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', letterSpacing: '-0.01em' }}
        >
          {stat.label}
        </p>
        <p
          className="text-slate-400 leading-[1.7]"
          style={{ fontSize: 'clamp(0.75rem, 0.9vw, 0.825rem)' }}
        >
          {stat.sublabel}
        </p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Count-up
───────────────────────────────────────────── */

function CountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const count = useMotionValue(0)
  const display = useTransform(count, (v) => Math.round(v).toLocaleString('id-ID'))

  useEffect(() => {
    if (!inView) return
    count.set(0)
    const ctrl = animate(count, target, {
      duration: 2.0,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    })
    return ctrl.stop
  }, [inView, count, target])

  return <span><motion.span>{display}</motion.span>{suffix}</span>
}
