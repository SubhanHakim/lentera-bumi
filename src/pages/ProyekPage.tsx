import { useRef } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import { LuChevronDown } from 'react-icons/lu'
import Navbar from '../components/Navbar'
import FooterCTA from '../components/FooterCTA'

/* ─────────────────────────────────────────────
   Constants & Variants
───────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const slideIn: Variants = {
  hidden: { opacity: 0, x: -24 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.68, ease: EASE } },
}

/* ─────────────────────────────────────────────
   Data — Featured Projects
───────────────────────────────────────────── */

interface FeaturedProject {
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

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id:               '01',
    client:           'PERTAMINA',
    year:             '2013',
    title:            'PLTB Hybrid Sumba',
    location:         'Pulau Sumba, NTT',
    tech:             'Wind Turbine',
    desc:             'Pembangunan Pembangkit Listrik Tenaga Hybrid (Bayu dan Surya) di Sumba, Nusa Tenggara Timur. Instalasi 100 unit turbin angin 500 watt (total 50 kW) dan panel surya 20 kW di 4 lokasi — Desa Kalihi, Palindi, dan Tanarara di Kec. Kamanggih, Sumba Timur.',
    tags:             ['PLTB Hybrid', '100 Unit Turbin', '50 kW Total', 'Sumba NTT'],
    image:            `${import.meta.env.BASE_URL}proyek_pertamina.webp`,
    imagePlaceholder: 'linear-gradient(135deg, #062f45 0%, #0c6b96 50%, #1a8fc0 100%)',
  },
  {
    id:               '02',
    client:           'PLN NUSANTARA POWER',
    year:             '2019–2020',
    title:            'PMSG 100 kW & PLTB Hybrid',
    location:         'Ciheras, Tasikmalaya & Tulungagung',
    tech:             'PMSG Generator',
    desc:             'Pembuatan sarana penunjang, riset, dan kajian PLTB Combine System Tenaga Surya di Site Ciheras dan Site PLTA Niyama milik Nusantara Power, Tulungagung. Riset prototype sepeda listrik dan Golf Car listrik serta pembuatan Permanent Magnet Generator 100 kW.',
    tags:             ['PMSG 100 kW', 'PLTB Hybrid', 'Sepeda Listrik', 'Golf Car EV'],
    image:            `${import.meta.env.BASE_URL}proyek_pln.webp`,
    imagePlaceholder: 'linear-gradient(135deg, #0a3d5c 0%, #0e7aaa 50%, #1a9fd4 100%)',
  },
  {
    id:               '03',
    client:           'CeCUR',
    year:             '2024',
    title:            'VAWT & Panel Surya Samarinda',
    location:         'Samarinda, Kalimantan Timur',
    tech:             'VAWT',
    desc:             'LBN dipercaya oleh Center for Climate and Urban Resilience (CeCUR) untuk memasang turbin Vertikal berkapasitas 500 watt dan Panel Surya berkapasitas 500 Wp dalam program Pengadaan Pelaksana Konstruksi Terintegrasi Ruang Publik Berketahanan Iklim di Kota Samarinda.',
    tags:             ['VAWT 500 W', 'Panel Surya 500 Wp', 'Samarinda', 'Ketahanan Iklim'],
    image:            `${import.meta.env.BASE_URL}proyek_cecur.webp`,
    imagePlaceholder: 'linear-gradient(135deg, #0e4a35 0%, #0d7c5a 50%, #13a878 100%)',
  },
]

/* ─────────────────────────────────────────────
   Data — PUSLITBANG PLN Timeline
───────────────────────────────────────────── */

