import { motion } from 'framer-motion'
import { cardReveal, sectionReveal, viewportSettings } from '../animations/motionVariants'
import LanguageToggle from '../sections/LanguageToggle'

export default function AboutPage({ language, onLanguageChange, t }) {
  return (
    <>
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        className="particle-field border-b border-emerald-100/80 bg-[radial-gradient(circle_at_top_left,#dcfce7,transparent_28%),linear-gradient(135deg,#ffffff_0%,#f8fafc_52%,#ecfdf5_100%)] px-4 py-12 text-slate-900 sm:px-6 sm:py-16 md:px-8 lg:py-24"
      >
        <div className="section-reveal mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div variants={cardReveal}>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600">
              About AgriAI
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl md:text-5xl">
              A production-ready AI agriculture workspace for field decisions.
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
              AgriAI brings disease analysis, live weather intelligence,
              multilingual access, and a farming assistant into a focused
              platform built for demos, hackathons, portfolios, and real-world
              farm workflows.
            </p>
          </motion.div>

          <motion.div
            variants={cardReveal}
            className="glass-panel glow-card rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Live Weather', 'Coordinates-based advisory with fallback logic.'],
                ['AI Chat', 'Crop, soil, irrigation, fertilizer, and risk guidance.'],
                ['Disease Scan', 'Image-based crop symptom analysis workflow.'],
                ['Multilingual', 'Telugu, Hindi, Tamil, Kannada, Malayalam, and Marathi.'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-emerald-100/80 bg-white/70 p-4 shadow-sm">
                  <h2 className="font-black text-slate-950">{title}</h2>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <LanguageToggle
        language={language}
        onLanguageChange={onLanguageChange}
        t={t.language}
      />
    </>
  )
}
