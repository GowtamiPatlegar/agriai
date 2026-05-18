import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const MAX_LEAVES = 18
const MIN_DISTANCE = 24
const MIN_INTERVAL = 45
const LEAF_LIFETIME = 1100

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19c8.5 0 14-5.5 14-14C10.5 5 5 10.5 5 19Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M5 19c8.5 0 14-5.5 14-14C10.5 5 5 10.5 5 19Zm0 0 8-8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function LeafCursorTrail() {
  const [leaves, setLeaves] = useState([])
  const counterRef = useRef(0)
  const lastPointRef = useRef({ x: 0, y: 0, time: 0 })
  const timeoutRefs = useRef([])

  useEffect(() => {
    const desktopPointerQuery = window.matchMedia('(min-width: 768px) and (pointer: fine)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!desktopPointerQuery.matches || reducedMotionQuery.matches) {
      return undefined
    }

    function removeLeaf(id) {
      setLeaves((currentLeaves) => currentLeaves.filter((leaf) => leaf.id !== id))
    }

    function handlePointerMove(event) {
      const now = performance.now()
      const lastPoint = lastPointRef.current
      const distance = Math.hypot(event.clientX - lastPoint.x, event.clientY - lastPoint.y)

      if (distance < MIN_DISTANCE || now - lastPoint.time < MIN_INTERVAL) {
        return
      }

      lastPointRef.current = {
        x: event.clientX,
        y: event.clientY,
        time: now,
      }

      const id = counterRef.current
      counterRef.current += 1

      const leaf = {
        id,
        x: event.clientX + Math.random() * 12 - 6,
        y: event.clientY + Math.random() * 12 - 6,
        driftX: Math.random() * 36 - 18,
        driftY: -(32 + Math.random() * 28),
        rotation: Math.random() * 80 - 40,
        size: 13 + Math.random() * 9,
        color: Math.random() > 0.5 ? 'text-emerald-400' : 'text-green-500',
      }

      setLeaves((currentLeaves) => [...currentLeaves.slice(-MAX_LEAVES + 1), leaf])

      const timeoutId = window.setTimeout(() => removeLeaf(id), LEAF_LIFETIME)
      timeoutRefs.current.push(timeoutId)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
      timeoutRefs.current = []
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden overflow-hidden md:block" aria-hidden="true">
      <AnimatePresence>
        {leaves.map((leaf) => (
          <motion.span
            key={leaf.id}
            initial={{ opacity: 0, x: leaf.x, y: leaf.y, scale: 0.65, rotate: 0 }}
            animate={{
              opacity: [0, 0.42, 0],
              x: leaf.x + leaf.driftX,
              y: leaf.y + leaf.driftY,
              scale: [0.65, 1, 0.82],
              rotate: leaf.rotation,
            }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className={`leaf-cursor-particle absolute left-0 top-0 ${leaf.color}`}
            style={{
              width: leaf.size,
              height: leaf.size,
            }}
          >
            <LeafIcon />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default LeafCursorTrail
