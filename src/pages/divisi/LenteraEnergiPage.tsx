import { useRef } from 'react'
import {
  motion, useInView, type Variants,
} from 'framer-motion'
import {
  ArrowRight,
  ZapIcon, ActivityIcon, WindIcon, CircuitBoardIcon,
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import FooterCTA from '../../components/FooterCTA'
import { Badge } from '../../components/ui/badge'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
}

/* ─── Data ─── */

const HIGHLIGHT_PROJECTS = [
  {
    id: '01',
    client: 'PUSLITBANG PLN',
    year: '2018–2019',
    title: 'Generator Permanent Magnet 1 kW',
    location: 'Ciheras, Tasikmalaya',
    tech: 'PMSG 1 kW',
    desc: 'Konsultasi perancangan, pelatihan tim teknis, pembuatan prototipe, dan pengujian performa Generator Permanent Magnet kapasitas 1 kW. Program ini mencakup transfer teknologi penuh kepada tim PLN.',
    tags: ['PMSG 1 kW', 'Transfer Teknologi', 'Pelatihan', 'Pengujian'],
    image: `${import.meta.env.BASE_URL}kegiatan/kegiatan_tim_lapangan.webp`,
    placeholder: 'linear-gradient(135deg, #062030 0%, #0c6b96 100%)',
  },
  {
    id: '02',
    client: 'PT PJB',
    year: '2019',
    title: 'Turbin Angin 100 kW',
    location: 'Ciheras, Tasikmalaya',
    tech: 'Wind Turbine 100 kW',
    desc: 'Riset dan pengembangan turbin angin kapasitas 100 kW meliputi desain mekanik struktur rotor, uji aerodinamika bilah, serta pengujian kekuatan dan ketahanan bilah di kondisi lapangan nyata.',
    tags: ['Turbin 100 kW', 'Desain Mekanik', 'Uji Aerodinamika', 'Uji Kekuatan Bilah'],
    image: `${import.meta.env.BASE_URL}kegiatan/kegiatan_instalasi_turbin.webp`,
    placeholder: 'linear-gradient(135deg, #0a3d5c 0%, #1a6fa0 100%)',
  },
  {
    id: '03',
    client: 'PT PJB + PT HUTAMA KARYA',
    year: '2020',
    title: 'Generator Permanent Magnet 100 kW',
    location: 'Ciheras, Tasikmalaya',
    tech: 'PMSG 100 kW',
    desc: 'Kolaborasi riset dan produksi Generator Permanent Magnet 100 kW mencakup desain elektromagnetik, desain mekanik, serta produksi 1 unit lengkap yang siap uji. Proyek ini menarik PT Hutama Karya untuk bergabung setelah melihat hasil kerja bersama PT PJB.',
    tags: ['PMSG 100 kW', 'Desain Elektromagnetik', 'Desain Mekanik', 'Produksi Unit'],
    image: `${import.meta.env.BASE_URL}kegiatan/kegiatan_vawt_tower.webp`,
    placeholder: 'linear-gradient(135deg, #1a2030 0%, #0a4060 50%, #0e6b50 100%)',
  },
]

const CORE_TECH = [
  { icon: ZapIcon,          label: 'Generator' },
  { icon: ActivityIcon,     label: 'Data Logger' },
  { icon: CircuitBoardIcon, label: 'Controller' },
  { icon: WindIcon,         label: 'Bilah' },
]


/* ─── Page ─── */

