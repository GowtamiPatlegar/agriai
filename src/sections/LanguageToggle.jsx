import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { cardReveal, sectionReveal, viewportSettings } from '../animations/motionVariants'
import { useLanguage } from '../contexts/useLanguage'
import { languageOptions } from '../data/translations'

function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()
  const languageText = t.language
  const [isOpen, setIsOpen] = useState(false)
  const activeLanguage = languageOptions.find((option) => option.code === language)
  const activeShortLabel = activeLanguage?.shortLabel ?? language.toUpperCase()
  const activeLabel = activeLanguage?.label ?? t.languageName ?? 'English'

  function toggleDropdown() {
    setIsOpen((current) => !current)
  }

  function selectLanguage(code) {
    setLanguage(code)
    setIsOpen(false)
  }

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      id="language"
      className="scroll-section particle-field relative z-0 overflow-visible border-y border-emerald-100/80 bg-[radial-gradient(circle_at_top_left,#dcfce7,transparent_28%),linear-gradient(135deg,#ffffff_0%,#f8fafc_48%,#ecfdf5_100%)] px-4 py-12 text-slate-900 sm:px-6 sm:py-16 md:px-8 lg:py-24"
    >
      <div className="section-reveal relative z-0 mx-auto grid max-w-6xl gap-6 overflow-visible lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div variants={cardReveal} className="relative z-0 min-w-0">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600">
            {languageText.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl md:text-5xl">
            {languageText.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
            {languageText.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={cardReveal}
          className="glass-panel glow-card relative z-10 min-w-0 overflow-visible rounded-[1.5rem] p-3 sm:rounded-[2rem] sm:p-5 lg:float-soft"
        >
          <div className="relative z-10 flex flex-col gap-4 overflow-visible rounded-[1.5rem] border border-emerald-100/80 bg-emerald-50/70 p-4 shadow-inner shadow-white/50 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-black text-white">
                {activeShortLabel}
              </span>
              <span className="rounded-full border border-emerald-100 bg-white/90 px-3 py-1 text-xs font-black text-emerald-700 shadow-sm">
                {activeLabel} {languageText.active}
              </span>
            </div>

            <div className="relative z-[999]">
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex w-full items-center justify-between gap-4 rounded-full border border-white/90 bg-white/85 px-4 py-3 text-sm font-black text-emerald-900 shadow-sm shadow-emerald-950/5 transition hover:border-lime-200 hover:bg-white sm:min-w-64"
                aria-expanded={isOpen}
                aria-controls="language-options"
              >
                <span>{activeLabel}</span>
                <span className={`transition ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true">⌄</span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id="language-options"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-[calc(100%+0.5rem)] z-[9999] grid w-full gap-1 rounded-3xl border border-emerald-100 bg-white/95 p-2 shadow-2xl shadow-emerald-950/10 backdrop-blur-sm sm:w-72"
                  >
                    {languageOptions.map((option) => (
                      <button
                        key={option.code}
                        type="button"
                        onClick={() => selectLanguage(option.code)}
                        className={`flex items-center justify-between rounded-2xl px-3 py-2 text-left text-sm font-black transition ${
                          option.code === language
                            ? 'bg-gradient-to-r from-emerald-600 to-lime-500 text-white'
                            : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'
                        }`}
                      >
                        <span>{option.label}</span>
                        <span className="text-xs opacity-75">{option.shortLabel}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="glass-panel-dark relative z-0 mt-5 rounded-[1.5rem] p-4 text-white sm:p-6">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-lime-300/15 px-3 py-1 text-xs font-black text-lime-200 ring-1 ring-lime-200/20">
                {languageText.sampleBadge}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-slate-200 ring-1 ring-white/10">
                {activeLabel}
              </span>
            </div>

            <div key={language} className="animate-fade-up">
              <h3 className="text-2xl font-black leading-tight sm:text-3xl">
                {languageText.sampleTitle}
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
                {languageText.sampleText}
              </p>
              <div className="mt-6 rounded-3xl border border-emerald-300/20 bg-emerald-400/15 p-5 shadow-inner shadow-emerald-200/5 backdrop-blur">
                <p className="font-bold leading-7 text-emerald-50">
                  {languageText.sampleTip}
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