const PLN_TIMELINE: { year: string; title: string; desc: string }[] = [
  {
    year:  '2014',
    title: 'Pembangunan Small Wind Farm Ciheras',
    desc:  'Pembangunan 5 Unit PLTB 2,5 kW dan PLTS 1 kW di Site Ciheras, Tasikmalaya.',
  },
  {
    year:  '2015',
    title: 'Pengembangan Preliminary Concept PLTB 2 kW',
    desc:  'Pengembangan Preliminary Concept PLTB berkapasitas 2 kW di Site Ciheras, Tasikmalaya.',
  },
  {
    year:  '2018',
    title: 'Konsultasi Perancangan PMSG 1 kW',
    desc:  'Konsultasi perancangan dan pembuatan PMSG Kapasitas 1 kW.',
  },
  {
    year:  '2018',
    title: 'Optimasi Bilah PLTB',
    desc:  'Pengadaan jasa konsultasi optimasi bilah PLTB.',
  },
  {
    year:  '2019',
    title: 'Pengembangan PMSG 1 kW — 10 Unit',
    desc:  'Pengadaan jasa konsultasi pengembangan dan rancang bangun PMSG 1 kW 10 Unit.',
  },
]

/* ─────────────────────────────────────────────
   Data — Other Clients
───────────────────────────────────────────── */

interface OtherClient {
  client:      string
  year:        string
  title:       string
  location:    string
  desc:        string
  tags:        string[]
  accentColor: string
  bgGradient:  string
}

const OTHER_CLIENTS: OtherClient[] = [
  {
    client:      'PT HUTAMA KARYA',
    year:        '',
    title:       'Riset & Pengembangan Generator 100 kW',
    location:    'Indonesia',
    desc:        'Kesuksekan riset dan pembuatan generator permanen magnet 100 kW yang dilakukan bersama PT PJB mengundang ketertarikan PT Hutama Karya untuk berkolaborasi melakukan hal yang sama.',
    tags:        ['Generator 100 kW', 'PMSG', 'Riset & Pengembangan'],
    accentColor: '#b45309',
    bgGradient:  'linear-gradient(135deg, #431407 0%, #7c2d12 100%)',
  },
  {
    client:      'TIM MOLINA UI',
    year:        '2014',
    title:       'Desain Permanen Magnet Motor 25 kW',
    location:    'Universitas Indonesia, Depok',
    desc:        'Desain total permanent magnet motor 25 kW sekaligus transfer ilmu mengenai perancangan motor pada dosen dan mahasiswa Universitas Indonesia.',
    tags:        ['Motor 25 kW', 'Transfer Ilmu', 'Universitas Indonesia'],
    accentColor: '#7c3aed',
    bgGradient:  'linear-gradient(135deg, #2e1065 0%, #5b21b6 100%)',
  },
  {
    client:      'DINAS PERTAMBANGAN & ENERGI KAB. TULANG BAWANG',
    year:        '2015',
    title:       'Studi Kelayakan Pengembangan EBT',
    location:    'Tulang Bawang, Lampung',
    desc:        'Studi potensi pengembangan Energi Baru Terbarukan yang meliputi survei lokasi, pengukuran potensi energi, dan pembuatan laporan mengenai potensi pembangunan PLTS dan PLT-Biomassa.',
    tags:        ['Studi Kelayakan', 'EBT', 'PLTS', 'PLT-Biomassa'],
    accentColor: '#0e8a6e',
    bgGradient:  'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
  },
  {
    client:      'RESORT KOPI PANGGANG',
    year:        '2016',
    title:       'Instalasi PLTB Skala Kecil Bukit Panggang',
    location:    'Imogiri, Yogyakarta',
    desc:        'Instalasi 10 unit turbin angin kapasitas 500 watt (total 5 kW) dan panel surya kapasitas 2 kW di resort wisata Bukit Panggang, Imogiri, Yogyakarta.',
    tags:        ['PLTB', '10 Unit', '5 kW Total', 'Yogyakarta'],
    accentColor: '#0c6b96',
    bgGradient:  'linear-gradient(135deg, #062f45 0%, #0a4f70 100%)',
  },
  {
    client:      'ESDM',
    year:        '2017',
    title:       'Instalasi PLTB Universitas Udayana',
    location:    'Bali',
    desc:        'Pemasangan 8 unit turbin angin berkapasitas 500 watt (total 4 kW) di rooftop Fakultas Teknik Universitas Udayana, Bali, sebagai sarana edukasi dan percontohan energi terbarukan.',
    tags:        ['PLTB', '8 Unit', '4 kW Total', 'Universitas Udayana Bali'],
    accentColor: '#c2410c',
    bgGradient:  'linear-gradient(135deg, #431407 0%, #9a3412 100%)',
  },
]

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */

