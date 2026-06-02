import { useRef, useEffect } from 'react'
import {
  motion, useInView, useMotionValue, useTransform, animate, type Variants,
} from 'framer-motion'
import {
  SproutIcon, DropletsIcon, UsersIcon, TrendingUpIcon, ArrowRight,
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import FooterCTA from '../../components/FooterCTA'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
}

/* ─── Data ─── */

const STATS = [
  {
    index: '01', value: '65', numericTarget: 65, suffix: '',
    label: 'Mitra Peternak',
    sublabel: 'Peternak lokal yang aktif bermitra dan mendapatkan pendampingan langsung dari tim Lentera Agri.',
  },
  {
    index: '02', value: '805+', numericTarget: 805, suffix: '+',
    label: 'Domba / Kambing',
    sublabel: 'Total hewan ternak domba dan kambing yang dikelola bersama jaringan mitra peternak kami.',
  },
  {
    index: '03', value: '23+', numericTarget: 23, suffix: '+',
    label: 'Sapi',
    sublabel: 'Sapi yang dibudidayakan dan dipantau sebagai bagian dari program peternakan terpadu.',
  },
  {
    index: '04', value: '21.100+', numericTarget: 21100, suffix: '+',
    label: 'KK Penerima Kurban',
    sublabel: 'Kepala keluarga yang telah merasakan manfaat langsung dari program sosial kurban Lentera Agri.',
  },
]

const CORE_TECH = [
  { icon: SproutIcon,    label: 'Pertanian Presisi' },
  { icon: DropletsIcon,  label: 'Irigasi Cerdas' },
  { icon: TrendingUpIcon,label: 'Peternakan' },
  { icon: UsersIcon,     label: 'Pemberdayaan Petani' },
]

const HIGHLIGHT_PROJECTS = [
  {
    id: '01', client: 'LENTERA AGRI', year: 'Herbal',
    title: 'Bubuk Daun Kelor Lentera',
    location: 'Ciheras, Tasikmalaya',
    tech: 'Produk Herbal',
    desc: 'Bubuk daun kelor berkualitas tinggi yang diproses melalui pengeringan suhu rendah secara cermat untuk mempertahankan kandungan nutrisi, vitamin, dan mineral alaminya secara optimal.',
    tags: ['Kelor', 'Superfood', 'Pengeringan Cermat', 'Nutrisi Terjaga'],
    image: `${import.meta.env.BASE_URL}agri/agri_kelor.webp`,
    placeholder: 'linear-gradient(135deg, #052e16 0%, #166534 50%, #15803d 100%)',
  },
  {
    id: '02', client: 'LENTERA AGRI', year: 'Madu',
    title: 'Lentera Honey',
    location: 'Hutan Nusantara',
    tech: 'Madu Hutan',
    desc: 'Madu hutan mentah (raw honey) yang dipanen dari lebah liar Apis dorsata. Tidak dipanaskan dan tidak diproses berlebihan sehingga enzim, serbuk sari, dan manfaat alaminya tetap utuh. Kemasan 500 ml.',
    tags: ['Raw Honey', 'Apis Dorsata', 'Tidak Dipanaskan', '500 ml'],
    image: `${import.meta.env.BASE_URL}agri/agri_honey.webp`,
    placeholder: 'linear-gradient(135deg, #451a03 0%, #92400e 50%, #b45309 100%)',
  },
  {
    id: '03', client: 'LENTERA AGRI', year: 'VCO',
    title: 'Vircoil — Virgin Coconut Oil',
    location: 'Ciheras, Tasikmalaya',
    tech: 'Virgin Coconut Oil',
    desc: 'VCO (Virgin Coconut Oil) diproses melalui metode fermentasi tradisional tanpa pemanasan sehingga menghasilkan minyak kelapa murni dengan aroma kelapa segar yang khas dan kandungan asam laurat tinggi.',
    tags: ['VCO', 'Fermentasi', 'Tanpa Pemanasan', 'Aroma Kelapa Segar'],
    image: `${import.meta.env.BASE_URL}agri/agri_vco.webp`,
    placeholder: 'linear-gradient(135deg, #1c1917 0%, #44403c 50%, #a8956a 100%)',
  },
]

