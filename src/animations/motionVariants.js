export const sectionReveal = {
  hidden: {
    opacity: 0,
    y: 56,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 16,
      staggerChildren: 0.14,
      delayChildren: 0.06,
    },
  },
}

export const cardReveal = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 22,
    },
  },
}

export const viewportSettings = {
  once: true,
  amount: 0.2,
}
