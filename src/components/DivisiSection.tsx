import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.08 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

interface Divisi {
  id: string
  category: string
  title: string
  desc: string
  image: string
  imagePlaceholder: string
  featured?: boolean
}

const DIVISI: Divisi[] = [
  {
    id: '01',
    category: 'Energi Terbarukan',
    title: 'Lentera Energi Nusantara',
    desc: 'Riset dan pengembangan teknologi pembangkit listrik tenaga angin skala mikro — bilah, generator, controller, hingga data logger — untuk kemandirian energi Indonesia.',
    image: `${import.meta.env.BASE_URL}divisi_energi.jpg`,
    imagePlaceholder: 'linear-gradient(160deg, #041c2e 0%, #0a4f75 55%, #0c6b96 100%)',
    featured: true,
  },
  {
    id: '02',
    category: 'Pertanian & Peternakan',
    title: 'Lentera Agri Nusantara',
    desc: 'Inovasi teknologi pertanian dan peternakan untuk meningkatkan produktivitas dan memberdayakan masyarakat sekitar.',
    image: `${import.meta.env.BASE_URL}divisi_agri.jpg`,
    imagePlaceholder: 'linear-gradient(160deg, #0a2218 0%, #0f5c35 55%, #18874f 100%)',
  },
  {
    id: '03',
    category: 'Pendidikan & Riset',
    title: 'Ciheras University',
    desc: 'Platform pembelajaran terbuka untuk mencetak generasi inovator energi masa depan langsung dari lapangan.',
    image: `${import.meta.env.BASE_URL}divisi_university.jpeg`,
    imagePlaceholder: 'linear-gradient(160deg, #0c1e30 0%, #0a3d5c 55%, #0e5c8a 100%)',
  },
]

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

export default function DivisiSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <section
      id="divisi"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#f0f7fb', borderTop: '3px solid #5ab0d6' }}
    >
      <div
        style={{
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
          className="mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="font-semibold uppercase tracking-[0.28em] mb-3"
              style={{ fontSize: 'clamp(0.6rem, 0.85vw, 0.7rem)', color: '#5ab0d6' }}
            >
              Divisi Kami
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-bold leading-[1.1] m-0"
              style={{
                fontSize: 'clamp(1.9rem, 3.8vw, 3.25rem)',
                letterSpacing: '-0.03em',
                color: '#0a2540',
              }}
            >
              Tiga Divisi{' '}
              <span style={{ color: '#0c6b96' }}>Utama</span>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="text-slate-500 leading-[1.75] lg:max-w-[400px]"
            style={{ fontSize: 'clamp(0.82rem, 1.05vw, 0.9rem)' }}
          >
            Energi, pangan, dan pendidikan sebagai fondasi utama dalam menghadirkan
            solusi berkelanjutan untuk mendukung kemandirian dan kemajuan Nusantara.
          </motion.p>
        </motion.div>

        {/* ── Asymmetric grid ── */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-4 lg:gap-5"
          style={{ gridTemplateRows: 'auto' }}
        >
          {DIVISI.map((d) => (
            <DivisiCard key={d.id} divisi={d} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Card
───────────────────────────────────────────── */

function DivisiCard({ divisi: d }: { divisi: Divisi }) {
  const featured = d.featured === true

  return (
    <motion.div
      variants={fadeUp}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={featured ? 'lg:row-span-2' : ''}
      style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        minHeight: featured
          ? 'clamp(380px, 52vw, 620px)'
          : 'clamp(200px, 22vw, 290px)',
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(0,0,0,0.10), 0 12px 40px rgba(0,0,0,0.08)',
      }}
    >
      {/* Gradient placeholder — always behind */}
      <div
        aria-hidden
        style={{ position: 'absolute', inset: 0, background: d.imagePlaceholder }}
      />

      {/* Background image */}
      <motion.img
        src={d.image}
        alt={d.title}
        variants={{ rest: { scale: 1 }, hover: { scale: 1.07 } }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />

      {/* Base overlay — always present */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: featured
            ? 'linear-gradient(to top, rgba(4,18,32,0.90) 0%, rgba(4,18,32,0.45) 45%, rgba(4,18,32,0.12) 100%)'
            : 'linear-gradient(to top, rgba(4,18,32,0.88) 0%, rgba(4,18,32,0.50) 55%, rgba(4,18,32,0.15) 100%)',
        }}
      />

      {/* Hover teal tint */}
      <motion.div
        aria-hidden
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute', inset: 0, zIndex: 3,
          background: 'linear-gradient(160deg, rgba(12,107,150,0.22) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 4,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          padding: featured
            ? 'clamp(1.5rem, 2.5vw, 2rem)'
            : 'clamp(1.25rem, 2vw, 1.6rem)',
        }}
      >
        {/* Top row — number + category badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: 'clamp(0.6rem, 0.75vw, 0.68rem)',
              color: '#5ab0d6',
              letterSpacing: '0.22em',
            }}
          >
            {d.id}
          </span>
          <span
            style={{
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 6,
              padding: '3px 10px',
              fontWeight: 600,
              fontSize: 'clamp(0.56rem, 0.7vw, 0.62rem)',
              color: 'rgba(255,255,255,0.9)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
            }}
          >
            {d.category}
          </span>
        </div>

        {/* Bottom — title + desc + CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <motion.h3
            variants={{ rest: { y: 0 }, hover: { y: -4 } }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{
              fontWeight: 700,
              fontSize: featured
                ? 'clamp(1.4rem, 2.2vw, 2rem)'
                : 'clamp(1.05rem, 1.4vw, 1.25rem)',
              lineHeight: 1.18,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: 0,
            }}
          >
            {d.title}
          </motion.h3>

          <motion.p
            variants={{ rest: { opacity: 0.65 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: featured
                ? 'clamp(0.82rem, 0.98vw, 0.9rem)'
                : 'clamp(0.75rem, 0.88vw, 0.82rem)',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.8)',
              margin: 0,
            }}
          >
            {d.desc}
          </motion.p>

          {/* CTA + accent line */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
            <motion.span
              variants={{ rest: { opacity: 0, x: -8 }, hover: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.3, delay: 0.05 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontWeight: 600,
                fontSize: 'clamp(0.72rem, 0.85vw, 0.78rem)',
                color: '#5ab0d6',
                letterSpacing: '0.04em',
              }}
            >
              Selengkapnya <HiArrowRight size={13} />
            </motion.span>

            <motion.div
              variants={{ rest: { scaleX: 0, opacity: 0 }, hover: { scaleX: 1, opacity: 1 } }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{
                height: 2, width: 48,
                background: '#5ab0d6',
                borderRadius: 1,
                transformOrigin: 'right',
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
