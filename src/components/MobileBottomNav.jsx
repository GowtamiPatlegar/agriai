import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/useLanguage'
import { useActiveSection } from '../hooks/useActiveSection'
import { handleSectionLinkClick } from '../utils/scrollToSection'

const navItems = [
  {
    key: 'home',
    sectionId: 'home',
    path: 'M4 7h7v7H4zM13 7h7v4h-7zM13 13h7v4h-7zM4 16h7v1H4z',
  },
  {
    key: 'disease',
    sectionId: 'disease',
    path: 'M12 3v18M7 7h10M7 17h10M8 3 6 7l2 3-2 4 2 7M16 3l2 4-2 3 2 4-2 7',
  },
  {
    key: 'assistant',
    sectionId: 'assistant',
    path: 'M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5v5A3.5 3.5 0 0 1 15.5 15H11l-4 4v-4.15A3.5 3.5 0 0 1 5 11.5z',
  },
  {
    key: 'weather',
    sectionId: 'weather',
    path: 'M7 17h10a4 4 0 0 0 .7-7.94A6 6 0 0 0 6.3 7.2 5 5 0 0 0 7 17Z',
  },
  {
    key: 'language',
    sectionId: 'language',
    path: 'M12 17v-5M12 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  },
]

export default function MobileBottomNav() {
  const { t } = useLanguage()
  const navText = t.ui.mobileNav
  const activeSection = useActiveSection()
  const visibleActiveSection = ['about', 'features', 'footer'].includes(activeSection)
    ? 'home'
    : activeSection

  return (
    <motion.nav
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
      className="fixed bottom-3 left-3 right-3 z-50 md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mobile-bottom-nav mx-auto grid max-w-md grid-cols-5 gap-1 rounded-full p-1.5">
        {navItems.map((item) => {
          const isActive = visibleActiveSection === item.sectionId

          return (
            <a
              key={item.key}
              href={`#${item.sectionId}`}
              onClick={(event) => handleSectionLinkClick(event, item.sectionId)}
              className="relative flex min-h-14 items-center justify-center rounded-full px-1 text-[0.64rem] font-black transition"
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-active-nav"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-lime-300 to-emerald-300 shadow-lg shadow-lime-300/20"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className={`relative z-10 flex flex-col items-center gap-1 ${isActive ? 'text-slate-950' : 'text-emerald-50/80'}`}>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d={item.path} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{navText[item.key]}</span>
              </span>
            </a>
          )
        })}
      </div>
    </motion.nav>
  )
}
