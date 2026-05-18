import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WeatherCard from '../components/WeatherCard'
import { cardReveal, sectionReveal, viewportSettings } from '../animations/motionVariants'
import { weatherMetrics } from '../data/agriData'

function WeatherMetricSkeletons() {
  return (
    <motion.div
      key="weather-skeletons"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="glass-panel rounded-3xl p-5"
        >
          <div className="shimmer h-14 w-14 rounded-2xl bg-emerald-100" />
          <div className="shimmer mt-5 h-3 w-28 rounded-full bg-slate-200/80" />
          <div className="shimmer mt-4 h-8 w-20 rounded-full bg-slate-200/80" />
          <div className="shimmer mt-4 h-3 w-32 rounded-full bg-emerald-100" />
        </div>
      ))}
    </motion.div>
  )
}

function AdvisorySkeletons() {
  return (
    <motion.div
      key="advisory-skeletons"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
    >
      <div className="glass-panel rounded-[2rem] p-6">
        <div className="shimmer h-4 w-48 rounded-full bg-emerald-100" />
        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-3xl bg-emerald-50/80 p-4 ring-1 ring-emerald-100"
            >
              <div className="shimmer h-3 w-full rounded-full bg-emerald-100" />
              <div className="shimmer mt-3 h-3 w-3/4 rounded-full bg-emerald-100" />
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel-dark rounded-[2rem] p-6">
        <div className="shimmer h-4 w-44 rounded-full bg-white/10" />
        <div className="shimmer mt-5 h-8 w-64 max-w-full rounded-full bg-white/10" />
        <div className="shimmer mt-6 h-3 w-full rounded-full bg-white/10" />
        <div className="shimmer mt-3 h-3 w-5/6 rounded-full bg-white/10" />
        <div className="shimmer mt-6 h-24 rounded-3xl bg-white/10" />
      </div>
    </motion.div>
  )
}

function WeatherAdvisory({ t }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1400)

    return () => clearTimeout(loadingTimer)
  }, [])

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      id="advisory"
      className="particle-field overflow-hidden border-b border-emerald-100/80 bg-[radial-gradient(circle_at_top_right,#fef3c7,transparent_26%),linear-gradient(180deg,#ffffff_0%,#f0fdf4_100%)] px-5 py-20 text-slate-900 sm:px-8 lg:py-24"
    >
      <div className="section-reveal mx-auto max-w-7xl">
        <motion.div
          variants={cardReveal}
          className="glow-card mb-8 rounded-[2rem] border border-amber-200/70 bg-gradient-to-r from-amber-100/75 via-lime-100/70 to-emerald-100/75 p-5 shadow-xl shadow-emerald-950/5 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">
                {t.alertEyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                {t.alertTitle}
              </h2>
            </div>
            <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-black text-emerald-800 shadow-sm">
              {t.advisoryBadge}
            </span>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div variants={cardReveal}>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600">
              {t.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {t.subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={cardReveal}
            className="glass-panel glow-card float-soft rounded-[2rem] p-5"
          >
            <div className="animated-gradient rounded-[1.5rem] bg-gradient-to-br from-emerald-700 via-green-600 to-lime-500 p-6 text-white shadow-2xl shadow-emerald-950/15">
              <p className="text-sm font-bold text-emerald-50">{t.today}</p>
              <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-6xl font-black">29 C</p>
                  <p className="mt-2 text-lg font-semibold text-emerald-50">
                    {t.forecast}
                  </p>
                </div>
                <div className="glass-inset rounded-3xl p-4">
                  <p className="text-sm text-emerald-50">{t.bestWindow}</p>
                  <p className="mt-1 text-2xl font-black">6 AM - 10 AM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <WeatherMetricSkeletons />
          ) : (
            <motion.div
              key="weather-data"
              variants={sectionReveal}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -12 }}
              className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {weatherMetrics.map((metric, index) => (
                <WeatherCard
                  key={metric.label}
                  metric={{ ...metric, label: t.metrics[index] }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <AdvisorySkeletons />
          ) : (
            <motion.div
              key="advisory-data"
              variants={sectionReveal}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -12 }}
              className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <motion.div
                variants={cardReveal}
                className="glass-panel glow-card rounded-[2rem] p-6"
              >
                <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600">
                  {t.recommendationsTitle}
                </p>
                <div className="mt-5 space-y-4">
                  {t.recommendations.map((recommendation) => (
                    <div
                      key={recommendation}
                      className="flex gap-4 rounded-3xl border border-emerald-100/80 bg-emerald-50/70 p-4 shadow-inner shadow-white/50 backdrop-blur"
                    >
                      <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-gradient-to-r from-emerald-500 to-lime-400" />
                      <p className="leading-7 text-slate-700">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={cardReveal}
                className="glass-panel-dark glow-card rounded-[2rem] p-6 text-white"
              >
                <p className="text-sm font-black uppercase tracking-[0.18em] text-lime-300">
                  {t.irrigationTitle}
                </p>
                <h2 className="mt-3 text-3xl font-black">{t.irrigationHeading}</h2>
                <p className="mt-4 leading-8 text-slate-300">
                  {t.irrigationText}
                </p>
                <div className="glass-inset mt-6 rounded-3xl p-5 text-white">
                  <p className="text-sm font-bold text-slate-300">{t.waterSaving}</p>
                  <p className="mt-2 text-4xl font-black text-lime-200">32%</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

export default WeatherAdvisory
