import { motion } from 'framer-motion'
import { cardReveal, sectionReveal, viewportSettings } from '../animations/motionVariants'
import { useLanguage } from '../contexts/useLanguage'
import { handleSectionLinkClick } from '../utils/scrollToSection'

const footerLinks = ['home', 'about', 'features', 'disease', 'assistant', 'weather', 'language']

export default function Footer() {
  const { t } = useLanguage()
  const navText = t.ui.nav
  const footerText = t.ui.footer

  const labels = {
    home: navText.home,
    about: navText.about,
    features: t.nav.features,
    disease: navText.disease,
    assistant: navText.assistant,
    weather: navText.weather,
    language: navText.language ?? t.language.eyebrow,
  }

  return (
    <motion.footer
      id="footer"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      className="scroll-section border-t border-emerald-300/10 bg-[radial-gradient(circle_at_top_left,#14532d,transparent_32%),linear-gradient(135deg,#020617_0%,#052e16_56%,#0f172a_100%)] px-4 py-10 text-white sm:px-6 md:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <motion.div variants={cardReveal}>
          <div className="inline-flex items-center gap-3">
            <span className="nav-ai-orb h-12 w-12" aria-hidden="true">
              <span className="nav-ai-orb-core">AI</span>
            </span>
            <div>
              <p className="text-2xl font-black text-lime-200">AgriAI</p>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-100/70">
                {footerText.tagline}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-2xl leading-7 text-slate-300">
            {footerText.description}
          </p>
        </motion.div>

        <motion.div variants={cardReveal} className="md:text-right">
          <div className="flex flex-wrap gap-2 md:justify-end">
            {footerLinks.map((sectionId) => (
              <a
                key={sectionId}
                href={`#${sectionId}`}
                onClick={(event) => handleSectionLinkClick(event, sectionId)}
                className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-black text-emerald-50 transition hover:border-lime-200/50 hover:bg-lime-200/10"
              >
                {labels[sectionId]}
              </a>
            ))}
          </div>
          <p className="mt-5 text-sm font-semibold text-slate-400">
            {footerText.note}
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
