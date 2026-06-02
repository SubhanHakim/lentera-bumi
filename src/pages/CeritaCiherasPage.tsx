import { useRef, useEffect, useState } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { ArrowRight, BookOpen, Quote, ExternalLink, Calendar, User } from 'lucide-react'
import { FaInstagram, FaYoutube } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import FooterCTA from '../components/FooterCTA'

/* ─── Motion — identik dengan halaman lain ─── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
}
const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
}

/* ─── Types ─── */
interface WpPost {
  id: number
  date: string
  title: { rendered: string }
  excerpt: { rendered: string }
  link: string
  _embedded?: { 'wp:featuredmedia'?: [{ source_url: string }] }
}

/* ─── Static data ─── */
const TESTIMONIALS = [
  {
    quote: 'Saya sangat senang disini, benar benar tempat KP idaman. Bukan hanya ilmu tentang PLTB saja yang bisa didapatkan disini, tetapi ilmu kehidupan pun juga. Semua terkalahkan dengan cerita-cerita dan ilmu-ilmu yang diberikan oleh bang Ricky, Tim LBN, dan teman-teman disini.',
    author: 'James Morrelo',
    role: 'Mahasiswa KP',
  },
  {
    quote: 'Ciheras bukan sekadar tempat riset — ini adalah ruang di mana kamu bisa menemukan dirimu yang sebenarnya. Energi yang ada di sini, baik dari angin maupun dari orang-orangnya, benar-benar luar biasa.',
    author: 'Nasrul',
    role: 'Alumni Magang LBN',
    avatar: `${import.meta.env.BASE_URL}nasrul.webp`,
  },
]

const PLATFORMS = [
  {
    Icon: BookOpen,
    label: 'Blog',
    desc: 'Artikel dan cerita mendalam dari lapangan Ciheras, ditulis langsung oleh tim dan alumni.',
    href: 'https://lenterabumi.com/blog',
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
  },
  {
    Icon: FaInstagram,
    label: 'Instagram',
    desc: 'Momen-momen harian dan galeri kegiatan. Ikuti kami di @lenterabuminusantara.',
    href: 'https://instagram.com/lenterabuminusantara',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
  },
  {
    Icon: FaYoutube,
    label: 'YouTube',
    desc: 'Video dokumentasi, tutorial energi terbarukan, dan liputan kegiatan komunitas.',
    href: 'https://youtube.com/@lenterabuminusantara',
    color: '#dc2626',
    bg: '#fef2f2',
    border: '#fecaca',
  },
]

