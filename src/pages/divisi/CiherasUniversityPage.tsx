import { useRef, useEffect } from 'react'
import {
  motion, useInView, useMotionValue, useTransform, animate, type Variants,
} from 'framer-motion'
import {
  ArrowRight,
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
    index: '01', value: '1.050+', numericTarget: 1050, suffix: '+',
    label: 'Mahasiswa KP',
    sublabel: 'Mahasiswa kerja praktik dari berbagai perguruan tinggi yang telah belajar dan berkarya langsung di Ciheras.',
  },
  {
    index: '02', value: '2.000+', numericTarget: 2000, suffix: '+',
    label: 'Mahasiswa Berkunjung',
    sublabel: 'Mahasiswa yang telah mengunjungi dan melakukan studi lapangan di site riset Ciheras.',
  },
  {
    index: '03', value: '101', numericTarget: 101, suffix: '',
    label: 'Perguruan Tinggi',
    sublabel: 'Jumlah institusi pendidikan tinggi dari seluruh Indonesia yang telah bermitra dan mengirimkan mahasiswanya.',
  },
  {
    index: '04', value: '45', numericTarget: 45, suffix: '',
    label: 'Kota Asal',
    sublabel: 'Kota dari berbagai penjuru Indonesia yang mahasiswanya telah menginjakkan kaki di Ciheras.',
  },
]

const TOPIK_RISET = [
  {
    index: '01',
    title: 'Bilah',
    subtitle: 'Blade Design',
    skills: ['Desain Aerodinamika', 'Pemilihan Material', 'Uji Kekuatan'],
    desc: 'Mempelajari desain aerodinamika bilah untuk menghasilkan efisiensi optimal dari angin berkecepatan rendah hingga menengah. Mahasiswa menentukan material yang tepat serta melakukan uji kekuatan untuk memastikan ketahanan dan performa di lapangan.',
    image: `${import.meta.env.BASE_URL}topik/topik_bilah.webp`,
    placeholder: 'linear-gradient(135deg, #041828 0%, #0a4060 100%)',
  },
  {
    index: '02',
    title: 'Generator',
    subtitle: 'Electromagnetic Design',
    skills: ['Prinsip Elektromagnetik', 'Desain Stator-Rotor', 'Pengujian Performa'],
    desc: 'Mempelajari prinsip elektromagnetik dalam konversi energi mekanik menjadi listrik. Mahasiswa merancang, membuat, dan menguji generator sesuai kebutuhan sistem turbin skala mikro secara langsung di workshop Ciheras.',
    image: `${import.meta.env.BASE_URL}topik/topik_generator.webp`,
    placeholder: 'linear-gradient(135deg, #0a1828 0%, #0e3d5c 100%)',
  },
  {
    index: '03',
    title: 'Controller',
    subtitle: 'Control System',
    skills: ['Sistem Kontrol Turbin', 'Elektronika Daya', 'Pemrograman'],
    desc: 'Mengembangkan sistem kontrol turbin untuk mengatur performa dan keamanan operasional. Termasuk pembelajaran elektronika daya serta pemrograman mikrokontroler untuk mengoptimalkan kinerja sistem secara keseluruhan.',
    image: `${import.meta.env.BASE_URL}topik/topik_controller.webp`,
    placeholder: 'linear-gradient(135deg, #0e1a30 0%, #1a3d6a 100%)',
  },
  {
    index: '04',
    title: 'Data Logger',
    subtitle: 'Monitoring System',
    skills: ['Sensor & Akuisisi Data', 'Monitoring Real-time', 'Analisis Performa'],
    desc: 'Mempelajari penggunaan sensor dan sistem akuisisi data untuk memantau performa turbin secara real-time. Data yang dikumpulkan digunakan untuk analisis, evaluasi, dan pengembangan sistem yang lebih efisien.',
    image: `${import.meta.env.BASE_URL}topik/topik_datalogger.webp`,
    placeholder: 'linear-gradient(135deg, #0a1624 0%, #0a3d5c 100%)',
  },
]

