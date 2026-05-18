import { motion } from 'framer-motion'
import HeroVisual from '../components/HeroVisual'
import { stats } from '../data/agriData'
import { cardReveal, sectionReveal, viewportSettings } from '../animations/motionVariants'

function HeroSection({ t }) {
  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      className="section-reveal mx-auto grid min-h-[calc(100vh-84px)] w-full max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24"
    >
      <motion.div variants={cardReveal} className="animate-fade-up">
        <span className="mb-5 inline-flex rounded-full border border-emerald-200 bg-white/75 px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm">
          {t.eyebrow}
        </span>
        <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-7xl">
          {t.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          {t.subtitle}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="#features"
            className="button-lift animated-gradient rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 px-7 py-4 text-center font-bold text-white shadow-xl shadow-emerald-700/25 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-700/30"
          >
            {t.primaryCta}
          </a>
          <a
            href="#assistant"
            className="button-lift rounded-full border border-emerald-200 bg-white/80 px-7 py-4 text-center font-bold text-emerald-800 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:bg-white"
          >
            {t.secondaryCta}
          </a>
        </div>

        <motion.div variants={sectionReveal} className="mt-10 grid max-w-xl grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              variants={cardReveal}
              key={stat.label}
              className="glow-card stagger-card rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1"
            >
              <p className="text-2xl font-black text-emerald-700">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {t.stats[index]}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div variants={cardReveal}>
        <HeroVisual />
      </motion.div>
    </motion.section>
  )
}

export default HeroSection
