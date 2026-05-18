import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
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
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <div className="particle-field bg-[radial-gradient(circle_at_top_left,#dcfce7,transparent_34%),linear-gradient(135deg,#ffffff_0%,#f0fdf4_48%,#f8fafc_100%)]">
        <Navbar t={t.nav} />
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
    </main>
  )
}

export default App