const ALUR_PHASES = [
  {
    fase: '01',
    label: 'Persiapan',
    accent: '#5ab0d6',
    steps: [
      { no: 1, title: 'Daftar', desc: 'Kirim surat permohonan kegiatan ke tim LBN.' },
      { no: 2, title: 'Konfirmasi', desc: 'Terima balasan resmi dan link pendaftaran.' },
      { no: 3, title: 'Isi Form', desc: 'Lengkapi data diri melalui formulir yang tersedia.' },
    ],
  },
  {
    fase: '02',
    label: 'Orientasi',
    accent: '#10b981',
    steps: [
      { no: 4, title: 'Datang', desc: 'Tiba di Ciheras dan ikuti sesi pengenalan awal.' },
      { no: 5, title: 'Bentuk Tim', desc: 'Susun tim belajarmu, maksimal 5 orang per kelompok.' },
      { no: 6, title: 'Modul', desc: 'Terima modul sesuai topik yang kamu pilih.' },
    ],
  },
  {
    fase: '03',
    label: 'Pelaksanaan',
    accent: '#f59e0b',
    steps: [
      { no: 7,  title: 'Progress',    desc: 'Belajar, bertanya, dan berdiskusi dengan siapa pun untuk siap naik level.' },
      { no: 8,  title: 'Presentasi',  desc: 'Rayakan capaianmu dan lakukan transfer knowledge ke rekan lain.' },
      { no: 9,  title: 'Final',       desc: 'Laksanakan presentasi akhir sebagai penutup perjalananmu.' },
      { no: 10, title: 'Bagikan',     desc: 'Ceritakan pengalamanmu selama berada di Ciheras University!' },
    ],
  },
]

const JALUR_BELAJAR = [
  {
    index: '01',
    title: 'Kerja Praktek',
    subtitle: 'KP / Magang',
    duration: '1–3 Bulan',
    forLevel: 'D3 / S1',
    tagline: 'Belajar dari pekerjaan nyata, bukan simulasi.',
    desc: 'Program KP memberi kesempatan bekerja langsung di workshop fabrikasi, site pemasangan turbin, dan tim riset Lentera Bumi Nusantara. Kamu terlibat dalam proyek aktif — bukan sekadar mengamati.',
    includes: [
      'Penempatan di tim teknis aktif',
      'Akses penuh ke workshop & site lapangan',
      'Surat referensi resmi dari LBN',
      'Mentorship 1-on-1 dengan insinyur senior',
    ],
    accent: '#0c6b96',
    accentBg: '#eff8fd',
  },
  {
    index: '02',
    title: 'Studi Mandiri',
    subtitle: 'Independent Study',
    duration: 'Fleksibel',
    forLevel: 'Semua Jenjang',
    tagline: 'Datang dengan pertanyaan. Pulang dengan jawaban.',
    desc: 'Cocok untuk peneliti atau mahasiswa yang ingin mengeksplorasi topik spesifik secara mendalam dengan jadwal yang disesuaikan kebutuhan dan bimbingan langsung dari tim Ciheras.',
    includes: [
      'Akses penuh data & instrumen riset',
      'Jadwal fleksibel & self-directed',
      'Dokumentasi teknis internal LBN',
      'Sharing session rutin dengan tim riset',
    ],
    accent: '#0e8a6e',
    accentBg: '#f0fdf4',
  },
  {
    index: '03',
    title: 'Tugas Akhir',
    subtitle: 'TA / Skripsi / Tesis',
    duration: '3–6 Bulan',
    forLevel: 'S1 / S2 / S3',
    tagline: 'Riset bermakna, di tempat yang benar-benar nyata.',
    desc: 'Topik penelitianmu berdampak langsung pada pengembangan teknologi energi terbarukan Indonesia. Infrastruktur riset lengkap, opsi co-supervisor dari LBN, dan data lapangan sungguhan.',
    includes: [
      'Infrastruktur riset & alat ukur lengkap',
      'Opsi co-supervisor dari praktisi LBN',
      'Data lapangan turbin real-time',
      'Hasil riset berpotensi dipublikasikan',
    ],
    accent: '#7c3aed',
    accentBg: '#f5f3ff',
  },
]


const ACTIVITIES = [
  {
    no: '01', label: 'Diskusi & Riset Bersama', category: 'Riset',
    image: `${import.meta.env.BASE_URL}kegiatan/kegiatan_diskusi.webp`,
    placeholder: 'linear-gradient(135deg, #0c1e30 0%, #0a3d5c 100%)',
    featured: true,
  },
  {
    no: '02', label: 'Sesi Lapangan Mahasiswa', category: 'Lapangan',
    image: `${import.meta.env.BASE_URL}kegiatan/kegiatan_tim_lapangan.webp`,
    placeholder: 'linear-gradient(135deg, #0e1a2e 0%, #1a3052 100%)',
    featured: false,
  },
  {
    no: '03', label: 'Foto Bersama Peserta', category: 'Komunitas',
    image: `${import.meta.env.BASE_URL}kegiatan/kegiatan_foto_bersama.webp`,
    placeholder: 'linear-gradient(135deg, #0c1e30 0%, #1a2e4a 100%)',
    featured: false,
  },
  {
    no: '04', label: 'Kegiatan Sosial & Pengabdian', category: 'Sosial',
    image: `${import.meta.env.BASE_URL}kegiatan/kegiatan_sosial_qurban.webp`,
    placeholder: 'linear-gradient(135deg, #1a1e2e 0%, #2e3a5c 100%)',
    featured: false,
  },
  {
    no: '05', label: 'Kebersamaan & Refreshment', category: 'Tim',
    image: `${import.meta.env.BASE_URL}kegiatan/kegiatan_volleyball_pantai.webp`,
    placeholder: 'linear-gradient(135deg, #0e1e30 0%, #1a3048 100%)',
    featured: false,
  },
]

