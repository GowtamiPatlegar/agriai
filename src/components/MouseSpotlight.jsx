import { useEffect, useRef } from 'react'

export default function MouseSpotlight() {
  const spotlightRef = useRef(null)
  const isMobileRef = useRef(false)

  useEffect(() => {
    // Detect if device is mobile
    isMobileRef.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

    if (isMobileRef.current) return // Disable on mobile

    const spotlight = spotlightRef.current
    if (!spotlight) return

    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let animationFrameId = null

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const updateSpotlight = () => {
      // Smooth interpolation for elegant motion
      targetX += (mouseX - targetX) * 0.15
      targetY += (mouseY - targetY) * 0.15

      spotlight.style.left = `${targetX}px`
      spotlight.style.top = `${targetY}px`

      animationFrameId = requestAnimationFrame(updateSpotlight)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animationFrameId = requestAnimationFrame(updateSpotlight)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  if (isMobileRef.current) return null

  return (
    <div
      ref={spotlightRef}
      className="mouse-spotlight"
      aria-hidden="true"
    />
  )
}
