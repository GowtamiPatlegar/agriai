import { motion } from 'framer-motion'
import { cardReveal, sectionReveal, viewportSettings } from '../animations/motionVariants'
import { languageOptions } from '../data/translations'

function LanguageToggle({ language, onLanguageChange, t }) {
  const activeLanguage = languageOptions.find((option) => option.code === language)

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      className="particle-field border-y border-emerald-100/80 bg-[radial-gradient(circle_at_top_left,#dcfce7,transparent_28%),linear-gradient(135deg,#ffffff_0%,#f8fafc_48%,#ecfdf5_100%)] px-5 py-20 text-slate-900 sm:px-8 lg:py-24"
    >
      <div className="section-reveal mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div variants={cardReveal}>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={cardReveal}
          className="glass-panel glow-card float-soft rounded-[2rem] p-5"
        >
          <div className="flex flex-col gap-4 rounded-[1.5rem] border border-emerald-100/80 bg-emerald-50/55 p-4 shadow-inner shadow-white/50 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-black text-white">
                {activeLanguage.shortLabel}
              </span>
              <span className="rounded-full border border-emerald-100 bg-white/80 px-3 py-1 text-xs font-black text-emerald-700 shadow-sm backdrop-blur">
                {activeLanguage.label} {t.active}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 rounded-3xl border border-white/80 bg-white/65 p-2 shadow-inner shadow-white/60 backdrop-blur ring-1 ring-emerald-100">
              {languageOptions.map((option) => {
                const isActive = option.code === language

                return (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => onLanguageChange(option.code)}
                    className={`rounded-full px-4 py-2 text-sm font-black transition ${
                      isActive
                        ? 'animated-gradient bg-gradient-to-r from-emerald-600 to-lime-500 text-white shadow-lg shadow-emerald-700/20'
                        : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="glass-panel-dark mt-5 overflow-hidden rounded-[1.5rem] p-6 text-white">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-lime-300/15 px-3 py-1 text-xs font-black text-lime-200 ring-1 ring-lime-200/20">
                {t.sampleBadge}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-slate-200 ring-1 ring-white/10">
                {activeLanguage.label}
              </span>
            </div>

            <div key={language} className="animate-fade-up">
              <h3 className="text-3xl font-black leading-tight">
                {t.sampleTitle}
              </h3>
              <p className="mt-4 text-lg leading-8 text-slate-200">
                {t.sampleText}
              </p>
              <div className="mt-6 rounded-3xl border border-emerald-300/20 bg-emerald-400/15 p-5 shadow-inner shadow-emerald-200/5 backdrop-blur">
                <p className="font-bold leading-7 text-emerald-50">
                  {t.sampleTip}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default LanguageToggle
