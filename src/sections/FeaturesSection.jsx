import { motion } from 'framer-motion'
import FeatureCard from '../components/FeatureCard'
import { features } from '../data/agriData'
import { cardReveal, sectionReveal, viewportSettings } from '../animations/motionVariants'
import { useLanguage } from '../contexts/useLanguage'

function FeaturesSection() {
  const { t } = useLanguage()
  const sectionText = {
    eyebrow: 'Core Features',
    title: 'Everything farmers need in one AI workspace.',
    cards: [],
    ...t.ui.features,
  }
  const translatedFeatures = features.map((feature, index) => ({
    ...feature,
    ...((sectionText.cards?.[index]) ?? {}),
  }))

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      id="features"
      className="scroll-section particle-field border-t border-emerald-300/10 bg-[radial-gradient(circle_at_top_right,#14532d,transparent_30%),linear-gradient(135deg,#020617_0%,#0f172a_48%,#052e16_100%)] px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.div variants={cardReveal} className="mb-10 max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-lime-300">
            {sectionText.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            {sectionText.title}
          </h2>
        </motion.div>

        <motion.div variants={sectionReveal} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {translatedFeatures.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default FeaturesSection