export default function LenteraEnergiPage() {
  const tekRef      = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  const tekInView      = useInView(tekRef,      { once: true, amount: 0.15 })
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.1 })

  return (
    <>
      <Navbar />
      <main>

        {/* ══ Hero ══ */}
        <section
          style={{
            position: 'relative',
            minHeight: '100svh',
            overflow: 'hidden',
          }}
        >
          {/* Background image */}
          <div
            aria-hidden
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundImage: `url(${import.meta.env.BASE_URL}divisi_energi.webp)`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}
          />

          {/* Overlays — same pattern as HeroSection */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to top, rgba(3,12,24,0.97) 0%, rgba(4,16,32,0.85) 25%, rgba(5,20,40,0.52) 50%, rgba(6,24,48,0.2) 70%, transparent 88%)',
          }} />
          <div aria-hidden style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to right, rgba(3,12,24,0.72) 0%, rgba(3,12,24,0.38) 38%, transparent 65%)',
          }} />

          {/* Content — vertically centered like HeroSection */}
          <div style={{
            position: 'relative', zIndex: 10,
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            minHeight: '100svh',
            paddingTop: 'clamp(100px, 12vh, 140px)',
            paddingBottom: 'clamp(40px, 6vh, 80px)',
          }}>
            <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto', padding: '0 clamp(1.75rem, 5vw, 5rem)' }}>
              <motion.div variants={stagger} initial="hidden" animate="show">

                {/* Eyebrow — dot + text, persis seperti HeroSection */}
                <motion.div
                  variants={fadeUp}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}
                >
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                    background: '#5ab0d6',
                    boxShadow: '0 0 8px rgba(90,176,214,0.85)',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                    fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)',
                    color: 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: 'clamp(0.12em, 1.5vw, 0.28em)',
                    minWidth: 0,
                    wordBreak: 'break-word',
                  }}>
                    Divisi 01 · Energi Terbarukan · Lentera Bumi Nusantara
                  </span>
                </motion.div>

                {/* Heading — dua baris staggered */}
                <div style={{ overflow: 'hidden' }}>
                  <motion.h1
                    variants={fadeUp}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
                      lineHeight: 1.07,
                      letterSpacing: '-0.03em',
                      color: '#ffffff',
                      margin: '0 0 4px 0',
                    }}
                  >
                    Lentera Energi
                  </motion.h1>
                </div>
                <div style={{ overflow: 'hidden', marginBottom: 36 }}>
                  <motion.h1
                    variants={fadeUp}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
                      lineHeight: 1.07,
                      letterSpacing: '-0.03em',
                      color: '#5ab0d6',
                      margin: 0,
                    }}
                  >
                    Nusantara
                  </motion.h1>
                </div>

                {/* Accent line */}
                <motion.div
                  variants={{
                    hidden: { scaleX: 0, opacity: 0 },
                    show: { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: EASE } },
                  }}
                  style={{
                    height: 2,
                    width: 'clamp(40px, 4vw, 60px)',
                    background: 'linear-gradient(to right, #5ab0d6, transparent)',
                    transformOrigin: 'left',
                    marginBottom: 40,
                  }}
                />

                {/* CTA — motion.a langsung, konsisten dengan Navbar & HeroSection */}
                <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <motion.a
                    href="#teknologi"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById('teknologi')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      fontSize: 'clamp(0.82rem, 0.95vw, 0.9rem)',
                      color: '#041c2e',
                      background: '#5ab0d6',
                      borderRadius: 999,
                      padding: 'clamp(0.6rem, 1vw, 0.75rem) clamp(1.5rem, 2vw, 2rem)',
                      letterSpacing: '0.02em',
                      textDecoration: 'none',
                    }}
                  >
                    Lihat Teknologi
                    <ArrowRight size={15} />
                  </motion.a>

                  <motion.a
                    href="#hubungi-kami"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      fontSize: 'clamp(0.82rem, 0.95vw, 0.9rem)',
                      color: 'rgba(255,255,255,0.85)',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      borderRadius: 999,
                      padding: 'clamp(0.6rem, 1vw, 0.75rem) clamp(1.5rem, 2vw, 2rem)',
                      letterSpacing: '0.02em',
                      textDecoration: 'none',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    Hubungi Kami
                  </motion.a>
                </motion.div>

              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ Deskripsi Divisi ══ */}
        <DeskripsiDivisiSection />

        {/* ══ Teknologi Inti ══ */}
        <section
          id="teknologi"
          ref={tekRef}
          className="relative overflow-hidden"
          style={{ background: '#ffffff' }}
        >
          {/* Decorative dot-grid background */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              opacity: 0.45,
            }}
          />
          {/* Soft blue wash — top-right */}
          <div
            aria-hidden
            className="absolute -top-32 -right-32 pointer-events-none rounded-full"
            style={{
              width: 520,
              height: 520,
              background: 'radial-gradient(circle, rgba(90,176,214,0.12) 0%, transparent 70%)',
            }}
          />

          <div
            className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center"
            style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(3.5rem, 6vw, 6rem) clamp(1.5rem, 5vw, 5rem)' }}
          >
            {/* Left — copy */}
            <motion.div variants={stagger} initial="hidden" animate={tekInView ? 'show' : 'hidden'}>
              <motion.div variants={fadeUp} className="mb-5">
                <Badge className="bg-[#5ab0d6]/12 text-[#0c6b96] border-0 h-auto py-1 px-3 text-[0.62rem] tracking-[0.28em] uppercase font-semibold">
                  Divisi Energi Baru Terbarukan
                </Badge>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="font-bold leading-[1.15] m-0"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.03em', color: '#0a2540' }}
              >
                Menguasai, Menerapkan
                <br />
                dan Mengembangkan EBT
              </motion.h2>

              {/* Accent bar — konsisten dengan VisiMisiSection */}
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
                  marginTop: 20,
                  marginBottom: 24,
                }}
              />

              <motion.p
                variants={fadeUp}
                className="text-slate-500 leading-[1.8]"
                style={{ fontSize: 'clamp(0.85rem, 1.05vw, 0.95rem)', maxWidth: 440 }}
              >
                Divisi yang bergerak di bidang penguasaan, penerapan, dan pengembangan
                teknologi pemanfaatan energi baru terbarukan untuk aplikasi di daerah
                tertinggal — dengan fokus pada riset, pendidikan, dan pengembangan teknologi.
              </motion.p>
            </motion.div>

            {/* Right — 2×2 icon grid */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={tekInView ? 'show' : 'hidden'}
              className="grid grid-cols-2 gap-6"
            >
              {CORE_TECH.map((tech, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="flex flex-col items-center gap-3"
                >
                  {/* Circular icon */}
                  <div
                    className="relative flex items-center justify-center rounded-full"
                    style={{
                      width: 'clamp(72px, 8vw, 88px)',
                      height: 'clamp(72px, 8vw, 88px)',
                      background: 'linear-gradient(148deg, #0c2240 0%, #0a4165 60%, #0c5a8a 100%)',
                      boxShadow: '0 6px 24px rgba(10,60,100,0.28), 0 2px 6px rgba(0,0,0,0.12)',
                    }}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-full"
                      style={{ border: '1px solid rgba(90,176,214,0.25)' }}
                    />
                    <tech.icon
                      size={28}
                      color="#e0f2fe"
                      strokeWidth={1.6}
                      className="relative z-10"
                    />
                  </div>

                  <span
                    className="font-semibold text-center"
                    style={{
                      fontSize: 'clamp(0.82rem, 1vw, 0.9rem)',
                      color: '#1e3a52',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {tech.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══ Infrastruktur Energi ══ */}
        <InfrastrukturEnergiSection />

        {/* ══ Monitoring & Research ══ */}
        <MonitoringResearchSection />

        {/* ══ Pembelajaran ══ */}
        <PembelajaranSection />

        {/* ══ Highlight Project ══ */}
        <section ref={projectsRef} style={{ background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
          {/* Top accent line — sama persis dengan ProyekSection */}
          <div style={{ height: 3, background: 'linear-gradient(to right, #5ab0d6, #0c6b96, transparent)' }} />

          <div style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>

            {/* Header — container terpisah dari cards */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={projectsInView ? 'show' : 'hidden'}
              style={{ marginBottom: 'clamp(2.5rem, 4vw, 4rem)' }}
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
                Rekam Jejak Proyek
              </motion.p>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
                <motion.h2
                  variants={fadeUp}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: 'clamp(2rem, 3.8vw, 3.5rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    color: '#0a2540',
                    margin: 0,
                  }}
                >
                  Highlight Project{' '}
                  <span style={{ color: '#0c6b96' }}>EBT</span>
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(0.82rem, 1vw, 0.9rem)',
                    lineHeight: 1.75,
                    color: '#64748b',
                    maxWidth: 380,
                    margin: 0,
                  }}
                >
                  Tiga proyek unggulan yang membuktikan kemampuan kami dalam
                  mengembangkan energi terbarukan — dari riset hingga implementasi
                  nyata di lapangan.
                </motion.p>
              </div>
            </motion.div>

            {/* Cards — container terpisah, cards punya initial/animate sendiri untuk hover */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={projectsInView ? 'show' : 'hidden'}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'clamp(1.25rem, 2vw, 2rem)',
              }}
            >
              {HIGHLIGHT_PROJECTS.map((p) => (
                <motion.article
                  key={p.id}
                  variants={fadeUp}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#ffffff',
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
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
                    {/* Gradient placeholder */}
                    <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: -1, background: p.placeholder }} />
                    {/* Dark overlay */}
                    <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,18,32,0.65) 0%, transparent 55%)' }} />

                    {/* Client badge — top-left */}
                    <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, padding: '4px 10px' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(0.58rem, 0.72vw, 0.65rem)', color: '#ffffff', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{p.client}</span>
                    </div>
                    {/* Year badge — top-right */}
                    <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)', borderRadius: 4, padding: '3px 8px' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.56rem, 0.7vw, 0.62rem)', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.08em' }}>{p.year}</span>
                    </div>
                    {/* Tech tag — bottom-left */}
                    <div style={{ position: 'absolute', bottom: 14, left: 14, background: '#0c6b96', borderRadius: 4, padding: '3px 9px' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.56rem, 0.7vw, 0.62rem)', color: '#ffffff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.tech}</span>
                    </div>
                    {/* Index — bottom-right */}
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

                  {/* Hover CTA footer */}
                  <motion.div
                    variants={{ rest: { opacity: 0, height: 0 }, hover: { opacity: 1, height: 'auto' } }}
                    transition={{ duration: 0.22 }}
                    style={{ overflow: 'hidden', borderTop: '1px solid #f1f5f9' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.75rem', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.78rem, 0.9vw, 0.85rem)', color: '#0c6b96', letterSpacing: '0.01em' }}>
                      Lihat detail proyek
                      <ArrowRight size={15} />
                    </div>
                  </motion.div>
                </motion.article>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ══ Aktivitas Tim ══ */}
        <ActivitySection />

        <FooterCTA />
      </main>
    </>
  )
}


