import { useState } from 'react'
import './App.css'
import AnimatedStatsStrip from './components/AnimatedStatsStrip'
import LeafCursorTrail from './components/LeafCursorTrail'
import MouseSpotlight from './components/MouseSpotlight'
import PremiumNavbar from './components/PremiumNavbar'
import { translations } from './data/translations'
import DiseaseDetection from './sections/DiseaseDetection'
import FarmingChatbot from './sections/FarmingChatbot'
import FeaturesSection from './sections/FeaturesSection'
import HeroSection from './sections/HeroSection'
import LanguageToggle from './sections/LanguageToggle'
import WeatherAdvisory from './sections/WeatherAdvisory'

function App() {
  const [language, setLanguage] = useState('en')
  const t = translations[language]

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <div className="aurora-background" aria-hidden="true" />
      <MouseSpotlight />
      <LeafCursorTrail />

      {/* Premium Fixed Navbar */}
      <PremiumNavbar t={t.nav} />

      {/* Animated Stats Strip */}
      <AnimatedStatsStrip />

      <div className="relative z-10 pt-32">
        <div className="particle-field bg-[radial-gradient(circle_at_top_left,#dcfce7,transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.88)_0%,rgba(240,253,244,0.78)_48%,rgba(248,250,252,0.86)_100%)]">
          <HeroSection t={t.hero} />
        </div>

        <DiseaseDetection t={t.disease} />
        <FarmingChatbot t={t.chatbot} />
        <WeatherAdvisory t={t.weather} />
        <LanguageToggle
          language={language}
          onLanguageChange={setLanguage}
          t={t.language}
        />
        <FeaturesSection />
      </div>
    </main>
  )
}

export default App
