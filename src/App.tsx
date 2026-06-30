import Blog from './components/Blog'
import Configurator from './components/Configurator'
import CTABanner from './components/CTABanner'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Inspiration from './components/Inspiration'
import MobileCTA from './components/MobileCTA'
import Models from './components/Models'
import Process from './components/Process'
import SectionDivider from './components/SectionDivider'
import Showroom from './components/Showroom'
import Testimonials from './components/Testimonials'
import TrustStrip from './components/TrustStrip'
import USP from './components/USP'

export default function App() {
  return (
    <>
      <Header />
      <main className="pb-20 lg:pb-0">
        <Hero />
        <TrustStrip />
        <USP />
        <SectionDivider variant="cream" />
        <Models />
        <Inspiration />
        <SectionDivider variant="white" />
        <Process />
        <Showroom />
        <Configurator />
        <Testimonials />
        <CTABanner />
        <Blog />
        <FAQ />
      </main>
      <Footer />
      <MobileCTA />
    </>
  )
}