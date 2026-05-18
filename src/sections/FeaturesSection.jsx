import { motion } from 'framer-motion'
import FeatureCard from '../components/FeatureCard'
import { features } from '../data/agriData'
import { cardReveal, sectionReveal, viewportSettings } from '../animations/motionVariants'

function FeaturesSection() {
  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      id="features"
      className="particle-field border-t border-emerald-300/10 bg-[radial-gradient(circle_at_top_right,#14532d,transparent_30%),linear-gradient(135deg,#020617_0%,#0f172a_48%,#052e16_100%)] px-5 py-20 sm:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.div variants={cardReveal} className="mb-10 max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-lime-300">
            Core Features
          </p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Everything farmers need in one AI workspace.
          </h2>
        </motion.div>

        <motion.div variants={sectionReveal} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default FeaturesSection
