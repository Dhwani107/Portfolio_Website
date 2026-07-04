'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Github, Linkedin, Mail, Phone, ArrowUpRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { useReveal } from '@/lib/useReveal'

const SOCIALS = [
  { Icon: Github,   label:'GitHub',   href:'https://github.com/Dhwani107',                          sub:'github.com/Dhwani107'             },
  { Icon: Linkedin, label:'LinkedIn', href:'https://www.linkedin.com/in/dhwani-chauhan-aaa5ab280/', sub:'/dhwani-chauhan-aaa5ab280'        },
  { Icon: Mail,     label:'Email',    href:'mailto:dhwanichauhan1072004@gmail.com',                 sub:'dhwanichauhan1072004@gmail.com'   },
  { Icon: Phone,    label:'Phone',    href:'tel:+919674310xxx',                                     sub:'+91 96743 10xxx'                  },
]

function Brackets({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-1">
      <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/35" />
      <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold/35" />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold/35" />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/35" />
      {children}
    </div>
  )
}

export default function Contact() {
  const [f, setF]           = useState({ name:'', email:'', message:'' })
  const [loading, setLoading] = useState(false)
  const headRef  = useReveal()
  const leftRef  = useReveal<HTMLDivElement>()
  const rightRef = useReveal<HTMLDivElement>()

  const submit = async () => {
    if (!f.name || !f.email || !f.message) return toast.error('All fields required')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    toast.success("Message sent — Dhwani will be in touch!")
    setF({ name:'', email:'', message:'' })
  }

  return (
    <section id="contact" className="py-24 md:py-36 px-4 sm:px-8 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] rounded-full pointer-events-none"
        style={{ background:'radial-gradient(ellipse, rgba(201,168,76,0.06), transparent 70%)', filter:'blur(40px)' }} />
      <div className="parallax-float absolute top-20 right-16 w-px h-56 pointer-events-none"
        style={{ background:'linear-gradient(to bottom, transparent, rgba(201,168,76,0.18), transparent)' }} />
      <div className="parallax-float absolute bottom-20 left-16 w-px h-56 pointer-events-none"
        style={{ background:'linear-gradient(to bottom, transparent, rgba(201,168,76,0.12), transparent)', animationDelay:'-8s' }} />

      <div className="max-w-5xl mx-auto relative">
        <div className="section-divider mb-4" />
        <div ref={headRef} className="reveal mb-20 pb-7 border-b border-gold/10">
          <p className="section-number mb-4">06 — Get In Touch</p>
          <h2 className="display-lg text-ivory">Let&apos;s Work<br/><span className="gold-shimmer">Together</span></h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
          <div ref={leftRef} className="reveal-left">
            <p className="body-lg leading-relaxed mb-12" style={{ color:'#C0C0D4', fontSize:'1.1rem' }}>
              I&apos;m actively looking for AI/ML engineering roles, data science internships, and exciting
              collaborations. If you&apos;re building something in Generative AI, LLMs, or intelligent systems
              — let&apos;s talk!
            </p>
            <div className="space-y-1">
              {SOCIALS.map(({ Icon, label, href, sub }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between py-5 border-b border-gold/8 group hover:border-gold/30 transition-all duration-300">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 border border-gold/18 flex items-center justify-center group-hover:border-gold/50 transition-colors">
                      <Icon size={15} className="text-mist group-hover:text-gold transition-colors" />
                    </div>
                    <div>
                      <p className="font-sans text-ivory" style={{ fontSize:'1rem', fontWeight:300 }}>{label}</p>
                      <p className="font-mono text-mist/55 mt-0.5" style={{ fontSize:'0.68rem' }}>{sub}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-mist/35 group-hover:text-gold transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-5 h-px bg-gold/30" />
              <p className="label text-mist/50" style={{ fontSize:'0.68rem' }}>KOLKATA, INDIA · OPEN TO REMOTE</p>
            </div>
          </div>

          <div ref={rightRef} className="reveal">
            <Brackets>
              <div className="p-8 flex flex-col gap-6">
                {[
                  { key:'name',    label:'FULL NAME',      type:'text',  ph:'Your name'         },
                  { key:'email',   label:'EMAIL ADDRESS',  type:'email', ph:'you@company.com'   },
                ].map(({ key, label, type, ph }) => (
                  <div key={key}>
                    <label className="label text-mist/65 block mb-3" style={{ fontSize:'0.7rem' }}>{label}</label>
                    <input type={type} className="field" value={(f as any)[key]}
                      onChange={e => setF(p => ({ ...p, [key]: e.target.value }))} placeholder={ph} />
                  </div>
                ))}
                <div>
                  <label className="label text-mist/65 block mb-3" style={{ fontSize:'0.7rem' }}>MESSAGE</label>
                  <textarea rows={5} className="field" value={f.message}
                    onChange={e => setF(p => ({ ...p, message: e.target.value }))}
                    placeholder="Tell me about your project, opportunity, or collaboration idea..." />
                </div>
                <motion.button onClick={submit} disabled={loading}
                  whileHover={{ scale:1.01 }} whileTap={{ scale:0.99 }}
                  className="mag-btn label text-void bg-gold w-full py-5 flex items-center justify-center gap-3 disabled:opacity-50"
                  style={{ fontSize:'0.78rem' }}>
                  {loading
                    ? <><span className="w-4 h-4 border border-void/25 border-t-void rounded-full animate-spin" /> SENDING...</>
                    : <><Send size={15} /> SEND MESSAGE</>}
                </motion.button>
                <p className="label text-mist/35 text-center" style={{ fontSize:'0.62rem' }}>
                  I typically respond within 24 hours.
                </p>
              </div>
            </Brackets>
          </div>
        </div>
      </div>
    </section>
  )
}
