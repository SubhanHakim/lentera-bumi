import { useRef } from 'react'
import {
  motion, useInView, type Variants,
} from 'framer-motion'
import {
  TrendingUpIcon, ArrowRight,
  ShieldCheckIcon, ScaleIcon, MapPinIcon, SmartphoneIcon,
  HeartHandshakeIcon, BadgeCheckIcon,
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
  const projectsRef = useRef<HTMLDivElement>(null)

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
                    transformOrigin: 'left', marginBottom: 40,
                  }}
                />

                {/* CTAs */}
                <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
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
                    Lihat Produk <ArrowRight size={15} />
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

                {/* Mini stats */}
                <motion.div
                  variants={fadeUp}
                  style={{
                    display: 'flex', flexWrap: 'wrap', gap: 'clamp(1rem, 3vw, 2.5rem)',
                    paddingTop: 8,
                  }}
                >
                  {[
                    { value: '65', label: 'Mitra Peternak' },
                    { value: '805+', label: 'Domba & Kambing' },
                    { value: '23+', label: 'Sapi' },
                    { value: '21.100+', label: 'KK Penerima Kurban' },
                  ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{
                        fontFamily: 'var(--font-sans)', fontWeight: 700,
                        fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
                        color: '#4ade80', letterSpacing: '-0.02em', lineHeight: 1.1,
                      }}>
                        {s.value}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(0.65rem, 0.8vw, 0.72rem)',
                        color: 'rgba(255,255,255,0.45)',
                        letterSpacing: '0.04em',
                      }}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </motion.div>

              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ Deskripsi Divisi ══ */}
        <section style={{
          position: 'relative', background: '#ffffff', overflow: 'hidden',
          borderTop: '3px solid #16a34a',
        }}>
          {/* Dot-grid */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '28px 28px', opacity: 0.3,
          }} />
          {/* Green glow */}
          <div aria-hidden style={{
            position: 'absolute', top: -80, right: -80, pointerEvents: 'none',
            width: 460, height: 460, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)',
          }} />

          <AgriDeskripsiContent />
        </section>

        {/* ══ Ekosistem Kami ══ */}
        <AgriEkosistemSection />

        {/* ══ Layanan Lentera Farm ══ */}
        <LayananLenteraFarmSection />

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

        {/* ══ Platform Belanja ══ */}
        <PlatformBelanjaSection />

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


/* ─────────────────────────────────────────────
   Layanan Lentera Farm Section
───────────────────────────────────────────── */

const QURBAN_FEATURES = [
  {
    icon: ShieldCheckIcon,
    title: 'Hewan Qurban Sehat & Terpantau',
    desc: 'Kami memastikan setiap hewan qurban cukup usia, sehat, dan dipantau secara berkala untuk menjaga kualitas serta berat badan yang optimal sehingga manfaatnya dapat dirasakan lebih luas.',
  },
  {
    icon: ScaleIcon,
    title: 'Sumber Transparan & Harga yang Adil',
    desc: 'Hewan qurban berasal dari peternak Lentera Farm dan mitra lokal yang dibina secara langsung. Sistem harga berbasis timbang hidup diterapkan agar peternak dan konsumen sama-sama memperoleh nilai yang adil.',
  },
  {
    icon: MapPinIcon,
    title: 'Penyaluran Tepat Sasaran',
    desc: 'Daging qurban disalurkan ke desa-desa pelosok Tasikmalaya Selatan melalui pendataan bersama tokoh lokal terpercaya, agar manfaat qurban dapat diterima masyarakat yang benar-benar membutuhkan.',
  },
  {
    icon: SmartphoneIcon,
    title: 'Pemesanan Mudah & Tetap Sesuai Syariat',
    desc: 'Seluruh proses pemesanan dapat dilakukan secara online dengan mudah, mulai dari memilih hewan hingga pembayaran. Proses penyembelihan dan distribusi berjalan sesuai syariat serta terdokumentasi dengan baik.',
  },
]

