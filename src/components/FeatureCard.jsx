import { motion } from 'framer-motion'
import { cardReveal } from '../animations/motionVariants'

function FeatureCard({ feature, index }) {
  return (
    <motion.article
      variants={cardReveal}
      className="glass-panel glow-card stagger-card group relative overflow-hidden rounded-3xl p-6 transition duration-300 micro-hover hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/15"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div
        className={`animated-gradient mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-sm font-black text-white shadow-lg shadow-emerald-800/20 transition duration-300 group-hover:scale-110 group-hover:rotate-3 gpu-accel`}
        aria-hidden="true"
      >
        {feature.icon}
      </div>
      <h3 className="mb-3 text-xl font-bold text-slate-950">{feature.title}</h3>
      <p className="leading-7 text-slate-600">{feature.description}</p>
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-200/60 blur-2xl opacity-0 transition duration-300 group-hover:opacity-80" />
    </motion.article>
  )
}

export default FeatureCard