const ACTIVITIES = [
  {
    no: '01', label: 'Pemilahan Daun Kelor', category: 'Proses Produksi',
    image: `${import.meta.env.BASE_URL}agri/agri_proses_kelor.webp`,
    placeholder: 'linear-gradient(135deg, #052e16 0%, #166534 100%)',
    featured: true,
  },
  {
    no: '02', label: 'Pengeringan Daun Kelor', category: 'Produksi',
    image: `${import.meta.env.BASE_URL}agri/agri_kelor.webp`,
    placeholder: 'linear-gradient(135deg, #0a2218 0%, #15803d 100%)',
    featured: false,
  },
  {
    no: '03', label: 'Vircoil — VCO Murni', category: 'Produk',
    image: `${import.meta.env.BASE_URL}agri/agri_produk_vircoil.webp`,
    placeholder: 'linear-gradient(135deg, #1c1917 0%, #78716c 100%)',
    featured: false,
  },
  {
    no: '04', label: 'Lentera Honey 500ml', category: 'Produk',
    image: `${import.meta.env.BASE_URL}agri/agri_honey.webp`,
    placeholder: 'linear-gradient(135deg, #451a03 0%, #b45309 100%)',
    featured: false,
  },
  {
    no: '05', label: 'Bahan Baku Kelapa', category: 'Bahan Baku',
    image: `${import.meta.env.BASE_URL}agri/agri_vco.webp`,
    placeholder: 'linear-gradient(135deg, #0c2a0a 0%, #166534 100%)',
    featured: false,
  },
]

/* ─── Page ─── */

