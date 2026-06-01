import Navbar from '../components/Navbar'
import AboutStatementSection from '../components/AboutStatementSection'
import VisiMisiSection from '../components/VisiMisiSection'
import NilaiSection from '../components/NilaiSection'
import JejakLangkahSection from '../components/JejakLangkahSection'
import FounderSection from '../components/FounderSection'
import GaleriSection from '../components/GaleriSection'
import LokasiSection from '../components/LokasiSection'
import FooterCTA from '../components/FooterCTA'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

export default function AboutPage() {
  useSmoothScroll()

  return (
    <>
      <Navbar />
      <main>
        <AboutStatementSection />
        <VisiMisiSection />
        <NilaiSection />
        <JejakLangkahSection />
        <FounderSection />
        <GaleriSection />
        <LokasiSection />
        <FooterCTA />
      </main>
    </>
  )
}