export default function ProyekPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProyekHero />
        <ClientsStripSection />
        <FeaturedSection />
        <PLNSection />
        <OtherClientsSection />
        <FooterCTA />
      </main>
    </>
  )
}

/* ─────────────────────────────────────────────
   Hero
───────────────────────────────────────────── */

function ProyekHero() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })

  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 600], ['0%', '14%'])

  return (
    <section
      ref={ref}
      style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden' }}
    >
      {/* Background parallax */}
      <motion.div
        style={{ position: 'absolute', inset: 0, zIndex: 0, y: bgY, scale: 1.08, willChange: 'transform' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}hero_Section.webp`}
          alt=""
          aria-hidden
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 50%' }}
        />
      </motion.div>

      {/* Dark overlay — bottom-to-top + left vignette */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to top, rgba(3,12,24,0.97) 0%, rgba(4,16,32,0.85) 25%, rgba(5,20,40,0.52) 50%, rgba(6,24,48,0.2) 70%, transparent 88%)' }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to right, rgba(3,12,24,0.7) 0%, rgba(3,12,24,0.35) 35%, transparent 65%)' }} />

      {/* Content — flex column centred, offset for navbar */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        minHeight: '100svh',
        paddingTop: 'clamp(100px, 12vh, 140px)',
        paddingBottom: 'clamp(40px, 6vh, 80px)',
      }}>
        <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto', padding: '0 clamp(1.75rem, 5vw, 5rem)' }}>
          <motion.div variants={containerV} initial="hidden" animate={inView ? 'show' : 'hidden'}>

            {/* Eyebrow */}
            <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5ab0d6', boxShadow: '0 0 8px rgba(90,176,214,0.85)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 'clamp(0.12em, 1.5vw, 0.28em)', minWidth: 0, wordBreak: 'break-word' }}>
                Lentera Bumi Nusantara · Portofolio Proyek
              </span>
            </motion.div>

            {/* Headline */}
            <div style={{ overflow: 'hidden' }}>
              <motion.h1 variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(2.2rem, 4.4vw, 4rem)', lineHeight: 1.07, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 4px 0' }}>
                Klien &amp; Proyek
              </motion.h1>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: 36 }}>
              <motion.h1 variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(2.2rem, 4.4vw, 4rem)', lineHeight: 1.07, letterSpacing: '-0.03em', color: '#5ab0d6', margin: 0 }}>
                yang Telah Kami Kerjakan
              </motion.h1>
            </div>

            {/* Accent line */}
            <motion.div
              variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: EASE } } }}
              style={{ height: 2, width: 'clamp(40px, 4vw, 60px)', background: 'linear-gradient(to right, #5ab0d6, transparent)', transformOrigin: 'left', marginBottom: 28 }}
            />

            {/* Description */}
            <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.88rem, 1.05vw, 0.975rem)', lineHeight: 1.8, color: 'rgba(255,255,255,0.62)', maxWidth: 560, margin: '0 0 40px 0' }}>
              Lebih dari satu dekade berkolaborasi bersama lembaga negara, perusahaan energi, universitas, dan pelaku industri dalam mewujudkan Energi Baru Terbarukan di Indonesia.
            </motion.p>

            {/* Stats strip */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(2rem, 4vw, 4rem)' }}>
              {[
                { value: '9',         label: 'Klien' },
                { value: '12+',       label: 'Proyek' },
                { value: '2013–2024', label: 'Rekam Jejak' },
              ].map((s) => (
                <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', color: '#ffffff', letterSpacing: '-0.04em', margin: 0, lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.56rem, 0.7vw, 0.62rem)', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.26em', margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}
        aria-hidden
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.28)' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.52rem', textTransform: 'uppercase', letterSpacing: '0.26em' }}>Scroll</span>
          <motion.span
            style={{ display: 'flex' }}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <LuChevronDown size={15} />
          </motion.span>
        </div>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Clients Strip Section
───────────────────────────────────────────── */

const STRIP_CLIENTS = [
  { name: 'PERTAMINA',               year: '2013' },
  { name: 'TIM MOLINA UI',           year: '2014' },
  { name: 'PUSLITBANG PLN',          year: '2014–2019' },
  { name: 'DINAS PERTAMBANGAN TULANG BAWANG', year: '2015' },
  { name: 'RESORT KOPI PANGGANG',    year: '2016' },
  { name: 'ESDM',                    year: '2017' },
  { name: 'PLN NUSANTARA POWER',     year: '2019–2020' },
  { name: 'PT HUTAMA KARYA',         year: '' },
  { name: 'CeCUR',                   year: '2024' },
]

function ClientsStripSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      style={{
        background:  'linear-gradient(135deg, #041220 0%, #062030 60%, #0a3350 100%)',
        position:    'relative',
        overflow:    'hidden',
      }}
    >
      {/* Subtle grid */}
      <div aria-hidden style={{
        position:        'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(90,176,214,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(90,176,214,0.04) 1px, transparent 1px)',
        backgroundSize:  '48px 48px',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: 'clamp(2.5rem, 4vw, 4rem) clamp(1.5rem, 5vw, 5rem)' }}>

        {/* Label row */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}
        >
          <motion.div
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.5, ease: EASE } } }}
            style={{ height: 1, width: 32, background: 'linear-gradient(to left, #5ab0d6, transparent)', transformOrigin: 'right', flexShrink: 0 }}
          />
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.58rem, 0.72vw, 0.65rem)', color: '#5ab0d6', textTransform: 'uppercase', letterSpacing: '0.34em', margin: 0, whiteSpace: 'nowrap' }}>
            Dipercaya Oleh
          </motion.p>
          <motion.div
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.5, ease: EASE } } }}
            style={{ height: 1, flex: 1, background: 'linear-gradient(to right, #5ab0d6, transparent)', transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Client badges grid */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(180px, 100%), 1fr))',
            gap:                 'clamp(0.6rem, 1vw, 1rem)',
          }}
        >
          {STRIP_CLIENTS.map((c) => (
            <motion.div
              key={c.name}
              variants={fadeUp}
              whileHover={{ backgroundColor: 'rgba(90,176,214,0.1)', borderColor: 'rgba(90,176,214,0.3)' }}
              transition={{ duration: 0.18 }}
              style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'space-between',
                gap:            10,
                padding:        'clamp(0.7rem, 1.1vw, 1rem) clamp(0.9rem, 1.4vw, 1.25rem)',
                background:     'rgba(255,255,255,0.04)',
                border:         '1px solid rgba(255,255,255,0.07)',
                borderRadius:   10,
                cursor:         'default',
              }}
            >
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(0.62rem, 0.8vw, 0.72rem)', color: 'rgba(255,255,255,0.82)', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.3 }}>
                {c.name}
              </span>
              {c.year && (
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.56rem, 0.7vw, 0.62rem)', color: '#5ab0d6', background: 'rgba(90,176,214,0.1)', borderRadius: 4, padding: '2px 7px', whiteSpace: 'nowrap', letterSpacing: '0.06em', flexShrink: 0 }}>
                  {c.year}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Featured Section
───────────────────────────────────────────── */

function FeaturedSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.06 })

  return (
    <section ref={ref} style={{ background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
      {/* Top accent line — consistent with ProyekSection */}
      <div style={{ height: 3, background: 'linear-gradient(to right, #5ab0d6, #0c6b96, transparent)' }} />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>

        {/* Header */}
        <motion.div variants={containerV} initial="hidden" animate={inView ? 'show' : 'hidden'} style={{ marginBottom: 'clamp(2.5rem, 4vw, 4rem)', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
          <div>
            <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.6rem, 0.8vw, 0.7rem)', color: '#5ab0d6', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 12 }}>
              Proyek Unggulan
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.75rem, 3.2vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#0a2540', margin: 0 }}>
              Tiga Proyek <span style={{ color: '#0c6b96' }}>Pilihan Kami</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.8rem, 0.95vw, 0.875rem)', lineHeight: 1.72, color: '#64748b', maxWidth: 340, margin: 0 }}>
            Dari pesisir Sumba hingga jantung Kalimantan — energi terbarukan yang kami bangun terus menyala.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(1.25rem, 2vw, 2rem)' }}
        >
          {FEATURED_PROJECTS.map((p) => (
            <FeaturedCard key={p.id} project={p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Wind Turbine SVG Decoration
───────────────────────────────────────────── */

function TurbineSVG() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 160 300"
      style={{ position: 'absolute', right: '6%', bottom: 0, width: '38%', height: '95%', opacity: 0.1, pointerEvents: 'none' }}
    >
      {/* Tower */}
      <polygon points="76,140 84,140 87,300 73,300" fill="white" />
      {/* Hub */}
      <circle cx="80" cy="138" r="7" fill="white" />
      {/* Blade 1 — straight up */}
      <polygon points="80,138 76,50 84,50 80,138" fill="white" />
      {/* Blade 2 — lower-right */}
      <polygon
        points="80,138 76,50 84,50 80,138"
        fill="white"
        transform="rotate(120 80 138)"
      />
      {/* Blade 3 — lower-left */}
      <polygon
        points="80,138 76,50 84,50 80,138"
        fill="white"
        transform="rotate(240 80 138)"
      />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   Featured Card
───────────────────────────────────────────── */

function FeaturedCard({ project: p }: { project: FeaturedProject }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover="hover"
      initial="rest"
      animate="rest"
      style={{ display: 'flex', flexDirection: 'column', background: '#ffffff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.07)' }}
    >
      {/* Visual area */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>

        {/* Gradient base — always visible */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: p.imagePlaceholder }} />

        {/* Hex grid texture overlay */}
        <div aria-hidden style={{
          position:        'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
        }} />

        {/* Wind turbine silhouette */}
        <TurbineSVG />

        {/* Actual photo — shown if available, hides on error */}
        <motion.img
          src={p.image}
          alt={p.title}
          variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
          transition={{ duration: 0.58, ease: EASE }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />

        {/* Bottom scrim — always on top */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,18,32,0.82) 0%, rgba(4,18,32,0.2) 55%, transparent 80%)' }} />

        {/* ── Badges ── */}
        {/* Client — top-left */}
        <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(255,255,255,0.13)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.22)', borderRadius: 6, padding: '4px 10px' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(0.58rem, 0.72vw, 0.65rem)', color: '#ffffff', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{p.client}</span>
        </div>
        {/* Year — top-right */}
        <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,0.38)', backdropFilter: 'blur(6px)', borderRadius: 4, padding: '3px 9px' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.56rem, 0.7vw, 0.62rem)', color: 'rgba(255,255,255,0.88)', letterSpacing: '0.08em' }}>{p.year}</span>
        </div>

        {/* Bottom-left: title + tech over scrim */}
        <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.88rem, 1.1vw, 1rem)', lineHeight: 1.25, letterSpacing: '-0.01em', color: '#ffffff', margin: '0 0 8px 0' }}>{p.title}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ background: '#0c6b96', borderRadius: 4, padding: '3px 9px' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.54rem, 0.68vw, 0.6rem)', color: '#ffffff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.tech}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.6rem, 0.74vw, 0.67rem)', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.location}</span>
          </div>
        </div>

        {/* Index watermark — bottom-right */}
        <span style={{ position: 'absolute', top: 14, right: 14, fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'rgba(255,255,255,0.06)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em' }}>{p.id}</span>
      </div>

      {/* Body */}
      <div style={{ padding: 'clamp(1.4rem, 2.2vw, 2rem)', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.8rem, 0.92vw, 0.875rem)', lineHeight: 1.75, color: '#64748b', margin: 0, flex: 1 }}>{p.desc}</p>
        <div style={{ height: 1, background: 'linear-gradient(to right, #e2e8f0, transparent)', marginTop: 4 }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {p.tags.map((tag) => (
            <span key={tag} style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.65rem', color: '#0c6b96', background: '#eff8fd', borderRadius: 4, padding: '3px 8px', letterSpacing: '0.04em' }}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

/* ─────────────────────────────────────────────
   PUSLITBANG PLN Section
───────────────────────────────────────────── */

function PLNSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.06 })

  return (
    <section
      ref={ref}
      style={{
        position:   'relative',
        background: 'linear-gradient(160deg, #041220 0%, #062030 50%, #0a3350 100%)',
        overflow:   'hidden',
      }}
    >
      {/* Grid texture */}
      <div aria-hidden style={{
        position:            'absolute', inset: 0,
        backgroundImage:     'linear-gradient(rgba(90,176,214,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(90,176,214,0.04) 1px, transparent 1px)',
        backgroundSize:      '56px 56px',
        zIndex:              0,
      }} />
      {/* Radial glow */}
      <div aria-hidden style={{ position: 'absolute', top: '-15%', right: '-5%', width: '55%', height: '80%', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(12,107,150,0.16) 0%, transparent 70%)', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>

        {/* Header */}
        <motion.div variants={containerV} initial="hidden" animate={inView ? 'show' : 'hidden'} style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.6rem, 0.8vw, 0.7rem)', color: '#5ab0d6', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 14 }}>
              Mitra Strategis PLN
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.75rem, 3.2vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#ffffff', margin: '0 0 4px 0' }}>
              PUSLITBANG PLN
            </motion.h2>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.75rem, 3.2vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#5ab0d6', margin: 0 }}>
              2014 – 2019
            </motion.h2>
          </div>

          {/* Stat chips */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#5ab0d6', letterSpacing: '-0.04em', margin: 0, lineHeight: 1 }}>5</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.58rem, 0.72vw, 0.65rem)', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.22em', margin: '6px 0 0 0' }}>Proyek</p>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.12)', alignSelf: 'stretch' }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#5ab0d6', letterSpacing: '-0.04em', margin: 0, lineHeight: 1 }}>5</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.58rem, 0.72vw, 0.65rem)', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.22em', margin: '6px 0 0 0' }}>Tahun</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Top divider */}
        <motion.div variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: EASE } } }} initial="hidden" animate={inView ? 'show' : 'hidden'} style={{ height: 1, background: 'linear-gradient(to right, rgba(90,176,214,0.4), rgba(90,176,214,0.1), transparent)', transformOrigin: 'left', marginBottom: 'clamp(2.5rem, 4vw, 4rem)' }} />

        {/* Timeline entries */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 'clamp(1rem, 1.5vw, 1.5rem)' }}
        >
          {PLN_TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              variants={slideIn}
              whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.07)' }}
              transition={{ duration: 0.22 }}
              style={{
                display:       'flex',
                flexDirection: 'column',
                gap:           12,
                padding:       'clamp(1.25rem, 2vw, 1.75rem)',
                background:    'rgba(255,255,255,0.04)',
                border:        '1px solid rgba(255,255,255,0.08)',
                borderRadius:  14,
                backdropFilter: 'blur(8px)',
                position:      'relative',
                overflow:      'hidden',
                cursor:        'default',
              }}
            >
              {/* Top accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, #5ab0d6, transparent)', borderRadius: '14px 14px 0 0' }} />

              {/* Year + index row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(0.65rem, 0.84vw, 0.74rem)', color: '#5ab0d6', background: 'rgba(90,176,214,0.12)', borderRadius: 4, padding: '3px 9px', letterSpacing: '0.08em' }}>
                  {item.year}
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', color: 'rgba(90,176,214,0.12)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Title */}
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.82rem, 1.05vw, 0.96rem)', color: '#ffffff', margin: 0, lineHeight: 1.35 }}>{item.title}</p>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

              {/* Description */}
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.75rem, 0.88vw, 0.82rem)', lineHeight: 1.72, color: 'rgba(255,255,255,0.48)', margin: 0 }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Other Clients Section
───────────────────────────────────────────── */

function OtherClientsSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.06 })

  return (
    <section ref={ref} style={{ background: '#ffffff', position: 'relative', borderTop: '3px solid #5ab0d6', overflow: 'hidden' }}>
      {/* Decorative blob */}
      <div aria-hidden style={{ position: 'absolute', top: -80, right: -60, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(90,176,214,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>

        {/* Header */}
        <motion.div variants={containerV} initial="hidden" animate={inView ? 'show' : 'hidden'} style={{ marginBottom: 'clamp(2.5rem, 4vw, 4rem)' }}>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.6rem, 0.8vw, 0.7rem)', color: '#5ab0d6', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 12 }}>
            Rekam Jejak Klien
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.75rem, 3.2vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#0a2540', margin: 0 }}>
            Klien <span style={{ color: '#0c6b96' }}>Strategis Lainnya</span>
          </motion.h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(1.25rem, 2vw, 2rem)' }}
        >
          {OTHER_CLIENTS.map((c) => (
            <OtherClientCard key={c.client} client={c} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Other Client Card
───────────────────────────────────────────── */

function OtherClientCard({ client: c }: { client: OtherClient }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.22 }}
      style={{
        display:       'flex',
        flexDirection: 'column',
        background:    '#ffffff',
        border:        '1px solid #e8edf4',
        borderRadius:  16,
        overflow:      'hidden',
        boxShadow:     '0 1px 4px rgba(0,0,0,0.05)',
        cursor:        'default',
      }}
    >
      {/* Header band with gradient */}
      <div style={{
        background: c.bgGradient,
        padding:    'clamp(1.25rem, 2vw, 1.75rem)',
        position:   'relative',
        overflow:   'hidden',
      }}>
        {/* Grid texture on card header */}
        <div aria-hidden style={{
          position:        'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize:  '24px 24px',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(0.6rem, 0.8vw, 0.7rem)', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0, flex: 1 }}>
              {c.client}
            </p>
            {c.year && (
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.65rem', color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 4, padding: '2px 8px', whiteSpace: 'nowrap', letterSpacing: '0.06em', flexShrink: 0 }}>
                {c.year}
              </span>
            )}
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.6rem, 0.76vw, 0.68rem)', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0 }}>
            {c.location}
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 'clamp(1.25rem, 2vw, 1.75rem)', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)', lineHeight: 1.3, letterSpacing: '-0.015em', color: '#0a2540', margin: 0 }}>{c.title}</h3>

        <div style={{ height: 1, background: `linear-gradient(to right, ${c.accentColor}40, transparent)` }} />

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.78rem, 0.9vw, 0.85rem)', lineHeight: 1.74, color: '#64748b', margin: 0, flex: 1 }}>{c.desc}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {c.tags.map((tag) => (
            <span key={tag} style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.64rem', color: c.accentColor, background: '#f8fafc', border: `1px solid ${c.accentColor}25`, borderRadius: 4, padding: '2px 7px', letterSpacing: '0.04em' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
