import { motion } from 'framer-motion'
import { useState } from 'react'

export default function PremiumNavbar({ t }) {
  const [hoveredItem, setHoveredItem] = useState(null)

  const navItems = [
    { key: 'features', label: t.features },
    { key: 'assistant', label: t.assistant },
    { key: 'advisory', label: t.advisory },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.9, 0.2, 1],
      },
    },
  }

  const logoVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.15 + i * 0.08,
        ease: [0.2, 0.9, 0.2, 1],
      },
    }),
  }

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 mx-auto flex w-full items-center justify-between px-5 py-4 sm:px-8"
    >
      {/* Glassmorphism Background */}
      <div
        className="absolute inset-0 glass-panel -z-10 rounded-3xl mx-5 sm:mx-8 my-3"
        style={{
          boxShadow:
            '0 8px 32px rgba(16, 185, 129, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        }}
      />

      {/* Logo & Branding */}
      <motion.a
        href="#"
        variants={logoVariants}
        className="flex items-center gap-3 relative z-10"
      >
        {/* Animated AI Orb */}
        <motion.div
          className="relative h-12 w-12 flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.4), transparent 70%)',
              filter: 'blur(8px)',
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Middle pulsing ring */}
          <motion.div
            className="absolute inset-1 rounded-full border-2 border-emerald-500/30"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, linear: true }}
          />

          {/* Core orb */}
          <motion.div
            className="relative h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/50"
            animate={{
              boxShadow: [
                '0 0 20px rgba(16, 185, 129, 0.6)',
                '0 0 40px rgba(16, 185, 129, 0.8)',
                '0 0 20px rgba(16, 185, 129, 0.6)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Inner shine */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-300/60 to-transparent" />
          </motion.div>

          {/* Floating particles around orb */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/60 rounded-full"
              animate={{
                x: Math.cos((i * 2 * Math.PI) / 3) * 20,
                y: Math.sin((i * 2 * Math.PI) / 3) * 20,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
          ))}
        </motion.div>

        {/* Gradient Text */}
        <div className="relative z-10">
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm">
            AgriAI
          </span>
          <div className="text-xs font-semibold text-emerald-600 tracking-wide">
            Smart Farming
          </div>
        </div>
      </motion.a>

      {/* Navigation Items */}
      <motion.div className="hidden items-center gap-8 md:flex relative z-10">
        {navItems.map((item, i) => (
          <motion.a
            key={item.key}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            href={`#${item.key}`}
            onMouseEnter={() => setHoveredItem(i)}
            onMouseLeave={() => setHoveredItem(null)}
            className="relative group text-sm font-semibold text-slate-700 transition-colors duration-300"
          >
            <span className="relative">
              {item.label}
              {/* Underline animation */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
                initial={{ width: 0 }}
                animate={{ width: hoveredItem === i ? '100%' : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </span>
          </motion.a>
        ))}
      </motion.div>

      {/* Right Side: Live Badge + CTA Button */}
      <div className="flex items-center gap-4 relative z-10">
        {/* Live AI Badge */}
        <motion.div
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-xs font-bold text-emerald-700">Live AI</span>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="#features"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative overflow-hidden px-6 py-2.5 rounded-full font-semibold text-white text-sm bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/50 transition-shadow"
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <span className="relative">{t.getStarted}</span>
        </motion.a>
      </div>
    </motion.nav>
  )
}