/* ─────────────────────────────────────────────
   Deskripsi Divisi Section
───────────────────────────────────────────── */

function DeskripsiDivisiSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const containerV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
  }

  const FOKUS = ['Riset', 'Pendidikan', 'Pengembangan Teknologi']

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        background: '#ffffff',
        overflow: 'hidden',
        borderTop: '3px solid #5ab0d6',
      }}
    >
      {/* Dot-grid texture */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: 0.3,
      }} />
      {/* Blue glow */}
      <div aria-hidden style={{
        position: 'absolute', top: -80, right: -80, pointerEvents: 'none',
        width: 460, height: 460, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(90,176,214,0.1) 0%, transparent 70%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1400, margin: '0 auto',
        padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
        gap: 'clamp(3rem, 6vw, 6rem)',
        alignItems: 'center',
      }}>

        {/* Left — label + heading */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: '#5ab0d6', boxShadow: '0 0 8px rgba(90,176,214,0.8)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)', color: '#5ab0d6', textTransform: 'uppercase', letterSpacing: '0.28em' }}>
              Divisi 01
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 'clamp(1.85rem, 3.5vw, 2.9rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#0a2540',
              margin: '0 0 20px 0',
            }}
          >
            Lentera Energi <br />
            <span style={{ color: '#0c6b96' }}>Nusantara</span>
          </motion.h2>

          <motion.div
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              show:   { scaleX: 1, opacity: 1, transition: { duration: 0.48, ease: EASE } },
            }}
            style={{
              height: 3, width: 48,
              background: 'linear-gradient(to right, #5ab0d6, rgba(90,176,214,0.2))',
              borderRadius: 2,
              transformOrigin: 'left',
              marginBottom: 28,
            }}
          />

          {/* Fokus tags */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {FOKUS.map((f, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: 'clamp(0.72rem, 0.85vw, 0.8rem)',
                color: '#0c6b96',
                background: '#eff8fd',
                border: '1px solid rgba(12,107,150,0.18)',
                borderRadius: 999,
                padding: '0.4rem 1rem',
                letterSpacing: '0.02em',
              }}>
                {f}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — description */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)',
              lineHeight: 1.85,
              color: '#475569',
              margin: 0,
            }}
          >
            Divisi yang bergerak di bidang penguasaan, penerapan, dan pengembangan
            teknologi pemanfaatan energi baru terbarukan untuk aplikasi di{' '}
            <span style={{ fontWeight: 600, color: '#0a2540' }}>daerah tertinggal</span>.
          </motion.p>
        </motion.div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Pembelajaran Section
