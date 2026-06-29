import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { TrustStrip } from './components/TrustStrip'
import { Promise } from './components/Promise'
import { Services } from './components/Services'
import { CaseStudies } from './components/CaseStudies'
import { Capabilities } from './components/Capabilities'
import { Process } from './components/Process'
import { Testimonials } from './components/Testimonials'
import { Troop } from './components/Troop'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'
import { VineScroll } from './components/VineScroll'

export default function App() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-canopy focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-milk"
      >
        Skip to content
      </a>
      <Nav />
      <VineScroll />
      <main>
        <Hero />
        <TrustStrip />
        <Promise />
        <Services />
        <Capabilities />
        <CaseStudies />
        <Process />
        <Testimonials />
        <Troop />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