export default function LenteraAgriPage() {
  const tekRef      = useRef<HTMLDivElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  const tekInView      = useInView(tekRef,      { once: true, amount: 0.15 })
  const statsInView    = useInView(statsRef,    { once: true, amount: 0.2 })
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.1 })

  return (
    <>
      <Navbar />
      <main>

        {/* ══ Hero ══ */}
        <section style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden' }}>
          <div
            aria-hidden
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundImage: `url(${import.meta.env.BASE_URL}divisi_agri.webp)`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}
          />
          <div aria-hidden style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to top, rgba(3,18,8,0.97) 0%, rgba(4,20,10,0.85) 25%, rgba(5,24,12,0.52) 50%, rgba(6,28,14,0.2) 70%, transparent 88%)',
          }} />
          <div aria-hidden style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to right, rgba(3,18,8,0.72) 0%, rgba(3,18,8,0.38) 38%, transparent 65%)',
          }} />

          <div style={{
            position: 'relative', zIndex: 10,
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            minHeight: '100svh',
            paddingTop: 'clamp(100px, 12vh, 140px)',
            paddingBottom: 'clamp(40px, 6vh, 80px)',
          }}>
            <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto', padding: '0 clamp(1.75rem, 5vw, 5rem)' }}>
              <motion.div variants={stagger} initial="hidden" animate="show">

                {/* Eyebrow */}
                <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                    background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.85)',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 500,
                    fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)',
                    color: 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase', letterSpacing: 'clamp(0.12em, 1.5vw, 0.28em)',
                    minWidth: 0,
                    wordBreak: 'break-word',
                  }}>
                    Divisi 02 · Pertanian & Peternakan · Lentera Bumi Nusantara
                  </span>
                </motion.div>

                {/* Heading */}
                <div style={{ overflow: 'hidden' }}>
                  <motion.h1 variants={fadeUp} style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 700,
                    fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
                    lineHeight: 1.07, letterSpacing: '-0.03em',
                    color: '#ffffff', margin: '0 0 4px 0',
                  }}>
                    Lentera Agri
                  </motion.h1>
                </div>
                <div style={{ overflow: 'hidden', marginBottom: 36 }}>
                  <motion.h1 variants={fadeUp} style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 700,
                    fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
                    lineHeight: 1.07, letterSpacing: '-0.03em',
                    color: '#4ade80', margin: 0,
                  }}>
                    Nusantara
                  </motion.h1>
                </div>

                {/* Accent line */}
                <motion.div
                  variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: EASE } } }}
                  style={{
                    height: 2, width: 'clamp(40px, 4vw, 60px)',
                    background: 'linear-gradient(to right, #4ade80, transparent)',
                    transformOrigin: 'left', marginBottom: 28,
                  }}
                />

                {/* Description */}
                <motion.p variants={fadeUp} style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.88rem, 1.05vw, 0.975rem)',
                  lineHeight: 1.8, color: 'rgba(255,255,255,0.62)',
                  maxWidth: 560, margin: '0 0 40px 0',
                }}>
                  Inovasi teknologi pertanian dan peternakan untuk meningkatkan produktivitas
                  serta memberdayakan masyarakat sekitar menuju{' '}
                  <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>ketahanan pangan berkelanjutan</span>{' '}
                  di seluruh Nusantara.
                </motion.p>

                {/* CTAs */}
                <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <motion.a
                    href="#teknologi"
                    onClick={(e) => { e.preventDefault(); document.getElementById('teknologi')?.scrollIntoView({ behavior: 'smooth' }) }}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      fontFamily: 'var(--font-sans)', fontWeight: 600,
                      fontSize: 'clamp(0.82rem, 0.95vw, 0.9rem)',
                      color: '#031208', background: '#4ade80', borderRadius: 999,
                      padding: 'clamp(0.6rem, 1vw, 0.75rem) clamp(1.5rem, 2vw, 2rem)',
                      letterSpacing: '0.02em', textDecoration: 'none',
                    }}
                  >
                    Lihat Teknologi <ArrowRight size={15} />
                  </motion.a>
                  <motion.a
                    href="#hubungi-kami"
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      fontFamily: 'var(--font-sans)', fontWeight: 600,
                      fontSize: 'clamp(0.82rem, 0.95vw, 0.9rem)',
                      color: 'rgba(255,255,255,0.85)',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      borderRadius: 999,
                      padding: 'clamp(0.6rem, 1vw, 0.75rem) clamp(1.5rem, 2vw, 2rem)',
                      letterSpacing: '0.02em', textDecoration: 'none', backdropFilter: 'blur(8px)',
                    }}
                  >
                    Hubungi Kami
                  </motion.a>
                </motion.div>

              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ Stats ══ */}
        <section ref={statsRef} className="relative bg-white overflow-hidden" style={{ borderTop: '3px solid #16a34a' }}>
          <div className="relative z-10 mx-auto" style={{ maxWidth: 1400, padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>

            <motion.div
              variants={stagger} initial="hidden" animate={statsInView ? 'show' : 'hidden'}
              className="mb-14 lg:mb-18 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
            >
              <div>
                <motion.p variants={fadeUp} className="font-semibold uppercase tracking-[0.28em] mb-3"
                  style={{ fontSize: 'clamp(0.6rem, 0.85vw, 0.7rem)', color: '#16a34a' }}>
                  Dalam Angka
                </motion.p>
                <motion.h2 variants={fadeUp} className="font-bold leading-[1.1] m-0"
                  style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.25rem)', letterSpacing: '-0.03em', color: '#0a2540' }}>
                  Bukan sekadar rencana —<br />
                  <span style={{ color: '#16a34a' }}>ini jejaknya.</span>
                </motion.h2>
              </div>
              <motion.p variants={fadeUp} className="text-slate-500 leading-[1.75] lg:max-w-[380px]"
                style={{ fontSize: 'clamp(0.82rem, 1.05vw, 0.9rem)' }}>
                Setiap angka adalah hasil kerja nyata — dari lahan pertanian, kandang ternak,
                hingga program pelatihan bersama komunitas petani lokal.
              </motion.p>
            </motion.div>

            <motion.div
              variants={stagger} initial="hidden" animate={statsInView ? 'show' : 'hidden'}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-100"
            >
              {STATS.map((s) => (
                <AgriStatCard key={s.index} stat={s} inView={statsInView} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══ Teknologi Inti ══ */}
        <section id="teknologi" ref={tekRef} className="relative overflow-hidden" style={{ background: '#ffffff' }}>
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '28px 28px', opacity: 0.35,
          }} />
          <div aria-hidden className="absolute -top-32 -right-32 pointer-events-none rounded-full" style={{
            width: 520, height: 520,
            background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)',
          }} />

          <div
            className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center"
            style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(3.5rem, 6vw, 6rem) clamp(1.5rem, 5vw, 5rem)' }}
          >
            {/* Left */}
            <motion.div variants={stagger} initial="hidden" animate={tekInView ? 'show' : 'hidden'}>
              <motion.div variants={fadeUp} className="mb-5">
                <span style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 600,
                  fontSize: 'clamp(0.62rem, 0.85vw, 0.7rem)', color: '#16a34a',
                  textTransform: 'uppercase', letterSpacing: '0.28em',
                }}>
                  Divisi Pertanian & Peternakan
                </span>
              </motion.div>

              <motion.h2 variants={fadeUp} className="font-bold leading-[1.15] m-0"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.03em', color: '#0a2540' }}>
                Menguasai, Menerapkan
                <br />dan Mengembangkan Agri
              </motion.h2>

              {/* Accent bar */}
              <motion.div
                variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1, transition: { duration: 0.48, ease: EASE } } }}
                style={{
                  height: 3, width: 44,
                  background: 'linear-gradient(to right, #4ade80, rgba(74,222,128,0.2))',
                  borderRadius: 2, transformOrigin: 'left',
                  marginTop: 20, marginBottom: 24,
                }}
              />

              <motion.p variants={fadeUp} className="text-slate-500 leading-[1.8]"
                style={{ fontSize: 'clamp(0.85rem, 1.05vw, 0.95rem)', maxWidth: 440 }}>
                Kami mengembangkan solusi pertanian dan peternakan berbasis teknologi —
                dari sensor presisi, irigasi cerdas, hingga pemberdayaan petani lokal
                untuk produktivitas pangan yang lebih tinggi.
              </motion.p>
            </motion.div>

            {/* Right — 2×2 icon grid */}
            <motion.div
              variants={stagger} initial="hidden" animate={tekInView ? 'show' : 'hidden'}
              className="grid grid-cols-2 gap-6"
            >
              {CORE_TECH.map((tech, i) => (
                <motion.div
                  key={i} variants={fadeUp}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="relative flex items-center justify-center rounded-full" style={{
                    width: 'clamp(72px, 8vw, 88px)', height: 'clamp(72px, 8vw, 88px)',
                    background: 'linear-gradient(148deg, #0a2218 0%, #0f5c35 60%, #16a34a 100%)',
                    boxShadow: '0 6px 24px rgba(15,92,53,0.28), 0 2px 6px rgba(0,0,0,0.12)',
                  }}>
                    <div aria-hidden className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(74,222,128,0.25)' }} />
                    <tech.icon size={28} color="#bbf7d0" strokeWidth={1.6} className="relative z-10" />
                  </div>
                  <span className="font-semibold text-center" style={{
                    fontSize: 'clamp(0.82rem, 1vw, 0.9rem)', color: '#1e3a2e', letterSpacing: '0.02em',
                  }}>
                    {tech.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══ Highlight Project ══ */}
        <section ref={projectsRef} style={{ background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
          <div style={{ height: 3, background: 'linear-gradient(to right, #4ade80, #16a34a, transparent)' }} />

          <div style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>

            <motion.div variants={stagger} initial="hidden" animate={projectsInView ? 'show' : 'hidden'}
              style={{ marginBottom: 'clamp(2.5rem, 4vw, 4rem)' }}>
              <motion.p variants={fadeUp} style={{
                fontFamily: 'var(--font-sans)', fontWeight: 600,
                fontSize: 'clamp(0.6rem, 0.8vw, 0.7rem)', color: '#16a34a',
                textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 16,
              }}>
                Produk Unggulan
              </motion.p>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
                <motion.h2 variants={fadeUp} style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 700,
                  fontSize: 'clamp(2rem, 3.8vw, 3.5rem)',
                  lineHeight: 1.1, letterSpacing: '-0.03em', color: '#0a2540', margin: 0,
                }}>
                  Produk{' '}
                  <span style={{ color: '#16a34a' }}>Lentera Agri</span>
                </motion.h2>
                <motion.p variants={fadeUp} style={{
                  fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.82rem, 1vw, 0.9rem)',
                  lineHeight: 1.75, color: '#64748b', maxWidth: 380, margin: 0,
                }}>
                  Tiga produk unggulan berbasis sumber daya alam lokal yang diproses
                  dengan standar kualitas untuk menjaga kemurnian dan manfaatnya.
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              variants={stagger} initial="hidden" animate={projectsInView ? 'show' : 'hidden'}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(1.25rem, 2vw, 2rem)' }}
            >
              {HIGHLIGHT_PROJECTS.map((p) => (
                <motion.article
                  key={p.id} variants={fadeUp}
                  whileHover="hover" initial="rest" animate="rest"
                  style={{ display: 'flex', flexDirection: 'column', background: '#ffffff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)' }}
                >
                  <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                    <motion.img src={p.image} alt={p.title}
                      variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                      transition={{ duration: 0.55, ease: EASE }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                    <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: -1, background: p.placeholder }} />
                    <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,18,32,0.65) 0%, transparent 55%)' }} />
                    <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, padding: '4px 10px' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(0.58rem, 0.72vw, 0.65rem)', color: '#ffffff', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{p.client}</span>
                    </div>
                    <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)', borderRadius: 4, padding: '3px 8px' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.56rem, 0.7vw, 0.62rem)', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.08em' }}>{p.year}</span>
                    </div>
                    <div style={{ position: 'absolute', bottom: 14, left: 14, background: '#16a34a', borderRadius: 4, padding: '3px 9px' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.56rem, 0.7vw, 0.62rem)', color: '#ffffff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.tech}</span>
                    </div>
                    <span style={{ position: 'absolute', bottom: 14, right: 14, fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(0.65rem, 0.8vw, 0.72rem)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}>{p.id}</span>
                  </div>

                  <div style={{ padding: 'clamp(1.25rem, 2vw, 1.75rem)', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                    <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.68rem, 0.82vw, 0.74rem)', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.16em', margin: 0 }}>{p.location}</p>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.05rem, 1.4vw, 1.3rem)', lineHeight: 1.25, letterSpacing: '-0.02em', color: '#0a2540', margin: 0 }}>{p.title}</h3>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.8rem, 0.92vw, 0.875rem)', lineHeight: 1.72, color: '#64748b', margin: 0, flex: 1 }}>{p.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                      {p.tags.map((tag) => (
                        <span key={tag} style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.68rem', color: '#16a34a', background: '#f0fdf4', borderRadius: 4, padding: '3px 8px', letterSpacing: '0.04em' }}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    variants={{ rest: { opacity: 0, height: 0 }, hover: { opacity: 1, height: 'auto' } }}
                    transition={{ duration: 0.22 }}
                    style={{ overflow: 'hidden', borderTop: '1px solid #f1f5f9' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.75rem', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.78rem, 0.9vw, 0.85rem)', color: '#16a34a', letterSpacing: '0.01em' }}>
                      Lihat detail program <ArrowRight size={15} />
                    </div>
                  </motion.div>
                </motion.article>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ══ Aktivitas Tim ══ */}
        <AgriActivitySection />

        <FooterCTA />
      </main>
    </>
  )
}