───────────────────────────────────────────── */

function PembelajaranSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const containerV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
  }

  const AUDIENCE = [
    { label: 'Mahasiswa' },
    { label: 'Peneliti' },
    { label: 'Komunitas' },
    { label: 'Masyarakat' },
  ]

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #030c18 0%, #062030 50%, #0a3352 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative top border */}
      <div style={{ height: 3, background: 'linear-gradient(to right, #5ab0d6, #0c6b96, transparent)' }} />

      {/* Radial glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(90,176,214,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1400, margin: '0 auto',
        padding: 'clamp(4.5rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 0,
      }}>
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5ab0d6', boxShadow: '0 0 8px rgba(90,176,214,0.85)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.28em' }}>
              Pembelajaran
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 0 28px 0',
              maxWidth: 780,
            }}
          >
            Laboratorium pembelajaran{' '}
            <span style={{ color: '#5ab0d6' }}>terbuka</span>
          </motion.h2>

          {/* Accent bar */}
          <motion.div
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              show:   { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: EASE } },
            }}
            style={{
              height: 2, width: 48,
              background: 'linear-gradient(to right, #5ab0d6, transparent)',
              borderRadius: 2,
              transformOrigin: 'center',
              marginBottom: 32,
            }}
          />

          {/* Body */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
              lineHeight: 1.85,
              color: 'rgba(255,255,255,0.6)',
              margin: '0 0 48px 0',
              maxWidth: 640,
            }}
          >
            Site Ciheras menjadi laboratorium pembelajaran terbuka bagi mahasiswa,
            peneliti, komunitas, dan masyarakat yang ingin mempelajari energi
            terbarukan secara langsung.
          </motion.p>

          {/* Audience tags */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}
          >
            {AUDIENCE.map((a, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: 'clamp(0.78rem, 0.9vw, 0.85rem)',
                  color: 'rgba(255,255,255,0.82)',
                  background: 'rgba(90,176,214,0.1)',
                  border: '1px solid rgba(90,176,214,0.25)',
                  borderRadius: 999,
                  padding: '0.5rem 1.25rem',
                  letterSpacing: '0.04em',
                }}
              >
                {a.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Monitoring & Research Section
───────────────────────────────────────────── */

function MonitoringResearchSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  const containerV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
  }

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        background: '#ffffff',
        overflow: 'hidden',
        borderTop: '3px solid #5ab0d6',
      }}
    >
      {/* Dot-grid background */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.35,
        }}
      />
      {/* Blue wash — top-left */}
      <div
        aria-hidden
        style={{
          position: 'absolute', top: -80, left: -80, pointerEvents: 'none',
          width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(90,176,214,0.1) 0%, transparent 70%)',
        }}
      />

      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1400, margin: '0 auto',
        padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
        gap: 'clamp(3rem, 6vw, 6rem)',
        alignItems: 'center',
      }}>

        {/* Left — copy */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: '#5ab0d6', boxShadow: '0 0 8px rgba(90,176,214,0.8)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)', color: '#5ab0d6', textTransform: 'uppercase', letterSpacing: '0.28em' }}>
              Monitoring &amp; Research
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 'clamp(1.9rem, 3.5vw, 3rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#0a2540',
              margin: '0 0 20px 0',
            }}
          >
            Data sebagai fondasi<br />
            <span style={{ color: '#0c6b96' }}>riset yang kuat</span>
          </motion.h2>

          {/* Accent bar */}
          <motion.div
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              show:   { scaleX: 1, opacity: 1, transition: { duration: 0.48, ease: EASE } },
            }}
            style={{
              height: 3, width: 48,
              background: 'linear-gradient(to right, #5ab0d6, rgba(90,176,214,0.2))',
              borderRadius: 2,
              transformOrigin: 'left',
              marginBottom: 28,
            }}
          />

          {/* Body */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.88rem, 1.05vw, 0.975rem)',
              lineHeight: 1.85,
              color: '#475569',
              margin: '0 0 36px 0',
              maxWidth: 520,
            }}
          >
            Pengembangan energi terbarukan tidak hanya bergantung pada teknologi pembangkit,
            tetapi juga pada kualitas data dan pemahaman kondisi lapangan. Untuk mendukung
            riset dan pengambilan keputusan berbasis data, LBN mengembangkan sistem monitoring
            yang terintegrasi di Site Ciheras. Pengembangan fasilitas ini diperkuat melalui
            kolaborasi dengan{' '}
            <span style={{ fontWeight: 600, color: '#0a2540' }}>ProfEC Ventus</span>
            {' '}yang memberikan dukungan berupa sensor data logger untuk pengukuran potensi
            angin serta pemantauan kondisi lingkungan secara berkelanjutan.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <a
              href="/potensi-angin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: 'clamp(0.82rem, 0.95vw, 0.9rem)',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #0c6b96 0%, #0a4f75 100%)',
                borderRadius: 999,
                padding: 'clamp(0.65rem, 1vw, 0.8rem) clamp(1.5rem, 2vw, 2rem)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                boxShadow: '0 4px 16px rgba(12,107,150,0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(12,107,150,0.4)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(12,107,150,0.3)'
              }}
            >
              Lihat Data Potensi Angin
              <ArrowRight size={16} strokeWidth={2.2} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right — stat cards */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(0.875rem, 1.5vw, 1.25rem)',
          }}
        >
          {[
            { label: 'Site Monitoring', value: 'Ciheras', sub: 'Tasikmalaya, Jawa Barat', accent: '#5ab0d6' },
            { label: 'Mitra Teknologi', value: 'ProfEC', sub: 'Ventus — sensor & data logger', accent: '#0c6b96' },
            { label: 'Parameter Ukur', value: '4+', sub: 'Kecepatan, arah, suhu, tekanan', accent: '#0a4f75' },
            { label: 'Sistem', value: 'Real-time', sub: 'Pemantauan berkelanjutan 24/7', accent: '#5ab0d6' },
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 14,
                padding: 'clamp(1.25rem, 2vw, 1.75rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.58rem, 0.72vw, 0.65rem)', color: card.accent, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                {card.label}
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)', color: '#0a2540', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                {card.value}
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.72rem, 0.85vw, 0.78rem)', color: '#64748b', lineHeight: 1.5 }}>
                {card.sub}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Infrastruktur Energi Section