/* ─── Blog fetch ─── */
function useWpPosts() {
  const [posts, setPosts] = useState<WpPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const url = import.meta.env.DEV
      ? '/api/wp/wp/v2/posts?per_page=3&_embed=1'
      : 'https://lenterabumi.com/wp-json/wp/v2/posts?per_page=3&_embed=1'
    fetch(url)
      .then(r => r.json())
      .then((d: WpPost[]) => { setPosts(d); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  return { posts, loading, error }
}

function stripHtml(html: string) { return html.replace(/<[^>]*>/g, '').trim() }
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function CeritaCiherasPage() {
  const { posts, loading: postsLoading, error: postsError } = useWpPosts()

  const sec1Ref = useRef<HTMLElement>(null)
  const sec2Ref = useRef<HTMLElement>(null)
  const sec3Ref = useRef<HTMLElement>(null)
  const sec4Ref = useRef<HTMLElement>(null)
  const sec1In  = useInView(sec1Ref, { once: true, amount: 0.15 })
  const sec2In  = useInView(sec2Ref, { once: true, amount: 0.15 })
  const sec3In  = useInView(sec3Ref, { once: true, amount: 0.08 })
  const sec4In  = useInView(sec4Ref, { once: true, amount: 0.15 })

  return (
    <>
      <Navbar />
      <main>

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden' }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `url(${import.meta.env.BASE_URL}kegiatan/kegiatan_vawt_tower.webp)`,
            backgroundSize: 'cover', backgroundPosition: 'center 30%',
          }} />
          <div aria-hidden style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to top, rgba(3,8,20,0.97) 0%, rgba(4,10,26,0.85) 25%, rgba(5,14,32,0.52) 50%, rgba(6,18,38,0.2) 70%, transparent 88%)',
          }} />
          <div aria-hidden style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to right, rgba(3,8,20,0.72) 0%, rgba(3,8,20,0.38) 38%, transparent 65%)',
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
                    background: '#93c5fd', boxShadow: '0 0 8px rgba(147,197,253,0.85)',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 500,
                    fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)',
                    color: 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase', letterSpacing: 'clamp(0.12em, 1.5vw, 0.28em)',
                    minWidth: 0,
                    wordBreak: 'break-word',
                  }}>
                    Cerita · Inspirasi · Komunitas · Lentera Bumi Nusantara
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
                    Tentang
                  </motion.h1>
                </div>
                <div style={{ overflow: 'hidden', marginBottom: 36 }}>
                  <motion.h1 variants={fadeUp} style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 700,
                    fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
                    lineHeight: 1.07, letterSpacing: '-0.03em',
                    color: '#93c5fd', margin: 0,
                  }}>
                    Cerita Ciheras
                  </motion.h1>
                </div>

                {/* Accent line */}
                <motion.div
                  variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: EASE } } }}
                  style={{
                    height: 2, width: 'clamp(40px, 4vw, 60px)',
                    background: 'linear-gradient(to right, #93c5fd, transparent)',
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
                  Media inspirasi dari{' '}
                  <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                    Lentera Bumi Nusantara
                  </span>{' '}
                  dan Ciheras University — menyebarkan spirit dan kisah nyata dari sudut Ciheras, Tasikmalaya, ke seluruh dunia.
                </motion.p>

                {/* CTAs */}
                <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <motion.a
                    href="https://lenterabumi.com/blog" target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      fontFamily: 'var(--font-sans)', fontWeight: 600,
                      fontSize: 'clamp(0.82rem, 0.95vw, 0.9rem)',
                      color: '#0c1e30', background: '#93c5fd', borderRadius: 999,
                      padding: 'clamp(0.6rem, 1vw, 0.75rem) clamp(1.5rem, 2vw, 2rem)',
                      letterSpacing: '0.02em', textDecoration: 'none',
                    }}
                  >
                    Baca Blog <ArrowRight size={15} />
                  </motion.a>
                  <motion.a
                    href="https://instagram.com/lenterabuminusantara" target="_blank" rel="noopener noreferrer"
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
                    <FaInstagram size={14} /> #ceritaciheras
                  </motion.a>
                </motion.div>

              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ APA ITU CERITA CIHERAS ══════════════════════════ */}
        <section ref={sec1Ref} className="relative bg-white overflow-hidden" style={{ borderTop: '3px solid #2563eb' }}>
          <div className="relative z-10 mx-auto" style={{ maxWidth: 1400, padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>

            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center"
            >
              {/* Left — Text */}
              <motion.div variants={stagger} initial="hidden" animate={sec1In ? 'show' : 'hidden'}>

                <motion.p variants={fadeUp} className="font-semibold uppercase tracking-[0.28em] mb-3"
                  style={{ fontSize: 'clamp(0.6rem, 0.85vw, 0.7rem)', color: '#2563eb' }}>
                  Tentang
                </motion.p>

                <motion.h2 variants={fadeUp} className="font-bold leading-[1.1] m-0"
                  style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.25rem)', letterSpacing: '-0.03em', color: '#0a2540' }}>
                  Apa itu Cerita{' '}
                  <span style={{ color: '#2563eb' }}>Ciheras?</span>
                </motion.h2>

                {/* Accent bar */}
                <motion.div
                  variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1, transition: { duration: 0.48, ease: EASE } } }}
                  style={{
                    height: 3, width: 44,
                    background: 'linear-gradient(to right, #93c5fd, rgba(147,197,253,0.2))',
                    borderRadius: 2, transformOrigin: 'left',
                    marginTop: 20, marginBottom: 24,
                  }}
                />

                <motion.p variants={fadeUp} className="text-slate-500 leading-[1.8] mb-4"
                  style={{ fontSize: 'clamp(0.85rem, 1.05vw, 0.95rem)' }}>
                  <strong className="text-slate-800">Cerita Ciheras</strong> adalah media untuk menceritakan segala aktivitas di Lentera Bumi Nusantara dan Ciheras University ke seluruh penjuru Nusantara dan dunia. Cerita Ciheras bertujuan untuk menyebarkan spirit dan inspirasi dari pengalaman-pengalaman menarik di Ciheras.
                </motion.p>

                <motion.p variants={fadeUp} className="text-slate-500 leading-[1.8]"
                  style={{ fontSize: 'clamp(0.85rem, 1.05vw, 0.95rem)' }}>
                  Cerita Ciheras hadir sejak tahun <strong className="text-slate-800">2012</strong>, saat Founder Lentera Bumi Nusantara, <strong className="text-slate-800">Ricky Elson</strong>, memulai gerakan di Indonesia setelah kembali dari Jepang. Ia memutuskan menetap dan mengembangkan gerakan <em>Membangun Diri Membangun Negeri</em> di Ciheras, Tasikmalaya — merintis pusat pembelajaran teknologi energi baru terbarukan, khususnya Turbin Angin. Sejak saat itulah kisah-kisah aktivitas di Ciheras diberi nama{' '}
                  <strong style={{ color: '#2563eb' }}>#ceritaciheras</strong>.
                </motion.p>

                {/* Founded chip */}
                <motion.div variants={fadeUp} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  marginTop: 28, background: '#eff6ff',
                  border: '1px solid #bfdbfe', borderRadius: 12, padding: '12px 18px',
                }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>12</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#2563eb', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Berdiri Sejak</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0a2540' }}>2012 · Ciheras, Tasikmalaya</div>
                  </div>
                </motion.div>

              </motion.div>

              {/* Right — Image */}
              <motion.div
                variants={fadeUp} initial="hidden" animate={sec1In ? 'show' : 'hidden'}
                transition={{ delay: 0.15 }}
                style={{ position: 'relative' }}
              >
                <div style={{
                  position: 'relative', borderRadius: 20, overflow: 'hidden',
                  aspectRatio: '4/5',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.07)',
                }}>
                  <img
                    src={`${import.meta.env.BASE_URL}kegiatan/kegiatan_instalasi_turbin.webp`}
                    alt="Instalasi turbin angin di Ciheras"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px 20px', background: 'linear-gradient(to top, rgba(3,8,20,0.8), transparent)' }}>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'rgba(255,255,255,0.72)', margin: 0 }}>
                      Instalasi turbin angin, Ciheras Tasikmalaya
                    </p>
                  </div>
                </div>
                {/* Decorative corners */}
                <div aria-hidden style={{ position: 'absolute', top: -14, right: -14, width: 72, height: 72, borderRadius: 14, border: '2px solid #bfdbfe', zIndex: -1 }} />
                <div aria-hidden style={{ position: 'absolute', bottom: -14, left: -14, width: 48, height: 48, borderRadius: 10, background: '#eff6ff', zIndex: -1 }} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ CARA MENGIKUTI ═══════════════════════════════════ */}
        <section ref={sec2Ref} style={{ background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '28px 28px', opacity: 0.35,
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

              {/* Left — Image */}
              <motion.div
                variants={fadeUp} initial="hidden" animate={sec2In ? 'show' : 'hidden'}
                style={{ position: 'relative' }}
              >
                <div style={{
                  borderRadius: 20, overflow: 'hidden',
                  aspectRatio: '4/3',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.06)',
                  position: 'relative',
                }}>
                  <img
                    src={`${import.meta.env.BASE_URL}kegiatan/kegiatan_tim_lapangan.webp`}
                    alt="Tim lapangan Lentera Bumi Nusantara"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                {/* Floating stat */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={sec2In ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
                  style={{
                    position: 'absolute', bottom: -18, right: -10,
                    background: '#fff', borderRadius: 14, padding: '14px 18px',
                    boxShadow: '0 8px 28px rgba(0,0,0,0.10)', border: '1px solid #e5e7eb',
                  }}
                >
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Sejak</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: '#0a2540', lineHeight: 1, letterSpacing: '-0.04em' }}>2012</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>#ceritaciheras</div>
                </motion.div>
              </motion.div>

              {/* Right — Text */}
              <motion.div variants={stagger} initial="hidden" animate={sec2In ? 'show' : 'hidden'}>

                <motion.p variants={fadeUp} className="font-semibold uppercase tracking-[0.28em] mb-3"
                  style={{ fontSize: 'clamp(0.6rem, 0.85vw, 0.7rem)', color: '#2563eb' }}>
                  Cara Mengikuti
                </motion.p>

                <motion.h2 variants={fadeUp} className="font-bold leading-[1.1] m-0 mb-5"
                  style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.25rem)', letterSpacing: '-0.03em', color: '#0a2540' }}>
                  Bagaimana cara mengikuti{' '}
                  <span style={{ color: '#2563eb' }}>Cerita Ciheras?</span>
                </motion.h2>

                <motion.div
                  variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1, transition: { duration: 0.48, ease: EASE } } }}
                  style={{ height: 3, width: 44, background: 'linear-gradient(to right, #93c5fd, rgba(147,197,253,0.2))', borderRadius: 2, transformOrigin: 'left', marginBottom: 24 }}
                />

                <motion.p variants={fadeUp} className="text-slate-500 leading-[1.8] mb-6"
                  style={{ fontSize: 'clamp(0.85rem, 1.05vw, 0.95rem)' }}>
                  Kisah-kisah Ciheras hadir di mana pun kamu berada. Saat ini Cerita Ciheras menjadi sekumpulan kisah yang dirangkai oleh mereka yang pernah ke Ciheras atau kerja praktek di sana — bisa kamu ikuti melalui beberapa platform berikut.
                </motion.p>

                {/* Platform list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {PLATFORMS.map((p, i) => (
                    <motion.a
                      key={i} variants={fadeUp}
                      href={p.href} target="_blank" rel="noopener noreferrer"
                      whileHover={{ x: 4 }} transition={{ duration: 0.22, ease: EASE }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        background: p.bg, border: `1px solid ${p.border}`,
                        borderRadius: 12, padding: '12px 16px', textDecoration: 'none', cursor: 'pointer',
                      }}
                    >
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <p.Icon size={17} color="#fff" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#0a2540', marginBottom: 2 }}>{p.label}</div>
                        <div style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.45 }}>{p.desc}</div>
                      </div>
                      <ExternalLink size={13} color="#94a3b8" />
                    </motion.a>
                  ))}
                </div>

              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ KATA MEREKA (Blog Posts) ══════════════════════════ */}
        <section ref={sec3Ref} className="relative bg-white overflow-hidden">
          <div style={{ height: 3, background: 'linear-gradient(to right, #93c5fd, #2563eb, transparent)' }} />
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>

            <motion.div variants={stagger} initial="hidden" animate={sec3In ? 'show' : 'hidden'}
              style={{ marginBottom: 'clamp(2.5rem, 4vw, 4rem)' }}>
              <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.6rem, 0.8vw, 0.7rem)', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 16 }}>
                Dari Blog
              </motion.p>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
                <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.03em', color: '#0a2540', margin: 0 }}>
                  Kata <span style={{ color: '#2563eb' }}>Mereka</span>
                </motion.h2>
                <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.82rem, 1vw, 0.9rem)', lineHeight: 1.75, color: '#64748b', maxWidth: 380, margin: 0 }}>
                  Apa saja kata mereka yang telah belajar dan berkarya di Ciheras University?
                </motion.p>
              </div>
            </motion.div>

            {/* Loading skeleton */}
            {postsLoading && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ background: '#f1f5f9', borderRadius: 16, height: 300, animation: 'shimmer 1.5s ease-in-out infinite' }} />
                ))}
              </div>
            )}

            {/* Error fallback */}
            {postsError && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={sec3In ? { opacity: 1, y: 0 } : {}}
                style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 16, padding: '32px', textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>📖</div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 18, color: '#0a2540', marginBottom: 8 }}>Baca cerita lengkap di blog kami</h3>
                <p style={{ fontSize: 14, color: '#64748b', marginBottom: 20, lineHeight: 1.7, maxWidth: 440, margin: '0 auto 20px' }}>
                  Temukan kisah-kisah inspiratif dari Ciheras University, proyek energi terbarukan, dan kehidupan nyata di Ciheras, Tasikmalaya.
                </p>
                <a href="https://lenterabumi.com/blog" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2563eb', color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 13, padding: '10px 22px', borderRadius: 999, textDecoration: 'none' }}>
                  Kunjungi Blog <ArrowRight size={14} />
                </a>
              </motion.div>
            )}

            {/* Blog cards */}
            {!postsLoading && !postsError && posts.length > 0 && (
              <motion.div variants={stagger} initial="hidden" animate={sec3In ? 'show' : 'hidden'}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                {posts.map(post => {
                  const img = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
                  return (
                    <motion.a key={post.id} variants={fadeUp}
                      href={post.link} target="_blank" rel="noopener noreferrer"
                      whileHover="hover" initial="rest" animate="rest"
                      style={{ display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', textDecoration: 'none' }}>
                      {img && (
                        <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: '#f1f5f9' }}>
                          <motion.img src={img} alt={stripHtml(post.title.rendered)}
                            variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                            transition={{ duration: 0.55, ease: EASE }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        </div>
                      )}
                      <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, color: '#0a2540', lineHeight: 1.35, margin: 0, textTransform: 'uppercase', letterSpacing: '0.03em' }}
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#64748b', lineHeight: 1.65, margin: 0, flex: 1 }}>
                          {stripHtml(post.excerpt.rendered).substring(0, 120)}…
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 10, borderTop: '1px solid #f1f5f9', fontSize: 11, color: '#94a3b8' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={11} /> admin</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={11} /> {formatDate(post.date)}</span>
                        </div>
                      </div>
                    </motion.a>
                  )
                })}
              </motion.div>
            )}

            {!postsLoading && !postsError && (
              <div style={{ textAlign: 'center', marginTop: 40 }}>
                <a href="https://lenterabumi.com/blog" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 13, color: '#2563eb', border: '1px solid #bfdbfe', background: '#eff6ff', padding: '10px 22px', borderRadius: 999, textDecoration: 'none' }}>
                  Lihat semua artikel <ArrowRight size={13} />
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ══ SUARA DARI CIHERAS ════════════════════════════════ */}
        <section ref={sec4Ref} className="relative bg-white overflow-hidden">
          <div style={{ height: 3, background: 'linear-gradient(to right, #93c5fd, #2563eb, transparent)' }} />
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.35 }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>

            <motion.div variants={stagger} initial="hidden" animate={sec4In ? 'show' : 'hidden'}
              style={{ marginBottom: 'clamp(2.5rem, 4vw, 4rem)' }}>
              <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.6rem, 0.85vw, 0.7rem)', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.28em', marginBottom: 16 }}>
                Testimoni
              </motion.p>
              <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(2rem, 3.8vw, 3.25rem)', letterSpacing: '-0.03em', color: '#0a2540', margin: 0, lineHeight: 1.1 }}>
                Suara dari <span style={{ color: '#2563eb' }}>Ciheras</span>
              </motion.h2>
              <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.82rem, 1vw, 0.9rem)', color: '#64748b', lineHeight: 1.8, marginTop: 14, maxWidth: 440 }}>
                Cerita nyata dari mereka yang pernah belajar dan berkarya di Ciheras University.
              </motion.p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))', gap: 20 }}>
              {TESTIMONIALS.map((t, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" animate={sec4In ? 'show' : 'hidden'}
                  transition={{ delay: i * 0.15 }}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #2563eb',
                    borderRadius: 16, padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                    display: 'flex', flexDirection: 'column', gap: 20,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)',
                  }}>
                  <Quote size={26} color="#93c5fd" opacity={0.7} />
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.9rem, 1.05vw, 1rem)', lineHeight: 1.85, color: '#374151', margin: 0, fontStyle: 'italic', flex: 1 }}>
                    "{t.quote}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.author}
                        style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', border: '2px solid #bfdbfe' }}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    ) : (
                      <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#eff6ff', border: '2px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#2563eb' }}>{t.author[0]}</span>
                      </div>
                    )}
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0a2540' }}>{t.author}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <FooterCTA />
      </main>

      <style>{`
        @keyframes shimmer {
          0%,100% { background-color: #f1f5f9; }
          50%      { background-color: #e2e8f0; }
        }
      `}</style>
    </>
  )
}
