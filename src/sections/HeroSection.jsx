import { motion } from 'framer-motion'
import FloatingLeaves from '../components/FloatingLeaves'
import HeroVisual from '../components/HeroVisual'
import { stats } from '../data/agriData'
import { cardReveal, sectionReveal } from '../animations/motionVariants'
import { useLanguage } from '../contexts/useLanguage'
import { handleSectionLinkClick } from '../utils/scrollToSection'

function HeroSection() {
  const { t } = useLanguage()
  const heroText = t.hero
  const heroChips = heroText.stats ?? []

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
          {heroChips.map((chip) => (
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
          {heroText.eyebrow}
        </motion.span>
        <motion.h1
          variants={cardReveal}
          className="max-w-4xl bg-gradient-to-r from-slate-950 via-emerald-800 to-lime-500 bg-clip-text text-3xl font-black leading-tight text-transparent sm:text-5xl lg:text-7xl"
        >
          {heroText.title}
        </motion.h1>
        <motion.p
          variants={cardReveal}
          className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8"
        >
          {heroText.subtitle}
        </motion.p>

        <motion.div variants={cardReveal} className="mt-8 flex flex-col gap-4 sm:flex-row">
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <a
              href="#disease"
              onClick={(event) => handleSectionLinkClick(event, 'disease')}
              className="button-lift animated-gradient block rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 px-7 py-4 text-center font-bold text-white shadow-xl shadow-emerald-700/25 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-700/30"
            >
              {heroText.primaryCta}
            </a>
          </motion.div>
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <a
              href="#assistant"
              onClick={(event) => handleSectionLinkClick(event, 'assistant')}
              className="hero-secondary-cta button-lift block rounded-full px-7 py-4 text-center font-bold text-emerald-900 transition"
            >
              {heroText.secondaryCta}
            </a>
          </motion.div>
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
                {heroText.stats[index]}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div variants={cardReveal} className="relative z-10">
        <HeroVisual />
      </motion.div>

      <motion.a
        href="#about"
        onClick={(event) => handleSectionLinkClick(event, 'about')}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 rounded-full border border-emerald-200/80 bg-white/70 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-700 shadow-sm backdrop-blur-sm transition hover:border-lime-300 hover:bg-white lg:inline-flex"
        aria-label="Scroll to about section"
      >
        v
      </motion.a>
    </motion.section>
  )
}

export default HeroSection
