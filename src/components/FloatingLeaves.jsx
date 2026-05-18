import { motion } from 'framer-motion'

export default function FloatingLeaves() {
  const leaves = Array.from({ length: 8 })

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {leaves.map((_, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{
            left: `${(idx * 100) / 8}%`,
            top: `${Math.random() * 60 - 20}%`,
            opacity: 0.15,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.sin(idx) * 10, 0],
            rotate: [0, 360 * (idx % 2 === 0 ? 1 : -1), 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + idx * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: idx * 0.3,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-emerald-600"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