───────────────────────────────────────────── */

const INFRA_ITEMS = [
  {
    no: '01',
    label: 'HAWT',
    full: 'Horizontal Axis Wind Turbine',
    desc: 'Turbin angin sumbu horizontal — teknologi utama pembangkit listrik tenaga angin skala menengah hingga besar untuk kawasan terbuka.',
  },
  {
    no: '02',
    label: 'VAWT',
    full: 'Vertical Axis Wind Turbine',
    desc: 'Turbin angin sumbu vertikal — cocok untuk lingkungan dengan angin turbulen dan instalasi di area padat atau berkontur.',
  },
  {
    no: '03',
    label: 'Panel Surya',
    full: 'Photovoltaic Solar Panel',
    desc: 'Sistem panel surya terintegrasi untuk pemanfaatan energi matahari di lokasi terpencil dan daerah tertinggal di Indonesia.',
  },
]

function InfrastrukturEnergiSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  const headerV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
  }
  const cardV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
  }

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        background: '#020914',
        overflow: 'hidden',
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {/* ── Video background ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src={`${import.meta.env.BASE_URL}DJI_0824.MP4`} type="video/mp4" />
      </video>

      {/* ── Overlays ── */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(2,9,20,0.97) 0%, rgba(3,13,28,0.75) 45%, rgba(4,16,34,0.3) 100%)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 35%, rgba(2,9,20,0.45) 100%)',
      }} />

      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1400, width: '100%',
        margin: '0 auto',
        padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
      }}>

        {/* Header */}
        <motion.div
          variants={headerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{ marginBottom: 'clamp(2rem, 3.5vw, 3.5rem)' }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)',
              color: '#5ab0d6',
              textTransform: 'uppercase',
              letterSpacing: '0.28em',
              marginBottom: 16,
            }}
          >
            Infrastruktur Energi
          </motion.p>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 'clamp(1.9rem, 3.8vw, 3.2rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: 0,
            }}
          >
            Teknologi yang kami <br />
            <span style={{ color: '#5ab0d6' }}>bangun & operasikan</span>
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={cardV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
          }}
        >
          {INFRA_ITEMS.map((item) => (
            <motion.div
              key={item.no}
              variants={fadeUp}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(90,176,214,0.22)',
                borderRadius: 14,
                padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              {/* Number badge */}
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(90,176,214,0.13)',
                border: '1px solid rgba(90,176,214,0.28)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.68rem', color: '#5ab0d6', letterSpacing: '0.05em' }}>
                  {item.no}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', color: '#ffffff', margin: 0, letterSpacing: '-0.015em' }}>
                  {item.label}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.62rem, 0.75vw, 0.7rem)', color: '#5ab0d6', margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {item.full}
                </p>
              </div>

              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.82rem, 0.95vw, 0.875rem)', lineHeight: 1.75, color: 'rgba(255,255,255,0.52)', margin: 0 }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Activity Section
