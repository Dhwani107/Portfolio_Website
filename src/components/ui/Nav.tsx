'use client'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import Modal, { Field, Btn } from '@/components/ui/Modal'
import toast from 'react-hot-toast'
import { Lock } from 'lucide-react'

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
  
  // Admin passcode states and triggers
  const { isAdmin, setAdmin } = useStore()
  const [loginOpen, setLoginOpen] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [clickCount, setClickCount] = useState(0)
  const [resetTimer, setResetTimer] = useState<NodeJS.Timeout | null>(null)

  useMotionValueEvent(scrollY, 'change', y => {
    setScrolled(y > 50)
  })

  // URL query check (?edit=true or ?admin=true) on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('edit') === 'true' || params.get('admin') === 'true') {
        setLoginOpen(true)
        // Clean query parameter from URL
        const newUrl = window.location.pathname
        window.history.replaceState({}, '', newUrl)
      }
    }
  }, [])

  // Event listener for opening admin login from other parts (e.g. Footer)
  useEffect(() => {
    const handleOpenAdminLogin = () => {
      setLoginOpen(true)
    }
    window.addEventListener('open-admin-login', handleOpenAdminLogin)
    return () => {
      window.removeEventListener('open-admin-login', handleOpenAdminLogin)
    }
  }, [])

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (resetTimer) clearTimeout(resetTimer)
    
    const nextCount = clickCount + 1
    if (nextCount >= 5) {
      setLoginOpen(true)
      setClickCount(0)
      toast.success('Admin passcode required')
    } else {
      setClickCount(nextCount)
      const timer = setTimeout(() => {
        setClickCount(0)
      }, 2000)
      setResetTimer(timer)
    }
  }

  const handleVerifyPasscode = () => {
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
    if (passcode === correctPassword) {
      setAdmin(true)
      toast.success('Admin editing mode enabled')
      setLoginOpen(false)
      setPasscode('')
    } else {
      toast.error('Incorrect passcode')
    }
  }

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
              ? 'max-w-4xl border-gold/20 shadow-lg shadow-gold/[0.03] px-6 py-2.5' 
              : 'max-w-6xl border-white/[0.05] px-8 py-4'
          }`}
          style={{ 
            height: scrolled ? '54px' : '64px',
            backgroundColor: scrolled ? 'rgba(10, 10, 15, 0.88)' : 'rgba(5, 5, 7, 0.4)'
          }}
        >
          {/* Logo Brand with glowing diamond */}
          <a href="#hero" onClick={handleLogoClick} className="flex items-center gap-2.5 group cursor-pointer select-none">
            <div className="w-2.5 h-2.5 bg-void border border-gold rotate-45 flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:rotate-[135deg]">
              <div className="w-1 h-1 bg-gold rounded-full transition-transform duration-300 group-hover:scale-125" />
            </div>
            <span className="label text-gold tracking-widest transition-colors duration-300 group-hover:text-gold-light whitespace-nowrap" style={{ fontSize: '0.74rem', fontWeight: 600 }}>
              DHWANI CHAUHAN
            </span>
          </a>

          {/* Nav items */}
          <div className="hidden lg:flex items-center gap-1.5">
            {NAV.map((item, i) => (
              <motion.a 
                key={item.href} 
                href={item.href}
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3 + i * 0.05 }}
                className="label text-mist hover:text-gold px-4 py-1.5 rounded-full transition-all duration-300 relative hover:bg-gold/5 group"
                style={{ fontSize: '0.68rem', fontWeight: 400, letterSpacing: '0.08em' }}
              >
                {item.label.toUpperCase()}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-gold rounded-full transition-all duration-300 group-hover:w-4" />
              </motion.a>
            ))}
          </div>

          {/* CTA / Admin status Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isAdmin && (
              <button 
                onClick={() => { setAdmin(false); toast.success('Logged out from admin mode') }}
                className="label text-red-400 border border-red-400/25 px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-red-400/5 hover:border-red-400/50 flex items-center gap-1.5 cursor-pointer"
                style={{ fontSize: '0.66rem', fontWeight: 600 }}
              >
                <Lock size={11} /> LOGOUT ADMIN
              </button>
            )}
            <a 
              href="https://www.linkedin.com/in/dhwani-chauhan-aaa5ab280/"
              target="_blank"
              rel="noopener noreferrer"
              className="label text-void bg-gold border border-gold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(201,168,76,0.35)] active:scale-98"
              style={{ fontSize: '0.68rem', fontWeight: 600 }}
            >
              HIRE ME
            </a>
          </div>

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
        {isAdmin && (
          <button 
            onClick={() => { setAdmin(false); setMenuOpen(false); toast.success('Logged out from admin mode') }}
            className="label text-red-400 border border-red-400/25 px-10 py-3 rounded-full hover:bg-red-400/5 hover:border-red-400 flex items-center gap-2"
            style={{ fontSize: '0.78rem', fontWeight: 600 }}
          >
            <Lock size={14} /> LOGOUT ADMIN
          </button>
        )}
        <a 
          href="https://www.linkedin.com/in/dhwani-chauhan-aaa5ab280/" 
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          className="label text-void bg-gold border border-gold px-12 py-3.5 rounded-full mt-4" 
          style={{ fontSize: '0.78rem', fontWeight: 600 }}
        >
          HIRE ME
        </a>
      </motion.div>

      {/* Admin Login Passcode Modal */}
      <Modal open={loginOpen} onClose={() => { setLoginOpen(false); setPasscode('') }} title="ADMIN AUTHENTICATION">
        <div className="flex flex-col gap-5">
          <Field label="ENTER PASSCODE">
            <input 
              type="password" 
              className="field" 
              value={passcode} 
              onChange={e => setPasscode(e.target.value)} 
              onKeyDown={e => { if (e.key === 'Enter') handleVerifyPasscode() }}
              placeholder="••••••••"
              autoFocus
            />
          </Field>
          <div className="flex gap-3 pt-3 border-t border-gold/10">
            <Btn onClick={handleVerifyPasscode}>VERIFY</Btn>
            <Btn variant="ghost" onClick={() => { setLoginOpen(false); setPasscode('') }}>CANCEL</Btn>
          </div>
        </div>
      </Modal>
    </>
  )
}
