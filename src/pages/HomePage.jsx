import AnimatedStatsStrip from '../components/AnimatedStatsStrip'
import { useLanguage } from '../contexts/useLanguage'
import HeroSection from '../sections/HeroSection'

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <>
      <div id="home" className="scroll-section" aria-label={t.hero.eyebrow}>
        <AnimatedStatsStrip />
        <div className="particle-field bg-[radial-gradient(circle_at_top_left,#dcfce7,transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.88)_0%,rgba(240,253,244,0.78)_48%,rgba(248,250,252,0.86)_100%)]">
          <HeroSection />
        </div>
      </div>
    </>
  )
}