const AQIQAH_FEATURES = [
  {
    icon: BadgeCheckIcon,
    title: 'Hewan Aqiqah Sehat & Sesuai Syariat',
    desc: 'Kami memastikan setiap hewan aqiqah cukup usia, sehat, dan berkualitas sehingga memenuhi syarat sekaligus memberikan manfaat terbaik bagi penerima.',
  },
  {
    icon: HeartHandshakeIcon,
    title: 'Dari Masyarakat untuk Masyarakat',
    desc: 'Hewan aqiqah dibeli dari peternak lokal, dimasak oleh warga sekitar, lalu dibagikan kembali kepada masyarakat kampung agar manfaat ekonomi dan sosialnya dapat dirasakan bersama.',
  },
  {
    icon: TrendingUpIcon,
    title: 'Mendukung Kesejahteraan Peternak',
    desc: 'Setiap pembelian hewan aqiqah turut membantu peternak lokal memperoleh pendapatan yang lebih stabil tanpa harus menunggu musim qurban.',
  },
  {
    icon: SmartphoneIcon,
    title: 'Pemesanan Praktis & Transparan',
    desc: 'Seluruh proses aqiqah dapat dilakukan secara online dengan mudah, mulai dari pemilihan paket hingga pembayaran, lengkap dengan dokumentasi penyembelihan dan distribusi makanan.',
  },
]

function ProgramBlock({
  title, features, image,
}: {
  title: string
  features: { icon: React.ElementType; title: string; desc: string }[]
  image: string
}) {
  const cardV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
      {/* Program header with photo */}
      <motion.div
        variants={fadeUp}
        style={{
          position: 'relative',
          borderRadius: 16,
          overflow: 'hidden',
          height: 'clamp(140px, 18vw, 220px)',
        }}
      >
        <img
          src={image}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(3,18,8,0.88) 0%, rgba(3,18,8,0.55) 55%, rgba(3,18,8,0.2) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          gap: 8,
        }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 600,
            fontSize: 'clamp(0.6rem, 0.72vw, 0.68rem)',
            color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.26em',
          }}>
            Lentera Farm
          </span>
          <h3 style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700,
            fontSize: 'clamp(1.35rem, 2.5vw, 2rem)',
            lineHeight: 1.12, letterSpacing: '-0.025em',
            color: '#ffffff', margin: 0,
          }}>
            {title}
          </h3>
          <div style={{
            height: 2, width: 36,
            background: 'linear-gradient(to right, #4ade80, transparent)',
            borderRadius: 2,
          }} />
        </div>
      </motion.div>

      {/* Feature cards 2×2 */}
      <motion.div
        variants={cardV}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(0.875rem, 1.5vw, 1.25rem)',
        }}
      >
        {features.map((f, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 14,
              padding: 'clamp(1.25rem, 2vw, 1.75rem)',
              display: 'flex', flexDirection: 'column', gap: 14,
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            whileHover={{
              y: -3,
              boxShadow: '0 8px 28px rgba(22,163,74,0.1)',
            }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {/* Icon */}
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: '#f0fdf4',
              border: '1px solid rgba(22,163,74,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <f.icon size={18} color="#16a34a" strokeWidth={1.8} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <h4 style={{
                fontFamily: 'var(--font-sans)', fontWeight: 700,
                fontSize: 'clamp(0.88rem, 1.05vw, 0.975rem)',
                lineHeight: 1.3, letterSpacing: '-0.01em',
                color: '#0a2540', margin: 0,
              }}>
                {f.title}
              </h4>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.78rem, 0.9vw, 0.84rem)',
                lineHeight: 1.72, color: '#64748b', margin: 0,
              }}>
                {f.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

function LayananLenteraFarmSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })

  const containerV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
  }

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        background: '#f8fafc',
        overflow: 'hidden',
        borderTop: '3px solid #16a34a',
      }}
    >
      {/* Dot-grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
        backgroundSize: '28px 28px', opacity: 0.3,
      }} />
      {/* Green glow top-right */}
      <div aria-hidden style={{
        position: 'absolute', top: -100, right: -100, pointerEvents: 'none',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1400, margin: '0 auto',
        padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
      }}>
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: '#16a34a', boxShadow: '0 0 8px rgba(22,163,74,0.8)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.28em' }}>
              Layanan Lentera Farm
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700,
              fontSize: 'clamp(1.9rem, 3.5vw, 3rem)',
              lineHeight: 1.1, letterSpacing: '-0.03em',
              color: '#0a2540', margin: '0 0 16px 0',
            }}
          >
            Dari kandang hingga <span style={{ color: '#16a34a' }}>meja makan</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.88rem, 1.05vw, 0.975rem)',
              lineHeight: 1.8, color: '#475569',
              maxWidth: 560, margin: '0 0 20px 0',
            }}
          >
            Lentera Farm melayani kebutuhan hewan qurban dan aqiqah dengan standar syariat,
            harga transparan, dan penyaluran yang tepat sasaran bagi masyarakat sekitar.
          </motion.p>

          <motion.div
            variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1, transition: { duration: 0.48, ease: EASE } } }}
            style={{
              height: 3, width: 48,
              background: 'linear-gradient(to right, #16a34a, rgba(22,163,74,0.2))',
              borderRadius: 2, transformOrigin: 'left',
              marginBottom: 'clamp(2.5rem, 4vw, 4rem)',
            }}
          />

          {/* Two program blocks stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(3rem, 5vw, 5rem)' }}>
            <ProgramBlock
              title="Program Qurban"
              features={QURBAN_FEATURES}
              image={`${import.meta.env.BASE_URL}divisi_agri.webp`}
            />
            <ProgramBlock
              title="Layanan Aqiqah"
              features={AQIQAH_FEATURES}
              image={`${import.meta.env.BASE_URL}agri/agri_proses_kelor.webp`}
            />
          </div>

          {/* CTA */}
          <motion.div variants={fadeUp} style={{ marginTop: 'clamp(2.5rem, 4vw, 4rem)', display: 'flex', justifyContent: 'center' }}>
            <a
              href="#hubungi-kami"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontFamily: 'var(--font-sans)', fontWeight: 600,
                fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                borderRadius: 999,
                padding: 'clamp(0.75rem, 1.2vw, 0.95rem) clamp(2rem, 3vw, 2.75rem)',
                textDecoration: 'none', letterSpacing: '0.02em',
                boxShadow: '0 4px 20px rgba(22,163,74,0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(22,163,74,0.42)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(22,163,74,0.3)'
              }}
            >
              Hubungi Kami
              <ArrowRight size={16} strokeWidth={2.2} />
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

function AgriEkosistemSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  const containerV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
  }

  const EKOSISTEM = [
    {
      initial: 'LF',
      name: 'Lentera Farm',
      color: '#16a34a',
      colorBg: '#f0fdf4',
      colorBorder: 'rgba(22,163,74,0.2)',
      desc: 'Kami bermitra dengan masyarakat lokal untuk merawat dan mengembangkan peternakan secara adil dan berkelanjutan guna menghasilkan ternak terbaik bagi konsumen.',
    },
    {
      initial: 'LO',
      name: 'Lentera Organik',
      color: '#15803d',
      colorBg: '#f0fdf4',
      colorBorder: 'rgba(21,128,61,0.2)',
      desc: 'Produksi dan penjualan produk olahan hasil bumi yang alami dan menyehatkan — dari ladang langsung ke tangan konsumen.',
    },
  ]

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #031208 0%, #062010 50%, #0a3018 100%)',
        overflow: 'hidden',
      }}
    >
      <div style={{ height: 3, background: 'linear-gradient(to right, #4ade80, #16a34a, transparent)' }} />

      {/* Radial glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74,222,128,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1400, margin: '0 auto',
        padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
      }}>
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.85)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.28em' }}>
              Ekosistem Kami
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700,
              fontSize: 'clamp(1.9rem, 3.5vw, 3rem)',
              lineHeight: 1.1, letterSpacing: '-0.03em',
              color: '#ffffff', margin: '0 0 20px 0',
            }}
          >
            Dua entitas, <span style={{ color: '#4ade80' }}>satu misi</span>
          </motion.h2>

          <motion.div
            variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1, transition: { duration: 0.48, ease: EASE } } }}
            style={{
              height: 2, width: 48,
              background: 'linear-gradient(to right, #4ade80, transparent)',
              borderRadius: 2, transformOrigin: 'left', marginBottom: 'clamp(2.5rem, 4vw, 4rem)',
            }}
          />

          {/* Cards */}
          <motion.div
            variants={containerV}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
              gap: 'clamp(1.25rem, 2.5vw, 2rem)',
            }}
          >
            {EKOSISTEM.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(74,222,128,0.18)',
                  borderRadius: 16,
                  padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                {/* Logo placeholder */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                    background: item.colorBg,
                    border: `1px solid ${item.colorBorder}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '0.9rem', color: item.color, letterSpacing: '-0.02em' }}>
                      {item.initial}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', color: '#ffffff', margin: 0, letterSpacing: '-0.01em' }}>
                      {item.name}
                    </p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.6rem, 0.72vw, 0.68rem)', color: item.color, margin: 0, textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 600 }}>
                      Lentera Agri Nusantara
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(74,222,128,0.12)' }} />

                {/* Description */}
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.85rem, 1vw, 0.925rem)',
                  lineHeight: 1.8, color: 'rgba(255,255,255,0.55)',
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function AgriDeskripsiContent() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const containerV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
  }

  const FOKUS = ['Pertanian', 'Peternakan', 'Pemberdayaan Masyarakat']

  return (
    <div
      ref={ref}
      style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1400, margin: '0 auto',
        padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
        gap: 'clamp(3rem, 6vw, 6rem)',
        alignItems: 'center',
      }}
    >
      {/* Left — label + heading */}
      <motion.div variants={containerV} initial="hidden" animate={inView ? 'show' : 'hidden'}>
        <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: '#16a34a', boxShadow: '0 0 8px rgba(22,163,74,0.8)' }} />
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.28em' }}>
            Divisi 02
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700,
            fontSize: 'clamp(1.85rem, 3.5vw, 2.9rem)',
            lineHeight: 1.1, letterSpacing: '-0.03em',
            color: '#0a2540', margin: '0 0 20px 0',
          }}
        >
          Lentera Agri <br />
          <span style={{ color: '#16a34a' }}>Nusantara</span>
        </motion.h2>

        <motion.div
          variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1, transition: { duration: 0.48, ease: EASE } } }}
          style={{
            height: 3, width: 48,
            background: 'linear-gradient(to right, #16a34a, rgba(22,163,74,0.2))',
            borderRadius: 2, transformOrigin: 'left', marginBottom: 28,
          }}
        />

        <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {FOKUS.map((f, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-sans)', fontWeight: 600,
              fontSize: 'clamp(0.72rem, 0.85vw, 0.8rem)',
              color: '#16a34a', background: '#f0fdf4',
              border: '1px solid rgba(22,163,74,0.2)',
              borderRadius: 999, padding: '0.4rem 1rem', letterSpacing: '0.02em',
            }}>
              {f}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Right — description */}
      <motion.div variants={containerV} initial="hidden" animate={inView ? 'show' : 'hidden'}>
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)',
            lineHeight: 1.85, color: '#475569', margin: 0,
          }}
        >
          Divisi yang bergerak dalam pemanfaatan potensi serta pengembangan teknologi
          pertanian dan peternakan untuk meningkatkan nilainya dan{' '}
          <span style={{ fontWeight: 600, color: '#0a2540' }}>memberdayakan masyarakat</span>.
        </motion.p>
      </motion.div>
    </div>
  )
}


/* ─────────────────────────────────────────────
   Activity Section
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   Platform Belanja Section
───────────────────────────────────────────── */

function PlatformBelanjaSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const containerV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  }

  const PLATFORMS = [
    {
      name: 'Shopee',
      handle: 'Lentera Organik',
      href: 'https://shopee.co.id/tokolenterabumi',
      bg: '#EE4D2D',
      bgHover: '#d94424',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.5 9h-1.18A6.5 6.5 0 0 0 5.68 9H4.5A2.5 2.5 0 0 0 2 11.5v8A2.5 2.5 0 0 0 4.5 22h15a2.5 2.5 0 0 0 2.5-2.5v-8A2.5 2.5 0 0 0 19.5 9zM12 4a4.5 4.5 0 0 1 4.46 5H7.54A4.5 4.5 0 0 1 12 4zm0 10a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"/>
        </svg>
      ),
    },
    {
      name: 'Tokopedia',
      handle: 'Lentera Organik',
      href: 'https://www.tokopedia.com/lenterabumi',
      bg: '#42B549',
      bgHover: '#359940',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4 10H8a1 1 0 0 1-.894-1.447l2-4A1 1 0 0 1 10 10h4a1 1 0 0 1 .894.553l2 4A1 1 0 0 1 16 16z"/>
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      handle: 'Chat Langsung',
      href: 'https://api.whatsapp.com/send/?phone=6281395221474&text&type=phone_number&app_absent=0',
      bg: '#25D366',
      bgHover: '#1ebe59',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.77.46 3.432 1.265 4.881L2 22l5.232-1.232A9.953 9.953 0 0 0 12.004 22C17.523 22 22 17.523 22 12.004 22 6.477 17.523 2 12.004 2zm0 18.154a8.13 8.13 0 0 1-4.163-1.14l-.298-.177-3.104.732.766-3.025-.194-.31A8.154 8.154 0 1 1 12.004 20.154z"/>
        </svg>
      ),
    },
  ]

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #031208 0%, #062010 50%, #0a3018 100%)',
        overflow: 'hidden',
      }}
    >
      <div style={{ height: 3, background: 'linear-gradient(to right, #4ade80, #16a34a, transparent)' }} />

      {/* Radial glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74,222,128,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1400, margin: '0 auto',
        padding: 'clamp(3.5rem, 6vw, 6rem) clamp(1.5rem, 5vw, 5rem)',
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
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.85)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.28em' }}>
              Tersedia Di
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700,
              fontSize: 'clamp(1.75rem, 3.2vw, 2.6rem)',
              lineHeight: 1.1, letterSpacing: '-0.03em',
              color: '#ffffff', margin: '0 0 12px 0',
            }}
          >
            Beli produk kami di platform{' '}
            <span style={{ color: '#4ade80' }}>favoritmu</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.85rem, 1vw, 0.925rem)',
              lineHeight: 1.75, color: 'rgba(255,255,255,0.5)',
              maxWidth: 480, margin: '0 0 48px 0',
            }}
          >
            Produk Lentera Organik tersedia di berbagai platform belanja online.
            Pilih yang paling nyaman untukmu.
          </motion.p>

          {/* Platform cards */}
          <motion.div
            variants={containerV}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
              width: '100%',
            }}
          >
            {PLATFORMS.map((p, i) => (
              <motion.a
                key={i}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25, ease: EASE }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 16,
                  padding: 'clamp(1.1rem, 2vw, 1.5rem) clamp(1.5rem, 3vw, 2.25rem)',
                  textDecoration: 'none',
                  minWidth: 'clamp(200px, 25vw, 280px)',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,222,128,0.35)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              >
                {/* Platform icon badge */}
                <div style={{
                  width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                  background: p.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: `0 4px 16px ${p.bg}55`,
                }}>
                  {p.icon}
                </div>

                {/* Text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, textAlign: 'left' }}>
                  <span style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 700,
                    fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                    color: '#ffffff', letterSpacing: '-0.01em',
                  }}>
                    {p.name}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(0.7rem, 0.82vw, 0.76rem)',
                    color: 'rgba(255,255,255,0.45)',
                    letterSpacing: '0.04em',
                  }}>
                    {p.handle}
                  </span>
                </div>

                {/* Arrow */}
                <ArrowRight
                  size={16}
                  color="rgba(255,255,255,0.3)"
                  style={{ marginLeft: 'auto', flexShrink: 0 }}
                />
              </motion.a>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}

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
