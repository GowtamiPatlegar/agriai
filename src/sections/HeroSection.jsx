import { motion } from 'framer-motion'
import FloatingLeaves from '../components/FloatingLeaves'
import HeroVisual from '../components/HeroVisual'
import { stats } from '../data/agriData'
import { cardReveal, sectionReveal } from '../animations/motionVariants'

function HeroSection({ t }) {
  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      animate="visible"
      className="hero-premium-stage section-reveal relative mx-auto grid min-h-[calc(100dvh-150px)] w-full max-w-7xl items-center gap-8 px-4 pb-12 pt-12 sm:min-h-[calc(100dvh-170px)] sm:px-6 sm:pb-16 sm:pt-20 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-24 lg:pt-28"
    >
      <FloatingLeaves />
      <div className="hero-grid-glow" aria-hidden="true" />
      <div className="hero-particles" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <motion.div variants={cardReveal} className="animate-fade-up relative z-10">
        <motion.div variants={cardReveal} className="mb-4 flex flex-wrap gap-2">
          {['Crop AI', 'Weather Signals', 'Disease Scan'].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-emerald-200/80 bg-white/75 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-emerald-800 shadow-sm shadow-emerald-950/5 backdrop-blur-sm"
            >
              {chip}
            </span>
          ))}
        </motion.div>
        <motion.span
          variants={cardReveal}
          className="hero-eyebrow mb-5 inline-flex rounded-full px-4 py-2 text-sm font-bold text-emerald-800"
        >
          {t.eyebrow}
        </motion.span>
        <motion.h1
          variants={cardReveal}
          className="max-w-4xl bg-gradient-to-r from-slate-950 via-emerald-800 to-lime-500 bg-clip-text text-3xl font-black leading-tight text-transparent sm:text-5xl lg:text-7xl"
        >
          {t.title}
        </motion.h1>
        <motion.p
          variants={cardReveal}
          className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8"
        >
          {t.subtitle}
        </motion.p>

        <motion.div variants={cardReveal} className="mt-8 flex flex-col gap-4 sm:flex-row">
          <motion.a
            href="#features"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="button-lift animated-gradient rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 px-7 py-4 text-center font-bold text-white shadow-xl shadow-emerald-700/25 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-700/30"
          >
            {t.primaryCta}
          </motion.a>
          <motion.a
            href="#assistant"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hero-secondary-cta button-lift rounded-full px-7 py-4 text-center font-bold text-emerald-900 transition"
          >
            {t.secondaryCta}
          </motion.a>
        </motion.div>

        <motion.div variants={sectionReveal} className="mt-8 grid max-w-xl grid-cols-1 gap-3 min-[420px]:grid-cols-3 sm:mt-10 sm:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              variants={cardReveal}
              key={stat.label}
              className="glass-panel glow-card stagger-card rounded-2xl p-3 transition duration-300 hover:-translate-y-1 sm:p-4"
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

      <motion.div variants={cardReveal} className="relative z-10">
        <HeroVisual />
      </motion.div>
    </motion.section>
  )
}

export default HeroSection
