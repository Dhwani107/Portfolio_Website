'use client'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

const NAV = [
  { label: 'Work',         href: '#projects'     },
  { label: 'Skills',       href: '#skills'       },
  { label: 'Experience',   href: '#experience'   },
  { label: 'Education',    href: '#education'    },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact',      href: '#contact'      },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  
  useMotionValueEvent(scrollY, 'change', y => {
    setScrolled(y > 50)
  })

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.2 }}
        className="fixed left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8"
        style={{
          top: scrolled ? '12px' : '20px',
        }}
      >
        <div 
          className={`mx-auto flex items-center justify-between transition-all duration-500 rounded-full border bg-obsidian/45 backdrop-blur-xl ${
            scrolled 
              ? 'max-w-4xl border-gold/20 shadow-lg shadow-void/80 px-6 py-2.5' 
              : 'max-w-6xl border-gold/10 px-8 py-4'
          }`}
          style={{ 
            height: scrolled ? '54px' : '64px',
            backgroundColor: scrolled ? 'rgba(10, 10, 15, 0.85)' : 'rgba(5, 5, 7, 0.35)'
          }}
        >
          {/* Logo Brand with glowing diamond */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-2 h-2 bg-void border border-gold rotate-45 flex items-center justify-center shrink-0">
              <div className="w-1 h-1 bg-gold rounded-full transition-transform duration-300 group-hover:scale-125" />
            </div>
            <span className="label text-gold tracking-widest transition-colors duration-300 group-hover:text-gold-light" style={{ fontSize: '0.78rem', fontWeight: 600 }}>
              DHWANI CHAUHAN
            </span>
          </a>

          {/* Nav items */}
          <div className="hidden lg:flex items-center gap-2">
            {NAV.map((item, i) => (
              <motion.a 
                key={item.href} 
                href={item.href}
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3 + i * 0.05 }}
                className="label text-mist hover:text-gold px-3.5 py-1.5 rounded-full transition-all duration-300 relative hover:bg-gold/5 group"
                style={{ fontSize: '0.7rem', fontWeight: 400 }}
              >
                {item.label}
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <a 
            href="#contact"
            className="hidden lg:block label text-void bg-gold border border-gold px-6 py-2.5 rounded-full transition-all duration-300 hover:bg-transparent hover:text-gold hover:border-gold/50"
            style={{ fontSize: '0.7rem', fontWeight: 600 }}
          >
            HIRE ME
          </a>

          {/* Mobile hamburger menu */}
          <button onClick={() => setMenuOpen(v => !v)} className="lg:hidden flex flex-col gap-1.5 p-2 rounded-full hover:bg-gold/5 transition-colors shrink-0">
            <span className={`block w-5 h-px bg-gold transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-3.5 h-px bg-gold transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-gold transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer menu */}
      <motion.div
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'all' : 'none' }}
        className="fixed inset-0 z-40 bg-void/98 backdrop-blur-xl flex flex-col items-center justify-center gap-10 lg:hidden"
      >
        {NAV.map(item => (
          <a 
            key={item.href} 
            href={item.href} 
            onClick={() => setMenuOpen(false)}
            className="font-display text-2xl text-mist hover:text-gold transition-colors duration-300"
          >
            {item.label}
          </a>
        ))}
        <a 
          href="#contact" 
          onClick={() => setMenuOpen(false)}
          className="label text-void bg-gold border border-gold px-12 py-3.5 rounded-full mt-4" 
          style={{ fontSize: '0.78rem', fontWeight: 600 }}
        >
          HIRE ME
        </a>
      </motion.div>
    </>
  )
}
