'use client'
import { useStore } from '@/lib/store'
import { Lock } from 'lucide-react'

export default function Footer() {
  const { isAdmin } = useStore()
  return (
    <footer className="border-t border-gold/8 py-12 px-4 sm:px-8 relative overflow-hidden bg-void">
      {/* Background ambient light */}
      <div className="orb-a absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.03), transparent 75%)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Row: Brand & Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Logo brand */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-2.5 h-2.5 bg-void border border-gold rotate-45 flex items-center justify-center shrink-0">
              <div className="w-1.5 h-1.5 bg-gold rounded-full transition-transform duration-300 group-hover:scale-125" />
            </div>
            <span className="font-display text-2xl text-ivory tracking-widest transition-colors duration-300 group-hover:text-gold">
              DHWANI CHAUHAN
            </span>
          </a>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <a href="#projects" className="label text-mist/60 hover:text-gold transition-colors" style={{ fontSize: '0.68rem' }}>Work</a>
            <a href="#skills" className="label text-mist/60 hover:text-gold transition-colors" style={{ fontSize: '0.68rem' }}>Skills</a>
            <a href="#experience" className="label text-mist/60 hover:text-gold transition-colors" style={{ fontSize: '0.68rem' }}>Experience</a>
            <a href="#education" className="label text-mist/60 hover:text-gold transition-colors" style={{ fontSize: '0.68rem' }}>Education</a>
            <a href="#contact" className="label text-mist/60 hover:text-gold transition-colors" style={{ fontSize: '0.68rem' }}>Contact</a>
          </div>
        </div>

        {/* Middle Divider: Horizontal line with glowing diamond */}
        <div className="relative flex items-center justify-center my-6">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
          <div className="absolute w-2.5 h-2.5 bg-void border border-gold/40 rotate-45 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Bottom Row: Copyright, Tech Stack, Links */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-2">
          {/* Copyright */}
          <div className="flex items-center text-center lg:text-left">
            <span className="label text-mist/35" style={{ fontSize: '0.65rem' }}>
              &copy; 2026 Dhwani. All rights reserved.
            </span>
            {!isAdmin ? (
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-admin-login'))}
                className="hover:text-gold transition-colors ml-2.5 text-mist/35 flex items-center gap-1 inline-flex cursor-pointer"
                style={{ fontSize: '0.65rem' }}
              >
                <Lock size={10} /> Admin
              </button>
            ) : (
              <span className="text-gold/50 ml-2.5 inline-flex items-center gap-1" style={{ fontSize: '0.65rem' }}>
                &middot; Admin Active
              </span>
            )}
          </div>

          {/* Terms & Privacy */}
          <div className="flex items-center gap-3 text-mist/35" style={{ fontSize: '0.65rem' }}>
            <a href="#terms" className="hover:text-gold transition-colors label">Terms &amp; Conditions</a>
            <span className="text-gold/20">|</span>
            <a href="#privacy" className="hover:text-gold transition-colors label">Privacy Policy</a>
          </div>

          {/* Tech Stack credits */}
          <span className="label text-mist/30 text-center lg:text-right" style={{ fontSize: '0.62rem', letterSpacing: '0.12em' }}>
            Built with Next.js &middot; Tailwind &middot; Three.js
          </span>
        </div>

      </div>
    </footer>
  )
}
