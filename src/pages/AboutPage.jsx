import { motion } from 'framer-motion'
import { cardReveal, sectionReveal, viewportSettings } from '../animations/motionVariants'
import { useLanguage } from '../contexts/useLanguage'

export default function AboutPage() {
  const { t } = useLanguage()
  const aboutCards = t.ui.about.cards
  const aboutStats = [
    { value: '6', label: t.language.eyebrow },
    { value: '24/7', label: aboutCards[1]?.[0] ?? t.chatbot.chatTitle },
    { value: '4+', label: t.ui.features.eyebrow },
  ]

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      id="about"
      className="scroll-section particle-field border-b border-emerald-100/80 bg-[radial-gradient(circle_at_top_left,#dcfce7,transparent_28%),linear-gradient(135deg,#ffffff_0%,#f8fafc_52%,#ecfdf5_100%)] px-4 py-12 text-slate-900 sm:px-6 sm:py-16 md:px-8 lg:py-24"
    >
      <div className="section-reveal mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div variants={cardReveal}>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600">
              {t.ui.about.eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl md:text-5xl">
              {t.ui.about.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
              {t.ui.about.subtitle}
            </p>
          </div>

          <div className="mt-8 grid gap-3 min-[420px]:grid-cols-3">
            {aboutStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={cardReveal}
                custom={index}
                className="glass-panel glow-card rounded-2xl p-4"
              >
                <p className="text-3xl font-black text-emerald-700">{stat.value}</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={cardReveal}
          className="glass-panel glow-card rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutCards.map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-emerald-100/80 bg-white/70 p-4 shadow-sm">
                <h2 className="font-black text-slate-950">{title}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-3xl border border-emerald-100/80 bg-emerald-50/80 p-5">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-700">
              {t.ui.features.cards[0]?.title}
            </p>
            <p className="mt-2 leading-7 text-slate-600">
              {t.ui.features.cards[0]?.description}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