───────────────────────────────────────────── */

const ACTIVITIES = [
  {
    no: '01',
    label: 'Fabrikasi Bilah',
    category: 'Manufaktur',
    image: `${import.meta.env.BASE_URL}activity/activity_laser_cutting.webp`,
    placeholder: 'linear-gradient(135deg, #041c2e 0%, #0a3d5c 100%)',
    featured: true, // col-span-2
  },
  {
    no: '02',
    label: 'Instalasi Panel Kontrol',
    category: 'Kelistrikan',
    image: `${import.meta.env.BASE_URL}activity/activity_panel_wiring.webp`,
    placeholder: 'linear-gradient(135deg, #1a2e1a 0%, #0f5c35 100%)',
    featured: false,
  },
  {
    no: '03',
    label: 'Perakitan Controller',
    category: 'Elektronika',
    image: `${import.meta.env.BASE_URL}activity/activity_controller_assembly.webp`,
    placeholder: 'linear-gradient(135deg, #1a1a2e 0%, #2e1a5c 100%)',
    featured: false,
  },
  {
    no: '04',
    label: 'Wiring Sistem EBT',
    category: 'Kelistrikan',
    image: `${import.meta.env.BASE_URL}activity/activity_controller_cabinet.webp`,
    placeholder: 'linear-gradient(135deg, #1a2a1a 0%, #0a4f35 100%)',
    featured: false,
  },
  {
    no: '05',
    label: 'Fabrikasi Logam',
    category: 'Manufaktur',
    image: `${import.meta.env.BASE_URL}activity/activity_metal_fabrication.webp`,
    placeholder: 'linear-gradient(135deg, #2a1a0a 0%, #5c3d0a 100%)',
    featured: false,
  },
]

