'use client'
import { useState, useEffect } from 'react'

export default function TwinkleStars() {
  const [mounted, setMounted] = useState(false)
  const [stars, setStars] = useState<{ x: number; y: number; dur: number; delay: number }[]>([])
  const [shootingStars, setShootingStars] = useState<{ x: number; y: number; dur: number; delay: number; scale: number }[]>([])
  const [showShooting, setShowShooting] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Twinkling stars (background backdrop)
    const generated = Array.from({ length: 60 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      dur: 2.5 + Math.random() * 3,
      delay: Math.random() * 4,
    }))
    setStars(generated)

    // Shooting stars (randomly initialized parameters)
    const generatedShooting = Array.from({ length: 5 }, () => ({
      x: 30 + Math.random() * 60, // Scatter across the width
      y: Math.random() * 50,      // Scatter across the upper height
      dur: 1.5 + Math.random() * 2,
      delay: Math.random() * 10,
      scale: 0.6 + Math.random() * 0.7,
    }))
    setShootingStars(generatedShooting)

    // Listen to scroll to only show shooting stars below Hero (throttled with rAF and passive listener)
    let rAFId: number | null = null
    const handleScroll = () => {
      if (rAFId === null) {
        rAFId = requestAnimationFrame(() => {
          setShowShooting(window.scrollY > 400)
          rAFId = null
        })
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rAFId !== null) cancelAnimationFrame(rAFId)
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Twinkling Stars */}
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animation: `twinkle ${s.dur}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <svg width="4" height="4" viewBox="0 0 4 4">
            <polygon points="2,0 4,2 2,4 0,2" fill="rgba(201,168,76,0.55)" />
          </svg>
        </div>
      ))}

      {/* Scroll-triggered Shooting Stars */}
      {showShooting && shootingStars.map((ss, i) => (
        <div
          key={`shooting-${i}`}
          className="absolute shooting-star"
          style={{
            left: `${ss.x}%`,
            top: `${ss.y}%`,
            transform: `scale(${ss.scale})`,
            animation: `shooting ${ss.dur}s linear infinite`,
            animationDelay: `${ss.delay}s`,
          } as any}
        />
      ))}
    </div>
  )
}
