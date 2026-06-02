import Navbar from '../components/Navbar'
import AboutStatementSection from '../components/AboutStatementSection'
import VisiMisiSection from '../components/VisiMisiSection'
import NilaiSection from '../components/NilaiSection'
import JejakLangkahSection from '../components/JejakLangkahSection'
import FounderSection from '../components/FounderSection'
import SiteCiherasSection from '../components/SiteCiherasSection'
import LokasiSection from '../components/LokasiSection'
import FooterCTA from '../components/FooterCTA'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutStatementSection />
        <VisiMisiSection />
        <NilaiSection />
        <JejakLangkahSection />
        <FounderSection />
        <SiteCiherasSection />
        <LokasiSection />
        <FooterCTA />
      </main>
    </>
  )
}
