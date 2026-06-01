import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

/* ─────────────────────────────────────────────
   Constants & variants
───────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

const cellV: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.72, ease: EASE } },
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

interface Photo {
  file:    string
  alt:     string
  label:   string
  caption: string
  pos:     string          // object-position
  area:    string          // grid-area name
}

const PHOTOS: Photo[] = [
  {
    file:    'kegiatan/kegiatan_foto_bersama.jpg',
    alt:     'Foto bersama mahasiswa dan tim LBN di depan turbin angin',
    label:   'Komunitas',
    caption: 'Ratusan mahasiswa bersatu di bawah turbin angin Ciheras',
    pos:     'center 30%',
    area:    'hero',
  },
  {
    file:    'kegiatan/kegiatan_instalasi_turbin.jpg',
    alt:     'Teknisi memasang bilah turbin angin',
    label:   'Riset & Teknik',
    caption: 'Proses instalasi turbin di lapangan bersama PLN Nusantara Power',
    pos:     'center 40%',
    area:    'instalasi',
  },
  {
    file:    'kegiatan/kegiatan_vawt_tower.jpg',
    alt:     'Tower VAWT proyek Samarinda',
    label:   'Infrastruktur',
    caption: 'Tower VAWT — proyek energi terbarukan di Samarinda, Kalimantan Timur',
    pos:     'center 20%',
    area:    'vawt',
  },
  {
    file:    'kegiatan/kegiatan_volleyball_pantai.jpg',
    alt:     'Permainan voli di pantai Ciheras saat senja',
    label:   'Kehidupan Lapangan',
    caption: 'Sore di Ciheras — kerja keras bersambung kebersamaan',
    pos:     'center 40%',
    area:    'volley',
  },
  {
    file:    'kegiatan/kegiatan_tim_lapangan.jpg',
    alt:     'Tim LBN dan mahasiswa di site lapangan',
    label:   'Tim',
    caption: 'Transfer knowledge langsung di lapangan bersama mahasiswa',
    pos:     'center 25%',
    area:    'tim',
  },
  {
    file:    'kegiatan/kegiatan_diskusi.jpg',
    alt:     'Sesi diskusi dan rapat tim di gudang',
    label:   'Kolaborasi',
    caption: 'Ruang diskusi terbuka — ide lahir dari percakapan nyata',
    pos:     'center 35%',
    area:    'diskusi',
  },
  {
    file:    'kegiatan/kegiatan_sosial_qurban.jpg',
    alt:     'Program sosial qurban bersama masyarakat',
    label:   'Sosial & Komunitas',
    caption: 'Program sosial menyentuh lebih dari 21.100 KK di pesisir Ciheras',
    pos:     'center 30%',
    area:    'qurban',
  },
]

/* ─────────────────────────────────────────────
   Photo cell
───────────────────────────────────────────── */