/* ─── Page ─── */

export default function CiherasUniversityPage() {
  const tekRef   = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const tekInView   = useInView(tekRef,   { once: true, amount: 0.15 })
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 })

  return (
    <>
      <Navbar />
      <main>

        {/* ══ Hero ══ */}
        <section style={{ position: 'relative', height: '100svh', overflow: 'hidden' }}>
          <div
            aria-hidden
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundImage: `url(${import.meta.env.BASE_URL}divisi_university.webp)`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}
          />
          <div aria-hidden style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to top, rgba(3,8,20,0.97) 0%, rgba(4,10,26,0.85) 25%, rgba(5,14,32,0.52) 50%, rgba(6,18,38,0.2) 70%, transparent 88%)',
          }} />
          <div aria-hidden style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to right, rgba(3,8,20,0.72) 0%, rgba(3,8,20,0.38) 38%, transparent 65%)',
          }} />

          <div style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            paddingTop: 80,
          }}>
            <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto', padding: '0 clamp(1.75rem, 5vw, 5rem)' }}>
              <motion.div variants={stagger} initial="hidden" animate="show">

                {/* Eyebrow */}
                <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                    background: '#93c5fd', boxShadow: '0 0 8px rgba(147,197,253,0.85)',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 500,
                    fontSize: 'clamp(0.6rem, 0.75vw, 0.7rem)',
                    color: 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase', letterSpacing: '0.28em',
                  }}>
                    Divisi 03 · Pendidikan & Riset · Lentera Bumi Nusantara
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
                    Ciheras
                  </motion.h1>
                </div>
                <div style={{ overflow: 'hidden', marginBottom: 36 }}>
                  <motion.h1 variants={fadeUp} style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 700,
                    fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
                    lineHeight: 1.07, letterSpacing: '-0.03em',
                    color: '#93c5fd', margin: 0,
                  }}>
                    University
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
                  Platform pembelajaran terbuka untuk mencetak generasi inovator energi
                  masa depan — langsung dari lapangan, berbasis pengalaman nyata di{' '}
                  <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                    ekosistem Lentera Bumi Nusantara
                  </span>.
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
                      color: '#0c1e30', background: '#93c5fd', borderRadius: 999,
                      padding: 'clamp(0.6rem, 1vw, 0.75rem) clamp(1.5rem, 2vw, 2rem)',
                      letterSpacing: '0.02em', textDecoration: 'none',
                    }}
                  >
                    Lihat Program <ArrowRight size={15} />
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
        <section ref={statsRef} className="relative bg-white overflow-hidden" style={{ borderTop: '3px solid #2563eb' }}>
          <div className="relative z-10 mx-auto" style={{ maxWidth: 1400, padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>

            <motion.div
              variants={stagger} initial="hidden" animate={statsInView ? 'show' : 'hidden'}
              className="mb-14 lg:mb-18 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
            >
              <div>
                <motion.p variants={fadeUp} className="font-semibold uppercase tracking-[0.28em] mb-3"
                  style={{ fontSize: 'clamp(0.6rem, 0.85vw, 0.7rem)', color: '#2563eb' }}>
                  Dalam Angka
                </motion.p>
                <motion.h2 variants={fadeUp} className="font-bold leading-[1.1] m-0"
                  style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.25rem)', letterSpacing: '-0.03em', color: '#0a2540' }}>
                  Bukan sekadar rencana —<br />
                  <span style={{ color: '#2563eb' }}>ini jejaknya.</span>
                </motion.h2>
              </div>
              <motion.p variants={fadeUp} className="text-slate-500 leading-[1.75] lg:max-w-[380px]"
                style={{ fontSize: 'clamp(0.82rem, 1.05vw, 0.9rem)' }}>
                Setiap angka mencerminkan komitmen kami dalam mencetak inovator — dari
                ruang diskusi, workshop lapangan, hingga panggung demo day startup.
              </motion.p>
            </motion.div>

            <motion.div
              variants={stagger} initial="hidden" animate={statsInView ? 'show' : 'hidden'}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-100"
            >
              {STATS.map((s) => (
                <UniStatCard key={s.index} stat={s} inView={statsInView} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══ Topik Riset ══ */}
        <section
          id="teknologi"
          ref={tekRef}
          style={{ position: 'relative', background: 'linear-gradient(180deg, #041220 0%, #062030 100%)', overflow: 'hidden' }}
        >
          {/* Dot grid texture */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(90,176,214,0.07) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }} />
          {/* Radial glow top-right */}
          <div aria-hidden style={{
            position: 'absolute', top: '-10%', right: '-5%', width: '45%', height: '60%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>

            {/* ── Section header ── */}
            <motion.div
              variants={stagger} initial="hidden" animate={tekInView ? 'show' : 'hidden'}
              style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}
            >
              <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <motion.div
                  variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.45, ease: EASE } } }}
                  style={{ height: 1, width: 32, background: 'linear-gradient(to left, #5ab0d6, transparent)', transformOrigin: 'right', flexShrink: 0 }}
                />
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'clamp(0.58rem, 0.75vw, 0.66rem)', color: '#5ab0d6', textTransform: 'uppercase', letterSpacing: '0.34em', whiteSpace: 'nowrap' }}>
                  Topik Riset
                </span>
                <motion.div
                  variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.45, ease: EASE } } }}
                  style={{ height: 1, flex: 1, background: 'linear-gradient(to right, #5ab0d6, transparent)', transformOrigin: 'left' }}
                />
              </motion.div>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
                <motion.h2 variants={fadeUp} style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 700,
                  fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', lineHeight: 1.08,
                  letterSpacing: '-0.035em', color: '#ffffff', margin: 0,
                }}>
                  4 Topik{' '}
                  <span style={{ color: '#5ab0d6' }}>Studi</span>
                </motion.h2>
                <motion.p variants={fadeUp} style={{
                  fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.82rem, 1vw, 0.9rem)',
                  lineHeight: 1.76, color: 'rgba(255,255,255,0.48)', maxWidth: 420, margin: 0,
                }}>
                  Mahasiswa terlibat langsung dalam perancangan, pembuatan, dan pengujian sistem turbin angin skala mikro.
                </motion.p>
              </div>
            </motion.div>

            {/* ── Alternating rows ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.2vw, 1rem)' }}>
              {TOPIK_RISET.map((topik, i) => (
                <TopikRow key={topik.index} topik={topik} flip={i % 2 !== 0} inView={tekInView} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ Jalur Belajar ══ */}
        <JalurBelajarSection />

        {/* ══ Alur Belajar ══ */}
        <AlurBelajarSection />

        {/* ══ Aktivitas Tim ══ */}
        <UniActivitySection />

        <FooterCTA />
      </main>
    </>
  )
}

