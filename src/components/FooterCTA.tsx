import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export default function FooterCTA() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <footer id="hubungi-kami" ref={ref}>

      {/* ── CTA Band — sama dengan style KontribusiSection ── */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(160deg, #041220 0%, #062030 45%, #0a3350 100%)',
        }}
      >
        {/* Grid texture — sama dengan KontribusiSection */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            backgroundImage:
              'linear-gradient(rgba(90,176,214,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(90,176,214,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: 'relative', zIndex: 1,
            maxWidth: 1400,
            margin: '0 auto',
            padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 5vw, 5rem)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          {/* Left — teks */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            style={{ flex: '1 1 320px', maxWidth: 580 }}
          >
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: 'clamp(0.6rem, 0.78vw, 0.7rem)',
                color: '#5ab0d6',
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                marginBottom: 20,
              }}
            >
              Ayo Bergabung
            </motion.p>

            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(1.75rem, 3vw, 3rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: '0 0 20px 0',
              }}
            >
              Mari bersama membangun{' '}
              <span style={{ color: '#5ab0d6' }}>
                ekosistem energi
              </span>{' '}
              yang berdampak.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.45)',
                margin: 0,
              }}
            >
              Kami terbuka untuk kolaborasi riset, kemitraan proyek,
              maupun program pemberdayaan komunitas bersama Lentera Bumi Nusantara.
            </motion.p>
          </motion.div>

          {/* Right — tombol dalam glass card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            style={{ flexShrink: 0 }}
          >
            <motion.a
              href="https://api.whatsapp.com/send/?phone=6281395221474&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: 'clamp(0.875rem, 1vw, 0.975rem)',
                color: '#ffffff',
                background: 'rgba(255,255,255,0.07)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                borderRadius: 9999,
                padding: 'clamp(0.875rem, 1.1vw, 1.05rem) clamp(1.75rem, 2.4vw, 2.5rem)',
                textDecoration: 'none',
                backdropFilter: 'blur(10px)',
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              Mulai Kolaborasi
              <motion.span
                style={{ display: 'inline-flex' }}
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                <HiArrowRight size={16} />
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ── Footer bar ── */}
      <div
        style={{
          background: '#020e1a',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: '1.5rem clamp(1.5rem, 5vw, 5rem)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}logo_lentera.webp`}
            alt="Lentera Bumi Nusantara"
            style={{ height: 44, width: 'auto', objectFit: 'contain', opacity: 0.7 }}
          />

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.7rem, 0.85vw, 0.78rem)',
            color: 'rgba(255,255,255,0.25)',
            margin: 0,
            textAlign: 'center',
          }}>
            © {new Date().getFullYear()} Lentera Bumi Nusantara. Semua hak dilindungi.
          </p>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.7rem, 0.85vw, 0.78rem)',
            color: 'rgba(255,255,255,0.2)',
            margin: 0,
          }}>
            Ciheras · Tasikmalaya
          </p>
        </div>
      </div>

    </footer>
  )
}