function PhotoCell({ photo: p }: { photo: Photo }) {
  return (
    <motion.div
      variants={cellV}
      whileHover="hover"
      initial="rest"
      animate="rest"
      style={{
        gridArea: p.area,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 16,
        cursor: 'pointer',
        boxShadow: '0 2px 12px rgba(10,37,64,0.08)',
      }}
    >
      {/* Photo */}
      <motion.img
        src={`${import.meta.env.BASE_URL}${p.file}`}
        alt={p.alt}
        variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
        transition={{ duration: 0.65, ease: EASE }}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: p.pos,
          display: 'block',
        }}
      />

      {/* Permanent ambient overlay */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(4,18,32,0.78) 0%, rgba(4,18,32,0.15) 45%, transparent 70%)',
      }} />

      {/* Hover: full teal tint */}
      <motion.div
        aria-hidden
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, rgba(12,107,150,0.22) 0%, transparent 55%)',
        }}
      />

      {/* Label badge — top left */}
      <div style={{
        position: 'absolute', top: 14, left: 14,
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: 6,
        padding: '4px 10px',
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: '0.58rem',
          color: 'rgba(255,255,255,0.9)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>
          {p.label}
        </span>
      </div>

      {/* Caption — slides up on hover */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 16px 16px' }}>
        <motion.p
          variants={{ rest: { opacity: 0, y: 8 }, hover: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.72rem, 0.85vw, 0.8rem)',
            lineHeight: 1.55,
            color: 'rgba(255,255,255,0.82)',
            margin: 0,
          }}
        >
          {p.caption}
        </motion.p>
      </div>

      {/* Corner bracket — bottom right (only on hero) */}
      {p.area === 'hero' && (
        <div aria-hidden style={{
          position: 'absolute', bottom: 18, right: 18,
          width: 28, height: 28,
          borderBottom: '2px solid rgba(90,176,214,0.6)',
          borderRight: '2px solid rgba(90,176,214,0.6)',
          borderRadius: '0 0 4px 0',
        }} />
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

export default function GaleriSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })

  return (
    <section
      id="galeri"
      ref={ref}
      style={{
        position: 'relative',
        background: '#ffffff',
        borderTop: '3px solid #5ab0d6',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial — top right */}
      <div aria-hidden style={{
        position: 'absolute', top: -80, right: -60,
        width: 420, height: 420, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(90,176,214,0.055) 0%, transparent 68%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1400, margin: '0 auto',
        padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
      }}>

        {/* ── Header ── */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{
            display: 'flex', flexWrap: 'wrap',
            alignItems: 'flex-end', justifyContent: 'space-between',
            gap: 24, marginBottom: 'clamp(2.5rem, 4vw, 4rem)',
          }}
        >
          <div>
            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 'clamp(0.58rem, 0.78vw, 0.68rem)',
              color: '#5ab0d6',
              textTransform: 'uppercase',
              letterSpacing: '0.32em',
              margin: '0 0 14px 0',
            }}>
              Galeri Lapangan
            </motion.p>

            <motion.h2 variants={fadeUp} style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.06,
              letterSpacing: '-0.04em',
              color: '#0a2540',
              margin: 0,
            }}>
              Dokumentasi{' '}
              <span style={{ color: '#0c6b96' }}>Kegiatan</span>
            </motion.h2>
          </div>

          <motion.p variants={fadeUp} style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.82rem, 1vw, 0.9rem)',
            lineHeight: 1.78,
            color: '#64748b',
            maxWidth: 360, margin: 0,
          }}>
            Setiap foto adalah bukti nyata — dari lapangan, pantai, dan
            ruang belajar di Ciheras.
          </motion.p>
        </motion.div>

        {/* ── Bento grid ── */}
        <motion.div
          variants={containerV}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'clamp(200px, 26vw, 320px) clamp(200px, 26vw, 320px) clamp(180px, 22vw, 280px) clamp(180px, 22vw, 280px)',
            gridTemplateAreas: `
              "hero    hero    instalasi"
              "hero    hero    vawt"
              "volley  volley  tim"
              "diskusi qurban  qurban"
            `,
            gap: 'clamp(0.625rem, 1vw, 0.875rem)',
          }}
          className="galeri-grid"
        >
          {PHOTOS.map((p) => (
            <PhotoCell key={p.area} photo={p} />
          ))}
        </motion.div>

      </div>

      {/* Mobile: single column */}
      <style>{`
        @media (max-width: 700px) {
          .galeri-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: repeat(7, 240px) !important;
            grid-template-areas:
              "hero"
              "foto_bersama"
              "instalasi"
              "vawt"
              "volley"
              "tim"
              "diskusi"
              "qurban" !important;
          }
        }
        @media (min-width: 701px) and (max-width: 1024px) {
          .galeri-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-template-rows: repeat(4, clamp(200px, 30vw, 300px)) !important;
            grid-template-areas:
              "hero    hero"
              "instalasi vawt"
              "volley  tim"
              "diskusi qurban" !important;
          }
        }
      `}</style>
    </section>
  )
}
