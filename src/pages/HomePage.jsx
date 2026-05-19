import AnimatedStatsStrip from '../components/AnimatedStatsStrip'
import FeaturesSection from '../sections/FeaturesSection'
import HeroSection from '../sections/HeroSection'

export default function HomePage({ t }) {
  return (
    <>
      <AnimatedStatsStrip />
      <div className="particle-field bg-[radial-gradient(circle_at_top_left,#dcfce7,transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.88)_0%,rgba(240,253,244,0.78)_48%,rgba(248,250,252,0.86)_100%)]">
        <HeroSection t={t.hero} />
      </div>
      <FeaturesSection />
    </>
  )
}
