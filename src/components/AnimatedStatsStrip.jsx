import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { stats } from '../data/agriData'
import { useLanguage } from '../contexts/useLanguage'

export default function AnimatedStatsStrip() {
  const { t } = useLanguage()
  const [counts, setCounts] = useState([0, 0, 0])

  useEffect(() => {
    const targets = [24, 4, 100]
    const intervals = []

    targets.forEach((target, idx) => {
      let current = 0
      const interval = setInterval(() => {
        current += Math.ceil(target / 30)
        if (current >= target) {
          current = target
          clearInterval(interval)
        }
        setCounts((prev) => {
          const updated = [...prev]
          updated[idx] = current
          return updated
        })
      }, 50)
      intervals.push(interval)
    })

    return () => intervals.forEach((i) => clearInterval(i))
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: [0.2, 0.9, 0.2, 1],
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.55 + i * 0.1,
        ease: [0.2, 0.9, 0.2, 1],
      },
    }),
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full -mt-0.5 bg-gradient-to-r from-slate-50 via-emerald-50/30 to-slate-50 border-t border-b border-emerald-100/40"
    >
      {/* Decorative animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1), transparent 50%)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.1), transparent 50%)',
          }}
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </div>

      {/* Stats Container */}
      <div className="relative mx-auto flex max-w-7xl items-center justify-around px-5 py-8 sm:px-8 md:py-10">
        {stats.map((stat, idx) => (
          <motion.div
            key={`${stat.label}-${idx}`}
            custom={idx}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center group"
          >
            {/* Stat Item Container with hover effect */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="relative px-4 py-3 sm:px-6 rounded-2xl transition-all duration-300"
            >
              {/* Glow background on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity"
                layoutId={`stat-glow-${idx}`}
              />

              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.div
                  className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'easeInOut',
                  }}
                >
                  {counts[idx]}
                  {idx === 1 ? '' : idx === 2 ? '%' : '/7'}
                </motion.div>
                <div className="mt-1 text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  {t.hero.stats?.[idx] ?? stat.label}
                </div>
              </div>

              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-transparent"
                animate={{
                  borderColor: [
                    'rgba(16, 185, 129, 0)',
                    'rgba(16, 185, 129, 0.3)',
                    'rgba(16, 185, 129, 0)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: idx * 0.5,
                }}
              />
            </motion.div>

            {/* Decorative dot below */}
            <motion.div
              className="mt-3 h-1 w-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
              animate={{ scaleY: [1, 1.5, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: idx * 0.3,
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