/* ─────────────────────────────────────────────
   AgriStatCard + CountUp
───────────────────────────────────────────── */

interface StatItem {
  index: string
  value: string
  numericTarget?: number
  suffix?: string
  label: string
  sublabel: string
}

function AgriStatCard({ stat: s, inView }: { stat: StatItem; inView: boolean }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex flex-col gap-5 cursor-default bg-white hover:bg-[#f0fdf4] transition-colors duration-300"
      style={{ padding: 'clamp(2rem, 3vw, 3rem) clamp(1.5rem, 2.5vw, 2.5rem)' }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-[3px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"
        style={{ background: '#4ade80', transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }} />
      <span className="font-semibold" style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)', color: '#16a34a', letterSpacing: '0.18em' }}>
        {s.index}
      </span>
      <div className="font-bold text-[#0a2540] leading-none" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', letterSpacing: '-0.04em' }}>
        {s.numericTarget !== undefined
          ? <AgriCountUp target={s.numericTarget} suffix={s.suffix ?? ''} inView={inView} />
          : s.value
        }
      </div>
      <motion.div
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.55, ease: EASE } } }}
        className="origin-left h-px w-full"
        style={{ background: 'linear-gradient(to right, #4ade80 0%, #e2e8f0 60%)' }}
      />
      <div>
        <p className="font-semibold text-[#0a2540] mb-2" style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', letterSpacing: '-0.01em' }}>{s.label}</p>
        <p className="text-slate-400 leading-[1.7]" style={{ fontSize: 'clamp(0.75rem, 0.9vw, 0.825rem)' }}>{s.sublabel}</p>
      </div>
    </motion.div>
  )
}

function AgriCountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const count   = useMotionValue(0)
  const display = useTransform(count, (v) => Math.round(v).toLocaleString('id-ID'))
  useEffect(() => {
    if (!inView) return
    count.set(0)
    const ctrl = animate(count, target, { duration: 2.0, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] })
    return ctrl.stop
  }, [inView, count, target])
  return <span><motion.span>{display}</motion.span>{suffix}</span>
}

/* ─────────────────────────────────────────────
   Activity Section
───────────────────────────────────────────── */

function AgriActivitySection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })

  const headerV: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } } }
  const gridV:   Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1,  delayChildren: 0.15 } } }

  return (
    <section ref={ref} style={{ background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ height: 3, background: 'linear-gradient(to right, #4ade80, #16a34a, transparent)' }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
        backgroundSize: '32px 32px', opacity: 0.4,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>

        <motion.div variants={headerV} initial="hidden" animate={inView ? 'show' : 'hidden'}
          style={{ marginBottom: 'clamp(2.5rem, 4vw, 4rem)' }}>
          <motion.p variants={fadeUp} style={{
            fontFamily: 'var(--font-sans)', fontWeight: 600,
            fontSize: 'clamp(0.6rem, 0.8vw, 0.7rem)', color: '#16a34a',
            textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 16,
          }}>
            Lapangan & Komunitas
          </motion.p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700,
              fontSize: 'clamp(2rem, 3.8vw, 3.5rem)',
              lineHeight: 1.1, letterSpacing: '-0.03em', color: '#0a2540', margin: 0,
            }}>
              Di Balik{' '}
              <span style={{ color: '#16a34a' }}>Produk Kami</span>
            </motion.h2>
            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.82rem, 1vw, 0.9rem)',
              lineHeight: 1.75, color: '#64748b', maxWidth: 380, margin: 0,
            }}>
              Dari pemilahan bahan baku hingga produk siap pakai — setiap langkah
              dikerjakan dengan teliti untuk menjaga kualitas dan kemurnian alaminya.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          variants={gridV} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="activity-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'clamp(220px, 28vw, 340px) clamp(180px, 22vw, 280px)',
            gap: 'clamp(0.75rem, 1.2vw, 1rem)',
          }}
        >
          {ACTIVITIES.map((act) => (
            <motion.div
              key={act.no} variants={fadeUp}
              className="activity-card"
              style={{ gridColumn: act.featured ? '1 / 3' : undefined, borderRadius: 16, overflow: 'hidden' }}
            >
              <motion.div
                whileHover="hover" initial="rest" animate="rest"
                style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 8px 28px rgba(0,0,0,0.06)' }}
              >
                <div aria-hidden style={{ position: 'absolute', inset: 0, background: act.placeholder }} />
                <motion.img src={act.image} alt={act.label}
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.07 } }}
                  transition={{ duration: 0.65, ease: EASE }}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  onError={(e) => { e.currentTarget.style.opacity = '0' }}
                />
                <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,18,8,0.82) 0%, rgba(4,18,8,0.35) 45%, rgba(4,18,8,0.08) 100%)' }} />
                <motion.div aria-hidden
                  variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                  transition={{ duration: 0.3 }}
                  style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(22,163,74,0.18) 0%, transparent 55%)' }}
                />

                <span style={{ position: 'absolute', top: 14, left: 16, fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(0.6rem, 0.75vw, 0.68rem)', color: '#4ade80', letterSpacing: '0.22em' }}>
                  {act.no}
                </span>
                <div style={{ position: 'absolute', top: 12, right: 14, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 6, padding: '3px 10px' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.56rem, 0.7vw, 0.62rem)', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {act.category}
                  </span>
                </div>

                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(1rem, 1.8vw, 1.4rem)' }}>
                  <motion.div
                    variants={{ rest: { scaleX: 0, opacity: 0 }, hover: { scaleX: 1, opacity: 1 } }}
                    transition={{ duration: 0.32, ease: EASE }}
                    style={{ height: 2, width: 36, background: '#4ade80', borderRadius: 1, transformOrigin: 'left', marginBottom: 8 }}
                  />
                  <motion.p
                    variants={{ rest: { y: 0, opacity: 0.9 }, hover: { y: -3, opacity: 1 } }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{
                      fontFamily: 'var(--font-sans)', fontWeight: 700,
                      fontSize: act.featured ? 'clamp(1.05rem, 1.5vw, 1.3rem)' : 'clamp(0.88rem, 1.1vw, 1rem)',
                      lineHeight: 1.2, letterSpacing: '-0.02em', color: '#ffffff', margin: 0,
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