/* ─────────────────────────────────────────────
   UniStatCard + CountUp
───────────────────────────────────────────── */

interface StatItem {
  index: string
  value: string
  numericTarget?: number
  suffix?: string
  label: string
  sublabel: string
}

function UniStatCard({ stat: s, inView }: { stat: StatItem; inView: boolean }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex flex-col gap-5 cursor-default bg-white hover:bg-[#eff6ff] transition-colors duration-300"
      style={{ padding: 'clamp(2rem, 3vw, 3rem) clamp(1.5rem, 2.5vw, 2.5rem)' }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-[3px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"
        style={{ background: '#93c5fd', transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }} />
      <span className="font-semibold" style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)', color: '#2563eb', letterSpacing: '0.18em' }}>
        {s.index}
      </span>
      <div className="font-bold text-[#0a2540] leading-none" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', letterSpacing: '-0.04em' }}>
        {s.numericTarget !== undefined
          ? <UniCountUp target={s.numericTarget} suffix={s.suffix ?? ''} inView={inView} />
          : s.value
        }
      </div>
      <motion.div
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.55, ease: EASE } } }}
        className="origin-left h-px w-full"
        style={{ background: 'linear-gradient(to right, #93c5fd 0%, #e2e8f0 60%)' }}
      />
      <div>
        <p className="font-semibold text-[#0a2540] mb-2" style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', letterSpacing: '-0.01em' }}>{s.label}</p>
        <p className="text-slate-400 leading-[1.7]" style={{ fontSize: 'clamp(0.75rem, 0.9vw, 0.825rem)' }}>{s.sublabel}</p>
      </div>
    </motion.div>
  )
}

function UniCountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
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
   Alur Belajar Section
───────────────────────────────────────────── */

function AlurBelajarSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.04 })

  return (
    <section
      ref={ref}
      style={{
        position:   'relative',
        background: '#ffffff',
        overflow:   'hidden',
      }}
    >
      {/* Top accent */}
      <div style={{ height: 3, background: 'linear-gradient(to right, #5ab0d6, #0c6b96, transparent)' }} />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>

        {/* ── Header — two col ── */}
        <motion.div
          variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 4vw, 5rem)', alignItems: 'end', marginBottom: 'clamp(4rem, 6vw, 6rem)' }}
        >
          <div>
            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-sans)', fontWeight: 600,
              fontSize: 'clamp(0.6rem, 0.8vw, 0.7rem)', color: '#0c6b96',
              textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 14,
            }}>
              Langkah demi Langkah
            </motion.p>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700,
              fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', lineHeight: 1.08,
              letterSpacing: '-0.035em', color: '#0a2540', margin: 0,
            }}>
              Alur Belajar di{' '}
              <span style={{ color: '#0c6b96' }}>Ciheras University</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.85rem, 1.05vw, 0.95rem)',
            lineHeight: 1.82, color: '#64748b', margin: 0, alignSelf: 'end',
          }}>
            10 langkah terstruktur dalam tiga fase — dari permohonan pertama hingga kamu membagikan ceritamu ke dunia.
          </motion.p>
        </motion.div>

        {/* ── Phases ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(2rem, 3vw, 3.5rem)', alignItems: 'start' }}>
          {ALUR_PHASES.map((phase, pi) => (
            <AlurPhaseColumn key={phase.fase} phase={phase} inView={inView} delay={pi * 0.16} />
          ))}
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Alur Phase Column
───────────────────────────────────────────── */

interface AlurPhase {
  fase:   string
  label:  string
  accent: string
  steps:  { no: number; title: string; desc: string }[]
}

function AlurPhaseColumn({ phase, inView, delay }: { phase: AlurPhase; inView: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.72, ease: EASE, delay }}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {/* ── Phase label row ── */}
      <div style={{
        display:       'flex',
        alignItems:    'center',
        gap:           12,
        marginBottom:  'clamp(1.5rem, 2.5vw, 2.5rem)',
        paddingBottom: 'clamp(1rem, 1.8vw, 1.5rem)',
        borderBottom:  `2px solid ${phase.accent}`,
      }}>
        {/* Phase number */}
        <span style={{
          fontFamily:    'var(--font-sans)', fontWeight: 900,
          fontSize:      'clamp(2rem, 3.5vw, 3rem)',
          letterSpacing: '-0.05em', lineHeight: 1,
          color:         phase.accent,
        }}>
          {phase.fase}
        </span>
        <div>
          <p style={{
            fontFamily:    'var(--font-sans)', fontWeight: 600,
            fontSize:      'clamp(0.56rem, 0.7vw, 0.62rem)', color: '#94a3b8',
            textTransform: 'uppercase', letterSpacing: '0.24em', margin: '0 0 2px 0',
          }}>
            Fase
          </p>
          <h3 style={{
            fontFamily:    'var(--font-sans)', fontWeight: 700,
            fontSize:      'clamp(1rem, 1.4vw, 1.2rem)', letterSpacing: '-0.025em',
            color:         '#0a2540', margin: 0, lineHeight: 1.1,
          }}>
            {phase.label}
          </h3>
        </div>
      </div>

      {/* ── Steps ── */}
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Vertical track line */}
        <div style={{
          position:   'absolute',
          left:       15,
          top:        8,
          bottom:     8,
          width:      1,
          background: `linear-gradient(to bottom, ${phase.accent}50, ${phase.accent}10)`,
        }} />

        {phase.steps.map((step, si) => {
          const isLast = si === phase.steps.length - 1
          return (
            <motion.div
              key={step.no}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.6, ease: EASE, delay: delay + si * 0.09 }}
              whileHover={{ x: 4 }}
              style={{
                display:       'flex',
                gap:           'clamp(0.875rem, 1.4vw, 1.25rem)',
                paddingBottom: isLast ? 0 : 'clamp(1.25rem, 2vw, 1.75rem)',
                cursor:        'default',
              }}
            >
              {/* Node */}
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                <div style={{
                  width:       32,
                  height:      32,
                  borderRadius:'50%',
                  background:  '#ffffff',
                  border:      `2px solid ${phase.accent}`,
                  display:     'flex',
                  alignItems:  'center',
                  justifyContent: 'center',
                  boxShadow:   `0 0 0 4px ${phase.accent}12`,
                }}>
                  <span style={{
                    fontFamily:    'var(--font-sans)', fontWeight: 800,
                    fontSize:      '0.64rem', color: phase.accent,
                    letterSpacing: '-0.01em',
                  }}>
                    {step.no}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ paddingTop: 4, flex: 1 }}>
                <p style={{
                  fontFamily:    'var(--font-sans)', fontWeight: 700,
                  fontSize:      'clamp(0.9rem, 1.1vw, 1rem)',
                  color:         '#0a2540', margin: '0 0 5px 0',
                  letterSpacing: '-0.01em', lineHeight: 1.2,
                }}>
                  {step.title}
                </p>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize:   'clamp(0.78rem, 0.9vw, 0.84rem)',
                  lineHeight: 1.65, color: '#64748b', margin: 0,
                }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Jalur Belajar Section
