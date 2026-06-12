import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

interface Proyek {
  id:               string
  client:           string
  year:             string
  title:            string
  location:         string
  tech:             string
  desc:             string
  tags:             string[]
  image:            string
  imagePlaceholder: string
}

const PROJECTS: Proyek[] = [
  {
    id:               '01',
    client:           'PERTAMINA',
    year:             '2013',
    title:            'PLTB Hybrid Sumba',
    location:         'Pulau Sumba, NTT',
    tech:             'Wind Turbine',
    desc:             'Pembangunan Pembangkit Listrik Tenaga Hybrid (Bayu dan Surya) di Sumba. Instalasi 100 unit turbin angin kapasitas 500 watt (total 50 kW) dan panel surya 20 kW di 4 lokasi.',
    tags:             ['PLTB Hybrid', '100 Unit', 'Sumba NTT'],
    image:            `${import.meta.env.BASE_URL}proyek/cover_sumba.webp`,
    imagePlaceholder: 'linear-gradient(135deg, #062f45 0%, #0c6b96 50%, #1a8fc0 100%)',
  },
  {
    id:               '02',
    client:           'PLN NUSANTARA POWER',
    year:             '2019–2020',
    title:            'PMSG 100 kW & PLTB Hybrid',
    location:         'Ciheras & Tulungagung',
    tech:             'PMSG Generator',
    desc:             'Pembuatan sarana penunjang, riset, dan kajian PLTB Combine System Tenaga Surya di Site Ciheras dan Site PLTA Niyama, Tulungagung. Pengembangan Permanent Magnet Generator 100 kW.',
    tags:             ['PMSG 100 kW', 'PLTB Hybrid', 'PLN NP'],
    image:            `${import.meta.env.BASE_URL}proyek/cover_pmsg_hk.webp`,
    imagePlaceholder: 'linear-gradient(135deg, #0a3d5c 0%, #0e7aaa 50%, #1a9fd4 100%)',
  },
  {
    id:               '03',
    client:           'CeCUR',
    year:             '2024',
    title:            'VAWT & Panel Surya Samarinda',
    location:         'Samarinda, Kalimantan Timur',
    tech:             'VAWT',
    desc:             'Instalasi turbin vertikal 500 watt dan panel surya 500 Wp di Samarinda, dalam program ruang publik berketahanan iklim oleh Center for Climate and Urban Resilience.',
    tags:             ['VAWT', 'Panel Surya', 'Kaltim'],
    image:            `${import.meta.env.BASE_URL}proyek/cover_cecur.webp`,
    imagePlaceholder: 'linear-gradient(135deg, #0e4a35 0%, #0d7c5a 50%, #13a878 100%)',
  },
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ─────────────────────────────────────────────
   Variants
───────────────────────────────────────────── */

const containerV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export default function ProyekSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  const navigate = useNavigate()

  return (
    <section
      id="proyek"
      ref={ref}
      style={{ background: '#f8fafc', position: 'relative', overflow: 'hidden' }}
    >
      {/* Top accent line */}
      <div style={{ height: 3, background: 'linear-gradient(to right, #5ab0d6, #0c6b96, transparent)' }} />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>

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
              fontFamily: 'var(--font-sans)', fontWeight: 600,
              fontSize: 'clamp(0.6rem, 0.8vw, 0.7rem)', color: '#5ab0d6',
              textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 16,
            }}
          >
            Rekam Jejak Proyek
          </motion.p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans)', fontWeight: 700,
                fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', lineHeight: 1.1,
                letterSpacing: '-0.03em', color: '#0a2540', margin: 0,
              }}
            >
              Klien &amp; Proyek yang{' '}
              <span style={{ color: '#0c6b96' }}>Telah Kami Kerjakan</span>
            </motion.h2>

            <motion.button
              variants={fadeUp}
              onClick={() => navigate('/proyek')}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: 'var(--font-sans)', fontWeight: 600,
                fontSize: 'clamp(0.8rem, 0.95vw, 0.875rem)', color: '#0c6b96',
                background: 'none', border: 'none', cursor: 'pointer',
                letterSpacing: '0.01em', flexShrink: 0, padding: 0,
              }}
            >
              Lihat semua proyek
              <HiArrowRight size={15} />
            </motion.button>
          </div>
        </motion.div>

        {/* ── Project cards ── */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(1.25rem, 2vw, 2rem)',
          }}
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Project card
───────────────────────────────────────────── */

function ProjectCard({ project: p }: { project: Proyek }) {
  const navigate = useNavigate()

  return (
    <motion.article
      variants={fadeUp}
      whileHover="hover"
      initial="rest"
      animate="rest"
      style={{
        display: 'flex', flexDirection: 'column',
        background: '#ffffff', borderRadius: 16, overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.25s',
      }}
    >
      {/* Image area */}
      <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
        <motion.img
          src={p.image}
          alt={p.title}
          variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: -1, background: p.imagePlaceholder }} />
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,18,32,0.65) 0%, transparent 55%)' }} />

        {/* Client badge */}
        <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, padding: '4px 10px' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(0.58rem, 0.72vw, 0.65rem)', color: '#ffffff', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{p.client}</span>
        </div>

        {/* Year badge */}
        <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)', borderRadius: 4, padding: '3px 8px' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.56rem, 0.7vw, 0.62rem)', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.08em' }}>{p.year}</span>
        </div>

        {/* Tech tag */}
        <div style={{ position: 'absolute', bottom: 14, left: 14, background: '#0c6b96', borderRadius: 4, padding: '3px 9px' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.56rem, 0.7vw, 0.62rem)', color: '#ffffff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.tech}</span>
        </div>

        {/* Index */}
        <span style={{ position: 'absolute', bottom: 14, right: 14, fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(0.65rem, 0.8vw, 0.72rem)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}>{p.id}</span>
      </div>

      {/* Card body */}
      <div style={{ padding: 'clamp(1.25rem, 2vw, 1.75rem)', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.68rem, 0.82vw, 0.74rem)', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.16em', margin: 0 }}>{p.location}</p>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.05rem, 1.4vw, 1.3rem)', lineHeight: 1.25, letterSpacing: '-0.02em', color: '#0a2540', margin: 0 }}>{p.title}</h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.8rem, 0.92vw, 0.875rem)', lineHeight: 1.72, color: '#64748b', margin: 0, flex: 1 }}>{p.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
          {p.tags.map((tag) => (
            <span key={tag} style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.68rem', color: '#0c6b96', background: '#eff8fd', borderRadius: 4, padding: '3px 8px', letterSpacing: '0.04em' }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Card footer — hover CTA */}
      <motion.div
        variants={{ rest: { opacity: 0, height: 0 }, hover: { opacity: 1, height: 'auto' } }}
        transition={{ duration: 0.22 }}
        style={{ overflow: 'hidden', borderTop: '1px solid #f1f5f9' }}
      >
        <button
          onClick={() => navigate('/proyek')}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', padding: '0.875rem 1.75rem',
            fontFamily: 'var(--font-sans)', fontWeight: 600,
            fontSize: 'clamp(0.78rem, 0.9vw, 0.85rem)', color: '#0c6b96',
            background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.01em',
          }}
        >
          Lihat detail proyek
          <HiArrowRight size={15} />
        </button>
      </motion.div>
    </motion.article>
  )
}
