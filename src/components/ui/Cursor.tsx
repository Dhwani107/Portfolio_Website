'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null)
  const dot  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const r = ring.current!, d = dot.current!

    const raf = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      r.style.left = rx + 'px'
      r.style.top  = ry + 'px'
      requestAnimationFrame(raf)
    }
    raf()

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      d.style.left = e.clientX + 'px'
      d.style.top  = e.clientY + 'px'
    }

    const addLink  = () => r.classList.add('link')
    const rmLink   = () => r.classList.remove('link')
    const addActive= () => r.classList.add('active')
    const rmActive = () => r.classList.remove('active')

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', addLink)
      el.addEventListener('mouseleave', rmLink)
    })
    document.querySelectorAll('input,textarea,select').forEach(el => {
      el.addEventListener('mouseenter', addActive)
      el.addEventListener('mouseleave', rmActive)
    })
    return () => document.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot}  className="cursor-dot"  />
    </>
  )
}
