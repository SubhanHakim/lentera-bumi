import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import DivisiSection from './components/DivisiSection'
import SkyDancerSection from './components/SkyDancerSection'
import KontribusiSection from './components/KontribusiSection'
import ProyekSection from './components/ProyekSection'
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

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true })
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function HomePage() {
  useSmoothScroll()

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <div style={{ height: 80 }} aria-hidden="true" />
        <StatsSection />
        <DivisiSection />
        <SkyDancerSection />
        <KontribusiSection />
        <ProyekSection />
        <FooterCTA />
      </main>
    </>
  )
}

export default function App() {
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
