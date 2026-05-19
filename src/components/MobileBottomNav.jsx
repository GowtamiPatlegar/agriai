import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const navItems = [
  {
    key: 'features',
    label: 'Tools',
    path: 'M4 7h7v7H4zM13 7h7v4h-7zM13 13h7v4h-7zM4 16h7v1H4z',
  },
  {
    key: 'assistant',
    label: 'AI Chat',
    path: 'M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5v5A3.5 3.5 0 0 1 15.5 15H11l-4 4v-4.15A3.5 3.5 0 0 1 5 11.5z',
  },
  {
    key: 'advisory',
    label: 'Weather',
    path: 'M7 17h10a4 4 0 0 0 .7-7.94A6 6 0 0 0 6.3 7.2 5 5 0 0 0 7 17Z',
  },
]

export default function MobileBottomNav() {
  const [activeItem, setActiveItem] = useState('features')

  useEffect(() => {
    const handleScroll = () => {
      const current = navItems
        .map((item) => ({ key: item.key, section: document.getElementById(item.key) }))
        .filter(({ section }) => section && section.getBoundingClientRect().top <= 240)
        .at(-1)

      if (current) {
        setActiveItem(current.key)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
      className="fixed bottom-3 left-3 right-3 z-50 md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mobile-bottom-nav mx-auto grid max-w-md grid-cols-3 gap-1 rounded-full p-1.5">
        {navItems.map((item) => {
          const isActive = activeItem === item.key

          return (
            <a
              key={item.key}
              href={`#${item.key}`}
              className={`relative flex min-h-14 items-center justify-center gap-2 rounded-full px-2 text-xs font-black transition ${
                isActive ? 'text-slate-950' : 'text-emerald-50/80'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-active-nav"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-lime-300 to-emerald-300 shadow-lg shadow-lime-300/20"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <svg className="relative z-10 h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d={item.path} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="relative z-10">{item.label}</span>
            </a>
          )
        })}
      </div>
    </motion.nav>
  )
}
