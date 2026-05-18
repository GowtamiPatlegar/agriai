import { motion } from 'framer-motion'
import { cardReveal } from '../animations/motionVariants'
import WeatherIcon from './WeatherIcon'

function WeatherCard({ metric }) {
  return (
    <motion.article
      variants={cardReveal}
      className="glow-card stagger-card group rounded-3xl border border-white/80 bg-white/70 p-5 shadow-xl shadow-emerald-950/5 backdrop-blur transition duration-300 hover:-translate-y-2 hover:bg-white/90 hover:shadow-2xl hover:shadow-emerald-900/10"
    >
      <div
        className={`animated-gradient mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${metric.gradient} text-white shadow-lg shadow-emerald-800/20 transition duration-300 group-hover:scale-110 group-hover:rotate-3`}
      >
        <WeatherIcon type={metric.icon} />
      </div>
      <p className="text-sm font-bold text-slate-500">{metric.label}</p>
      <p className="mt-2 text-3xl font-black text-slate-950">{metric.value}</p>
      <p className="mt-2 text-sm font-semibold text-emerald-700">
        {metric.note}
      </p>
    </motion.article>
  )
}

export default WeatherCard
