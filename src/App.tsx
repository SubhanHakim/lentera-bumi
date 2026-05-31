import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import KontribusiSection from './components/KontribusiSection'
import ProyekSection from './components/ProyekSection'
import FooterCTA from './components/FooterCTA'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import './App.css'

function App() {
  useSmoothScroll()

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* Spacer accounts for fixed navbar on sections below hero */}
        <div style={{ height: 80 }} aria-hidden="true" />
        <StatsSection />
        <KontribusiSection />
        <ProyekSection />
        <FooterCTA />
      </main>
    </>
  )
}

export default App
