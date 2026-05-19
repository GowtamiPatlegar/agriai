import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function PremiumNavbar({ t }) {
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isCompact, setIsCompact] = useState(false)

  const navItems = [
    { key: 'home', label: 'Home', to: '/' },
    { key: 'assistant', label: t.assistant, to: '/assistant' },
    { key: 'weather', label: t.advisory, to: '/weather' },
    { key: 'disease', label: 'Disease', to: '/disease' },
    { key: 'about', label: 'About', to: '/about' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 48)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: -22, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.72,
        ease: [0.2, 0.9, 0.2, 1],
      },
    },
  }

  const logoVariants = {
    hidden: { scale: 0.84, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.12 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.42,
        delay: 0.18 + i * 0.07,
        ease: [0.2, 0.9, 0.2, 1],
      },
    }),
  }

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed left-0 right-0 top-2 z-50 mx-auto hidden w-full px-3 transition-all duration-300 sm:top-4 sm:px-5 md:block md:top-5 md:px-6"
    >
      <motion.div
        animate={{
          scale: isCompact ? 0.985 : 1,
          y: isCompact ? -6 : 0,
        }}
        transition={{ duration: 0.28, ease: [0.2, 0.9, 0.2, 1] }}
        className={`premium-navbar-shell mx-auto flex w-full max-w-7xl flex-col gap-2 px-3 sm:px-5 md:flex-row md:items-center md:justify-between md:gap-4 ${
          isCompact ? 'py-2 shadow-emerald-950/10' : 'py-2.5 sm:py-3'
        }`}
      >
        <div className="premium-navbar-sheen" aria-hidden="true" />

        <div className="flex min-w-0 items-center justify-between gap-3">
          <motion.div
            variants={logoVariants}
          >
            <Link
              to="/"
              className="group relative z-10 flex min-w-0 items-center gap-2 sm:gap-3"
              aria-label="AgriAI home"
            >
              <span className="nav-ai-orb" aria-hidden="true">
                <span className="nav-ai-orb-core">AI</span>
              </span>

              <span className="relative z-10 min-w-0">
                <span className="block bg-gradient-to-r from-emerald-500 via-lime-500 to-teal-500 bg-clip-text text-xl font-black tracking-tight text-transparent sm:text-2xl md:text-3xl">
                  AgriAI
                </span>
                <span className="block text-[0.56rem] font-bold uppercase tracking-[0.18em] text-emerald-800/70 sm:text-[0.66rem] sm:tracking-[0.28em]">
                  Neural Farming
                </span>
              </span>
            </Link>
          </motion.div>

          <motion.div
            className="ai-online-badge flex md:hidden"
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.28 }}
          >
            <span className="ai-online-dot" aria-hidden="true" />
            <span>AI Online</span>
          </motion.div>
        </div>

        <motion.div className="relative z-10 flex min-w-0 items-center justify-between gap-2 md:justify-end md:gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-1 rounded-full border border-white/50 bg-white/35 p-1 shadow-inner shadow-white/60 md:flex-none md:gap-2 md:bg-white/20">
            {navItems.map((item, i) => {
              const isHovered = hoveredItem === i

              return (
                <NavLink
                  key={item.key}
                  to={item.to}
                  end={item.to === '/'}
                  onMouseEnter={() => setHoveredItem(i)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onFocus={() => setHoveredItem(i)}
                  onBlur={() => setHoveredItem(null)}
                  className="premium-nav-link"
                >
                  {({ isActive }) => (
                    <motion.span
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="relative"
                    >
                      <motion.span
                        animate={{
                          y: isHovered ? -1 : 0,
                          color: isActive || isHovered ? '#047857' : '#334155',
                        }}
                        transition={{ duration: 0.22 }}
                      >
                        {item.label}
                      </motion.span>
                      {(isActive || isHovered) && (
                        <motion.span
                          className="premium-nav-underline"
                          layoutId="active-nav-underline"
                          transition={{
                            type: 'spring',
                            stiffness: 420,
                            damping: 32,
                          }}
                        />
                      )}
                    </motion.span>
                  )}
                </NavLink>
              )
            })}
          </div>

          <motion.div
            className="ai-online-badge hidden md:flex"
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.32 }}
          >
            <span className="ai-online-dot" aria-hidden="true" />
            <span>AI Online</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.38 }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/assistant"
            className="premium-nav-cta hidden sm:inline-flex"
            >
              <span>{t.getStarted}</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.nav>
  )
}
