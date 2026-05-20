import { motion } from 'framer-motion'
import './App.css'

import LeafCursorTrail from './components/LeafCursorTrail'
import MobileBottomNav from './components/MobileBottomNav'
import MouseSpotlight from './components/MouseSpotlight'
import PremiumNavbar from './components/PremiumNavbar'

import AboutPage from './pages/AboutPage'
import AssistantPage from './pages/AssistantPage'
import DiseasePage from './pages/DiseasePage'
import HomePage from './pages/HomePage'
import WeatherPage from './pages/WeatherPage'

import Footer from './sections/Footer'
import FeaturesSection from './sections/FeaturesSection'
import LanguageToggle from './sections/LanguageToggle'

function App() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-slate-50 pb-20 text-slate-900 md:pb-0">
      <div className="aurora-background" aria-hidden="true" />

      <MouseSpotlight />
      <LeafCursorTrail />

      <PremiumNavbar />
      <MobileBottomNav />

      <div className="relative z-10 pt-6 sm:pt-10 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, ease: [0.2, 0.9, 0.2, 1] }}
        >
          <HomePage />

          <AboutPage />

          <FeaturesSection />

          <DiseasePage />

          <AssistantPage />

          <WeatherPage />

          <LanguageToggle />

          <Footer />
        </motion.div>
      </div>
    </main>
  )
}

export default App
