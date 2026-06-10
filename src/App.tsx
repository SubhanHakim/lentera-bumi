import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TentangSection from './components/TentangSection'
import TopikKuasaiSection from './components/TopikKuasaiSection'
import DivisiSection from './components/DivisiSection'
import SkyDancerSection from './components/SkyDancerSection'
import KontribusiSection from './components/KontribusiSection'
import ProyekSection from './components/ProyekSection'
import SiteCiherasSection from './components/SiteCiherasSection'
import PanganPemberdayaanSection from './components/PanganPemberdayaanSection'
import FooterCTA from './components/FooterCTA'
import AboutPage from './pages/AboutPage'
import ProyekPage from './pages/ProyekPage'
import LenteraEnergiPage from './pages/divisi/LenteraEnergiPage'
import LenteraAgriPage from './pages/divisi/LenteraAgriPage'
import CiherasUniversityPage from './pages/divisi/CiherasUniversityPage'
import PotensiAnginPage from './pages/PotensiAnginPage'
import CeritaCiherasPage from './pages/CeritaCiherasPage'
import { useSmoothScroll, lenisInstance } from './hooks/useSmoothScroll'
import './App.css'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Scroll immediately
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true })
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    // Schedule scroll resetting on subsequent frames to avoid browser layout shifts restoring scroll
    const handleScroll = () => {
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true })
      }
      window.scrollTo(0, 0)
    }

    const rafId = requestAnimationFrame(handleScroll)
    const timeoutId = setTimeout(handleScroll, 40)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timeoutId)
    }
  }, [pathname])
  return null
}

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TentangSection />
        <TopikKuasaiSection />
        <DivisiSection />
        <SkyDancerSection />
        <KontribusiSection />
        <ProyekSection />
        <SiteCiherasSection />
        <PanganPemberdayaanSection />
        <FooterCTA />
      </main>
    </>
  )
}

export default function App() {
  useSmoothScroll()

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/proyek" element={<ProyekPage />} />
        <Route path="/divisi/lentera-energi"         element={<LenteraEnergiPage />} />
        <Route path="/divisi/lentera-agri-nusantara" element={<LenteraAgriPage />} />
        <Route path="/divisi/ciheras-university"     element={<CiherasUniversityPage />} />
        <Route path="/potensi-angin"                 element={<PotensiAnginPage />} />
        <Route path="/cerita-ciheras"                element={<CeritaCiherasPage />} />
      </Routes>
    </>
  )
}
