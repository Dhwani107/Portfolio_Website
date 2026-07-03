'use client'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'

const HeroScene = dynamic(() => import('../3d/HeroScene'), { ssr: false })

const ROLES = [
  'AI / ML Engineer',
  'LLM Application Builder',
  'Generative AI Developer',
  'RAG & Agentic AI Explorer',
  'NLP & Deep Learning Enthusiast',
]

function FloatDiamond({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none drift-particle" style={style}>
      <svg width="8" height="8" viewBox="0 0 8 8">
        <polygon points="4,0 8,4 4,8 0,4" fill="rgba(201,168,76,0.35)" />
      </svg>
    </div>
  )
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [text, setText]       = useState('')
  const [typing, setTyping]   = useState(true)

  useEffect(() => {
    const role = ROLES[roleIdx]
    if (typing) {
      if (text.length < role.length) {
        const t = setTimeout(() => setText(role.slice(0, text.length + 1)), 65)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2400)
        return () => clearTimeout(t)
      }
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(t => t.slice(0, -1)), 32)
        return () => clearTimeout(t)
      } else { setRoleIdx(i => (i + 1) % ROLES.length); setTyping(true) }
    }
  }, [text, typing, roleIdx])

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.13 } } }
  const word    = {
    hidden: { y: 90, opacity: 0 },
    show:   { y: 0, opacity: 1, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <HeroScene />
      <div className="scan-line" />

      {/* Gradient masks */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(110deg, rgba(5,5,7,0.95) 0%, rgba(5,5,7,0.65) 55%, rgba(5,5,7,0.05) 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-40 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #050507, transparent)' }} />

      {/* Floating diamonds */}
      <FloatDiamond style={{ top: '18%', left: '8%',  '--dur':'9s',  '--delay':'0s'  } as any} />
      <FloatDiamond style={{ top: '65%', left: '12%', '--dur':'11s', '--delay':'2s'  } as any} />
      <FloatDiamond style={{ top: '30%', left: '5%',  '--dur':'7s',  '--delay':'4s'  } as any} />

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-28 pb-20 w-full">

        {/* Portfolio badge */}
        <motion.div initial={{ opacity:0, x:-24 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.9, delay:0.3 }}
          className="flex items-center gap-4 mb-12">
          <div className="w-10 h-px" style={{ background:'linear-gradient(90deg, var(--gold), transparent)' }} />
          <span className="label text-gold" style={{ fontSize:'0.8rem' }}>AI ENGINEER · PORTFOLIO 2025</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
        </motion.div>

        {/* Staggered headline */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="mb-8">
          {[
            ["Hey, I'm",   'text-ivory'],
            ['Dhwani',     'gold-shimmer'],
            ['Chauhan.',   'text-ivory'],
          ].map(([line, cls]) => (
            <div key={line} className="overflow-hidden">
              <motion.p variants={word} className={`display-xl ${cls}`}>{line}</motion.p>
            </div>
          ))}
        </motion.div>

        {/* Typewriter */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.3, duration:0.7 }}
          className="flex items-center gap-3 mb-12">
          <span className="label text-gold/60" style={{ fontSize:'0.78rem' }}>I build:</span>
          <span className="font-sans text-ivory" style={{ fontSize:'1.1rem', fontWeight:300, letterSpacing:'0.02em' }}>
            {text}
            <span className="inline-block w-0.5 h-5 bg-gold ml-1 animate-pulse align-middle" />
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.5, duration:0.9 }}
          className="max-w-2xl body-lg mb-14" style={{ color:'#B0B0C8' }}>
          AI engineer with hands-on experience building LLM applications using LangChain and RAG pipelines.
          Delivered live projects in conversational AI and structured data extraction. Currently exploring
          Agentic AI — focused on building intelligent systems that go from idea to deployment.
        </motion.p>

        {/* Stats */}
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.7 }}
          className="flex flex-wrap gap-12 mb-16">
          {[
            ['4+',    'AI/ML Projects',        '0s'   ],
            ['3',     'IBM Certifications',     '0.15s'],
            ['8.576', 'GPA at TIU',             '0.3s' ],
            ['Top 30','SIH 2024 — 200+ Teams',  '0.45s'],
          ].map(([n, l, d]) => (
            <div key={l} className="stat-in" style={{ '--delay':d } as any}>
              <p className="font-display text-gold font-light italic"
                style={{ fontSize:'clamp(1.8rem,4vw,3rem)' }}>{n}</p>
              <p className="label text-mist mt-1" style={{ fontSize:'0.7rem' }}>{l}</p>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.9 }}
          className="flex flex-wrap gap-5 mb-12">
          <a href="#projects"
            className="mag-btn label text-void bg-gold px-10 py-5 inline-block"
            style={{ fontSize:'0.82rem' }}>VIEW MY WORK</a>
          <a href="#contact"
            className="label text-ivory border border-gold/30 hover:border-gold/60 px-10 py-5 inline-block transition-colors duration-300"
            style={{ fontSize:'0.82rem' }}>HIRE ME</a>
        </motion.div>

        {/* Socials */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.1 }}
          className="flex gap-5">
          {[
            { Icon: Github,   href:'https://github.com/Dhwani107',                                   label:'GitHub'   },
            { Icon: Linkedin, href:'https://www.linkedin.com/in/dhwani-chauhan-aaa5ab280/',          label:'LinkedIn' },
            { Icon: Mail,     href:'mailto:dhwanichauhan1072004@gmail.com',                          label:'Email'    },
          ].map(({ Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
              className="w-11 h-11 border border-gold/15 hover:border-gold/50 flex items-center justify-center text-mist hover:text-gold transition-all duration-300">
              <Icon size={16} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <motion.div animate={{ y:[0,7,0] }} transition={{ repeat:Infinity, duration:2.2, ease:'easeInOut' }}>
          <ArrowDown size={15} className="text-gold" />
        </motion.div>
        <span className="label" style={{ fontSize:'0.62rem', letterSpacing:'0.28em', color:'var(--mist)' }}>SCROLL</span>
      </motion.div>
    </section>
  )
}
