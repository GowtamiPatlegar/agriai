import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import LeafCursorTrail from './components/LeafCursorTrail'
import MobileBottomNav from './components/MobileBottomNav'
import MouseSpotlight from './components/MouseSpotlight'
import PremiumNavbar from './components/PremiumNavbar'
import ScrollToTop from './components/ScrollToTop'
import { translations } from './data/translations'
import AboutPage from './pages/AboutPage'
import AssistantPage from './pages/AssistantPage'
import DiseasePage from './pages/DiseasePage'
import HomePage from './pages/HomePage'
import WeatherPage from './pages/WeatherPage'

function App() {
  const [language, setLanguage] = useState('en')
  const location = useLocation()
  const t = translations[language]

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-slate-50 pb-20 text-slate-900 md:pb-0">
      <div className="aurora-background" aria-hidden="true" />
      <MouseSpotlight />
      <LeafCursorTrail />
      <ScrollToTop />

      <PremiumNavbar t={t.nav} />
      <MobileBottomNav />

      <div className="relative z-10 pt-6 sm:pt-10 md:pt-36">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.2, 0.9, 0.2, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage t={t} />} />
              <Route path="/assistant" element={<AssistantPage t={t} />} />
              <Route path="/weather" element={<WeatherPage t={t} />} />
              <Route path="/disease" element={<DiseasePage t={t} />} />
              <Route
                path="/about"
                element={(
                  <AboutPage
                    language={language}
                    onLanguageChange={setLanguage}
                    t={t}
                  />
                )}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}

export default App