───────────────────────────────────────────── */

function JalurBelajarSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })

  return (
    <section ref={ref} style={{ background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      {/* Top accent line */}
      <div style={{ height: 3, background: 'linear-gradient(to right, #5ab0d6, #0c6b96, transparent)' }} />

      {/* Subtle dot grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
        backgroundSize: '30px 30px', opacity: 0.45,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)' }}>

        {/* ── Header ── */}
        <motion.div
          variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
          style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}
        >
          <motion.p variants={fadeUp} style={{
            fontFamily: 'var(--font-sans)', fontWeight: 600,
            fontSize: 'clamp(0.6rem, 0.8vw, 0.7rem)', color: '#0c6b96',
            textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 14,
          }}>
            Jalur Belajar
          </motion.p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700,
              fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', lineHeight: 1.08,
              letterSpacing: '-0.035em', color: '#0a2540', margin: 0,
            }}>
              Pilih Jalur{' '}
              <span style={{ color: '#0c6b96' }}>Belajarmu</span>
            </motion.h2>

            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.82rem, 1vw, 0.9rem)',
              lineHeight: 1.76, color: '#64748b', maxWidth: 380, margin: 0,
            }}>
              Tiga jalur untuk mahasiswa dan peneliti dengan tujuan yang berbeda — semua berbasis pengalaman nyata di Ciheras.
            </motion.p>
          </div>
        </motion.div>

        {/* ── Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(1.25rem, 2vw, 2rem)' }}>
          {JALUR_BELAJAR.map((jalur, i) => (
            <JalurCard key={jalur.index} jalur={jalur} inView={inView} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Jalur Card
───────────────────────────────────────────── */

interface JalurData {
  index:    string
  title:    string
  subtitle: string
  duration: string
  forLevel: string
  tagline:  string
  desc:     string
  includes: string[]
  accent:   string
  accentBg: string
}

function JalurCard({ jalur, inView, delay }: { jalur: JalurData; inView: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.72, ease: EASE, delay }}
      whileHover={{ y: -6, boxShadow: `0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)` }}
      style={{
        background:   '#ffffff',
        borderRadius: 18,
        border:       '1px solid #e8edf4',
        overflow:     'hidden',
        position:     'relative',
        boxShadow:    '0 2px 8px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)',
        display:      'flex',
        flexDirection:'column',
        cursor:       'default',
        transition:   'box-shadow 0.28s',
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: 5, background: jalur.accent, flexShrink: 0 }} />

      {/* Ghost index watermark */}
      <div aria-hidden style={{
        position:      'absolute', right: 12, top: 4,
        fontFamily:    'var(--font-sans)', fontWeight: 900,
        fontSize:      'clamp(5rem, 9vw, 8rem)',
        color:         jalur.accent,
        opacity:       0.055,
        lineHeight:    1, letterSpacing: '-0.06em',
        userSelect:    'none', pointerEvents: 'none',
      }}>
        {jalur.index}
      </div>

      {/* Card content */}
      <div style={{ padding: 'clamp(1.75rem, 2.5vw, 2.5rem)', display: 'flex', flexDirection: 'column', gap: 20, flex: 1, position: 'relative' }}>

        {/* Index + badges row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
          <span style={{
            fontFamily:    'var(--font-sans)', fontWeight: 700,
            fontSize:      '0.64rem', color: jalur.accent,
            background:    jalur.accentBg, borderRadius: 4,
            padding:       '3px 9px', letterSpacing: '0.1em',
          }}>
            {jalur.index}
          </span>
          <span style={{
            fontFamily:    'var(--font-sans)', fontWeight: 500,
            fontSize:      '0.64rem', color: '#64748b',
            background:    '#f1f5f9', borderRadius: 4,
            padding:       '3px 9px', letterSpacing: '0.04em',
          }}>
            {jalur.forLevel}
          </span>
          <span style={{ flex: 1 }} />
          <span style={{
            fontFamily:    'var(--font-sans)', fontWeight: 600,
            fontSize:      '0.62rem', color: '#94a3b8',
            letterSpacing: '0.06em',
          }}>
            {jalur.duration}
          </span>
        </div>

        {/* Title + subtitle */}
        <div>
          <h3 style={{
            fontFamily:    'var(--font-sans)', fontWeight: 700,
            fontSize:      'clamp(1.5rem, 2.4vw, 2rem)',
            lineHeight:    1.1, letterSpacing: '-0.03em',
            color:         '#0a2540', margin: '0 0 4px 0',
          }}>
            {jalur.title}
          </h3>
          <p style={{
            fontFamily:    'var(--font-sans)', fontWeight: 500,
            fontSize:      'clamp(0.7rem, 0.85vw, 0.78rem)',
            color:         jalur.accent, textTransform: 'uppercase',
            letterSpacing: '0.14em', margin: 0,
          }}>
            {jalur.subtitle}
          </p>
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily:  'var(--font-sans)', fontStyle: 'italic',
          fontSize:    'clamp(0.88rem, 1.05vw, 0.96rem)',
          lineHeight:  1.55, color: '#475569', margin: 0,
          borderLeft:  `3px solid ${jalur.accent}`,
          paddingLeft: 14,
        }}>
          {jalur.tagline}
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: `linear-gradient(to right, ${jalur.accent}30, transparent)` }} />

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.8rem, 0.92vw, 0.875rem)',
          lineHeight: 1.78, color: '#64748b', margin: 0,
        }}>
          {jalur.desc}
        </p>

        {/* Includes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, justifyContent: 'flex-end' }}>
          <p style={{
            fontFamily:    'var(--font-sans)', fontWeight: 600,
            fontSize:      'clamp(0.66rem, 0.8vw, 0.72rem)',
            color:         '#0a2540', textTransform: 'uppercase',
            letterSpacing: '0.14em', margin: 0,
          }}>
            Yang didapat
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {jalur.includes.map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                {/* Check dot */}
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  background: jalur.accentBg,
                  border: `1.5px solid ${jalur.accent}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 1,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: jalur.accent }} />
                </div>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.78rem, 0.9vw, 0.84rem)',
                  lineHeight: 1.5, color: '#475569',
                }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Topik Row
───────────────────────────────────────────── */

interface TopikData {
  index:       string
  title:       string
  subtitle:    string
  skills:      string[]
  desc:        string
  image:       string
  placeholder: string
}

function TopikRow({
  topik,
  flip,
  inView,
  delay,
}: {
  topik: TopikData
  flip: boolean
  inView: boolean
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      style={{
        display:       'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        minHeight:     'clamp(240px, 28vw, 340px)',
        borderRadius:  14,
        overflow:      'hidden',
        direction:     flip ? 'rtl' : 'ltr',
        border:        '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* ── Image panel ── */}
      <motion.div
        whileHover="hover"
        initial="rest"
        animate="rest"
        style={{ position: 'relative', minHeight: 200, direction: 'ltr', overflow: 'hidden' }}
      >
        {/* Gradient base */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: topik.placeholder }} />

        {/* Photo */}
        <motion.img
          src={topik.image}
          alt={topik.title}
          variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
          transition={{ duration: 0.65, ease: EASE }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.currentTarget.style.opacity = '0' }}
        />

        {/* Overlay */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,18,40,0.75) 0%, rgba(4,18,40,0.2) 60%, transparent 100%)' }} />
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: flip ? 'linear-gradient(to left, rgba(4,18,40,0.6) 0%, transparent 60%)' : 'linear-gradient(to right, rgba(4,18,40,0.6) 0%, transparent 60%)' }} />

        {/* Ghost index watermark */}
        <div aria-hidden style={{
          position:      'absolute', bottom: -16, right: 12,
          fontFamily:    'var(--font-sans)', fontWeight: 900,
          fontSize:      'clamp(5rem, 10vw, 9rem)',
          color:         'rgba(255,255,255,0.05)',
          lineHeight:    1, letterSpacing: '-0.06em',
          userSelect:    'none', pointerEvents: 'none',
        }}>
          {topik.index}
        </div>

        {/* Hover blue tint */}
        <motion.div
          aria-hidden
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.3 }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(37,99,235,0.15) 0%, transparent 60%)' }}
        />
      </motion.div>

      {/* ── Content panel ── */}
      <div style={{
        direction:       'ltr',
        background:      'rgba(255,255,255,0.03)',
        backdropFilter:  'blur(2px)',
        padding:         'clamp(1.75rem, 3vw, 3rem)',
        display:         'flex',
        flexDirection:   'column',
        justifyContent:  'center',
        gap:             20,
        borderLeft:      flip ? 'none' : '1px solid rgba(255,255,255,0.05)',
        borderRight:     flip ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}>
        {/* Index + subtitle row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontFamily:    'var(--font-sans)', fontWeight: 700,
            fontSize:      'clamp(0.62rem, 0.8vw, 0.7rem)',
            color:         '#5ab0d6',
            background:    'rgba(90,176,214,0.12)',
            borderRadius:  4, padding: '3px 9px',
            letterSpacing: '0.1em',
          }}>
            {topik.index}
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(90,176,214,0.18)' }} />
          <span style={{
            fontFamily:    'var(--font-sans)', fontWeight: 500,
            fontSize:      'clamp(0.58rem, 0.72vw, 0.65rem)',
            color:         'rgba(255,255,255,0.35)',
            textTransform: 'uppercase', letterSpacing: '0.18em', whiteSpace: 'nowrap',
          }}>
            {topik.subtitle}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily:    'var(--font-sans)', fontWeight: 700,
          fontSize:      'clamp(1.6rem, 2.8vw, 2.4rem)',
          lineHeight:    1.05, letterSpacing: '-0.035em',
          color:         '#ffffff', margin: 0,
        }}>
          {topik.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize:   'clamp(0.82rem, 0.96vw, 0.9rem)',
          lineHeight: 1.78, color: 'rgba(255,255,255,0.52)', margin: 0,
        }}>
          {topik.desc}
        </p>

        {/* Skill tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {topik.skills.map((s) => (
            <span key={s} style={{
              fontFamily:    'var(--font-sans)', fontWeight: 500,
              fontSize:      '0.64rem', color: '#5ab0d6',
              background:    'rgba(90,176,214,0.1)',
              border:        '1px solid rgba(90,176,214,0.2)',
              borderRadius:  4, padding: '3px 9px',
              letterSpacing: '0.04em',
            }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Activity Section
───────────────────────────────────────────── */

function UniActivitySection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })

  const headerV: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } } }
  const gridV:   Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1,  delayChildren: 0.15 } } }

  return (
    <section ref={ref} style={{ background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ height: 3, background: 'linear-gradient(to right, #93c5fd, #2563eb, transparent)' }} />
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
            fontSize: 'clamp(0.6rem, 0.8vw, 0.7rem)', color: '#2563eb',
            textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 16,
          }}>
            Kampus & Komunitas
          </motion.p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700,
              fontSize: 'clamp(2rem, 3.8vw, 3.5rem)',
              lineHeight: 1.1, letterSpacing: '-0.03em', color: '#0a2540', margin: 0,
            }}>
              Di Balik{' '}
              <span style={{ color: '#2563eb' }}>Karya Kami</span>
            </motion.h2>
            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.82rem, 1vw, 0.9rem)',
              lineHeight: 1.75, color: '#64748b', maxWidth: 380, margin: 0,
            }}>
              Pembelajaran terbaik terjadi ketika teori bertemu praktik langsung —
              inilah keseharian tim dan peserta Ciheras University.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          variants={gridV} initial="hidden" animate={inView ? 'show' : 'hidden'}
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
                <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,8,20,0.82) 0%, rgba(3,8,20,0.35) 45%, rgba(3,8,20,0.08) 100%)' }} />
                <motion.div aria-hidden
                  variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                  transition={{ duration: 0.3 }}
                  style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(37,99,235,0.18) 0%, transparent 55%)' }}
                />

                <span style={{ position: 'absolute', top: 14, left: 16, fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(0.6rem, 0.75vw, 0.68rem)', color: '#93c5fd', letterSpacing: '0.22em' }}>
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
                    style={{ height: 2, width: 36, background: '#93c5fd', borderRadius: 1, transformOrigin: 'left', marginBottom: 8 }}
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
      </div>
    </section>
  )
}