function ActivitySection() {
  const ref      = useRef<HTMLElement>(null)
  const inView   = useInView(ref, { once: true, amount: 0.08 })

  const headerV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
  }
  const gridV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  }

  return (
    <section
      ref={ref}
      style={{ background: '#ffffff', position: 'relative', overflow: 'hidden' }}
    >
      {/* Top accent line */}
      <div style={{ height: 3, background: 'linear-gradient(to right, #5ab0d6, #0c6b96, transparent)' }} />

      {/* Subtle dot texture */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.4,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>

        {/* ── Header ── */}
        <motion.div
          variants={headerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{ marginBottom: 'clamp(2.5rem, 4vw, 4rem)' }}
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
            Workshop & Lapangan
          </motion.p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 3.8vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#0a2540',
                margin: 0,
              }}
            >
              Di Balik{' '}
              <span style={{ color: '#0c6b96' }}>Karya Kami</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.82rem, 1vw, 0.9rem)',
                lineHeight: 1.75,
                color: '#64748b',
                maxWidth: 380,
                margin: 0,
              }}
            >
              Setiap komponen yang kami hasilkan lahir dari proses kerja langsung —
              fabrikasi, wiring, dan perakitan yang dikerjakan oleh tim kami sendiri.
            </motion.p>
          </div>
        </motion.div>

        {/* ── Asymmetric photo grid ── */}
        <motion.div
          variants={gridV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="activity-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'clamp(220px, 28vw, 340px) clamp(180px, 22vw, 280px)',
            gap: 'clamp(0.75rem, 1.2vw, 1rem)',
          }}
        >
          {ACTIVITIES.map((act) => (
            /* Outer: scroll fade-in */
            <motion.div
              key={act.no}
              variants={fadeUp}
              className="activity-card"
              style={{
                gridColumn: act.featured ? '1 / 3' : undefined,
                borderRadius: 16,
                overflow: 'hidden',
              }}
            >
              {/* Inner: hover isolation */}
              <motion.div
                whileHover="hover"
                initial="rest"
                animate="rest"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: 16,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 8px 28px rgba(0,0,0,0.06)',
                }}
              >
                {/* Placeholder gradient */}
                <div aria-hidden style={{ position: 'absolute', inset: 0, background: act.placeholder }} />

                {/* Photo */}
                <motion.img
                  src={act.image}
                  alt={act.label}
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.07 } }}
                  transition={{ duration: 0.65, ease: EASE }}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  onError={(e) => { e.currentTarget.style.opacity = '0' }}
                />

                {/* Base overlay */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(4,18,38,0.82) 0%, rgba(4,18,38,0.35) 45%, rgba(4,18,38,0.08) 100%)',
                  }}
                />

                {/* Hover teal tint */}
                <motion.div
                  aria-hidden
                  variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(160deg, rgba(12,107,150,0.2) 0%, transparent 55%)',
                  }}
                />

                {/* ── Badges ── */}
                {/* Number — top left */}
                <span style={{
                  position: 'absolute', top: 14, left: 16,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: 'clamp(0.6rem, 0.75vw, 0.68rem)',
                  color: '#5ab0d6',
                  letterSpacing: '0.22em',
                }}>
                  {act.no}
                </span>

                {/* Category badge — top right */}
                <div style={{
                  position: 'absolute', top: 12, right: 14,
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 6,
                  padding: '3px 10px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: 'clamp(0.56rem, 0.7vw, 0.62rem)',
                    color: 'rgba(255,255,255,0.9)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    {act.category}
                  </span>
                </div>

                {/* ── Bottom content ── */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(1rem, 1.8vw, 1.4rem)' }}>
                  {/* Accent line — slides in on hover */}
                  <motion.div
                    variants={{ rest: { scaleX: 0, opacity: 0 }, hover: { scaleX: 1, opacity: 1 } }}
                    transition={{ duration: 0.32, ease: EASE }}
                    style={{
                      height: 2, width: 36,
                      background: '#5ab0d6',
                      borderRadius: 1,
                      transformOrigin: 'left',
                      marginBottom: 8,
                    }}
                  />

                  <motion.p
                    variants={{ rest: { y: 0, opacity: 0.9 }, hover: { y: -3, opacity: 1 } }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: act.featured
                        ? 'clamp(1.05rem, 1.5vw, 1.3rem)'
                        : 'clamp(0.88rem, 1.1vw, 1rem)',
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                      color: '#ffffff',
                      margin: 0,
                    }}
                  >
                    {act.label}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <style>{`
          @media (max-width: 900px) {
            .activity-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              grid-template-rows: auto !important;
            }
            .activity-card {
              grid-column: auto !important;
              aspect-ratio: 4 / 3;
            }
          }
          @media (max-width: 600px) {
            .activity-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
