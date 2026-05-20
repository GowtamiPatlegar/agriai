import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/useLanguage'

function AIProcessingLoader({ text = {} }) {
  const { t } = useLanguage()
  const steps = text.steps ?? [t.disease.uploadTitle, t.disease.resultEyebrow, t.disease.reportTitle]

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 smooth-transition"
    >
      <div className="flex flex-col items-center text-center">
        <div className="ai-orbit relative mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-400/10">
          <div className="scan-beam absolute inset-4 rounded-full" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-lime-300 text-slate-950 shadow-xl shadow-emerald-400/20">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 4v16M6 8h12M6 16h12M8 4l-2 4 2 4-2 4 2 4M16 4l2 4-2 4 2 4-2 4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-black">
          {text.title ?? t.disease.analyzing}
        </h3>
        <p className="mt-2 max-w-sm leading-7 text-slate-300">
          {text.description ?? t.disease.waitingText}
        </p>
      </div>

      <div className="mt-7 space-y-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10 micro-hover smooth-transition"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-bold text-slate-200">{step}</span>
              <span className="text-xs font-black text-lime-200">
                {text.stepLabel ?? t.disease.resultEyebrow} {index + 1}
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="processing-bar h-full rounded-full bg-gradient-to-r from-lime-300 via-emerald-300 to-teal-300"
                style={{ animationDelay: `${index * 180}ms` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default AIProcessingLoader
