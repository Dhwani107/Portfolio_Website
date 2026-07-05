'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  // Mouse coordinate refs
  const mouseCoords = useRef({ x: -100, y: -100 })
  const ringCoords = useRef({ x: -100, y: -100 })

  // Keep track of current state in refs to access them instantly inside RAF loop without closure delays
  const stateRef = useRef({ isHovered: false, isClicked: false })
  useEffect(() => {
    stateRef.current = { isHovered, isClicked }
  }, [isHovered, isClicked])

  useEffect(() => {
    // Check if the device has a precision pointer (desktop/mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)')
    setIsDesktop(mediaQuery.matches)

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches)
    }

    mediaQuery.addEventListener('change', handleMediaChange)
    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    // Hide default cursor in desktop environments
    document.body.classList.add('has-custom-cursor')

    const moveCursor = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX
      mouseCoords.current.y = e.clientY
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const isClickable =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsHovered(!!isClickable)
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    let animationFrameId = 0

    // Super lightweight requestAnimationFrame loop for absolute zero lag
    const updatePosition = () => {
      const { x, y } = mouseCoords.current
      const rx = ringCoords.current.x
      const ry = ringCoords.current.y
      const { isHovered: hovered, isClicked: clicked } = stateRef.current

      // 1. Inner Dot follows cursor instantly (absolute zero latency)
      if (dotRef.current) {
        const dotScale = clicked ? 0.65 : hovered ? 1.5 : 1
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${dotScale})`
      }

      // 2. Outer Ring follows with a high-performance linear interpolation (lerp)
      if (ringRef.current) {
        // High speed coefficient (0.22) makes it follow closely and responsively
        const lerpFactor = 0.22
        const nextRx = rx + (x - rx) * lerpFactor
        const nextRy = ry + (y - ry) * lerpFactor

        ringCoords.current.x = nextRx
        ringCoords.current.y = nextRy

        ringRef.current.style.transform = `translate3d(${nextRx}px, ${nextRy}px, 0)`
      }

      animationFrameId = requestAnimationFrame(updatePosition)
    }

    animationFrameId = requestAnimationFrame(updatePosition)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isDesktop, isVisible])

  if (!isDesktop || !isVisible) return null

  return (
    <>
      {/* Outer trailing Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[99998] flex items-center justify-center rounded-full border"
        style={{
          width: isHovered ? '52px' : '28px',
          height: isHovered ? '52px' : '28px',
          backgroundColor: isHovered ? 'rgba(201, 168, 76, 0.08)' : 'rgba(201, 168, 76, 0.02)',
          borderColor: isHovered ? 'rgba(201, 168, 76, 0.8)' : 'rgba(201, 168, 76, 0.35)',
          marginLeft: isHovered ? '-26px' : '-14px',
          marginTop: isHovered ? '-26px' : '-14px',
          // Explicit transition rules: DO NOT transition the 'transform' property to avoid positioning lag
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), margin-left 0.25s cubic-bezier(0.16, 1, 0.3, 1), margin-top 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, border-color 0.25s ease',
          willChange: 'transform',
        }}
      >
        {/* Inner dashed detail rotating on hover */}
        <div
          className={`rounded-full border border-dashed border-gold/20 transition-all duration-500 ease-out ${
            isHovered ? 'w-[80%] h-[80%] opacity-100 rotate-180' : 'w-0 h-0 opacity-0 rotate-0'
          }`}
        />
      </div>

      {/* Snap-to-mouse Inner Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[99999] h-2 w-2 rounded-full bg-gold mix-blend-difference"
        style={{
          marginLeft: '-4px',
          marginTop: '-4px',
          // Handled manually in RAF loop to prevent transition conflicts
          transition: 'transform 0.15s ease-out',
          willChange: 'transform',
        }}
      />
    </>
  )
}
