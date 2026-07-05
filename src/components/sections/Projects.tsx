'use client'
import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Plus, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useStore, Project } from '@/lib/store'
import { useReveal } from '@/lib/useReveal'
import Modal from '@/components/ui/Modal'

const ProjectForm = dynamic(() => import('./ProjectsForm'))

/* Small ambient diamond */
function Diamond({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none drift-particle" style={style}>
      <svg width="6" height="6" viewBox="0 0 6 6">
        <polygon points="3,0 6,3 3,6 0,3" fill="rgba(201,168,76,0.25)" />
      </svg>
    </div>
  )
}

function getImagePath(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('moviefo')) return '/images/moviefo.png';
  if (t.includes('moody')) return '/images/moody_chatbot.png';
  if (t.includes('flappy')) return '/images/flappy_bird_rl.png';
  if (t.includes('sentiment')) return '/images/sentiment_analyzer.png';
  return '/images/moviefo.png';
}

const ProjectCard = React.memo(function ProjectCard({ p, i, onEdit, onDelete }: {
  p: Project; i: number; onEdit: () => void; onDelete: () => void
}) {
  const { isAdmin } = useStore()
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasOverflow, setHasOverflow] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = textRef.current
    if (!el) return

    const checkOverflow = () => {
      if (!isExpanded) {
        setHasOverflow(el.scrollHeight > el.clientHeight)
      }
    }

    const timer = setTimeout(checkOverflow, 100)
    window.addEventListener('resize', checkOverflow)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkOverflow)
    }
  }, [p.description, isExpanded])

  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.65, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="glass glass-hover border-pulse relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-gold/[0.02] flex flex-col h-full"
      style={{ borderRadius: '12px' }}
    >
      {/* Project Image Header */}
      <div className="relative h-40 w-full overflow-hidden bg-void/50 shrink-0">
        <img
          src={p.image || getImagePath(p.title)}
          alt={p.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ filter: 'brightness(0.8) contrast(1.05) saturate(0.9)' }}
        />
        {/* Subtle gold overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Scan line on hover */}
      <div className="scan-line opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* BG index number */}
      <div className="absolute -right-3 -bottom-5 font-display leading-none font-bold pointer-events-none select-none"
        style={{ fontSize: '6rem', color: 'rgba(201,168,76,0.015)' }}>
        {String(i + 1).padStart(2, '0')}
      </div>

      <div className="p-6 relative flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4 gap-4">
          <div>
            <p className="label text-gold/65 mb-1.5" style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>{p.category} · {p.year}</p>
            <h3 className="font-display text-xl text-ivory tracking-wide leading-snug">{p.title}</h3>
          </div>
          {p.featured && (
            <span className="label text-void bg-gold px-2.5 py-1 shrink-0 rounded-sm font-semibold" style={{ fontSize: '0.58rem', letterSpacing: '0.1em' }}>FEATURED</span>
          )}
        </div>

        <div className="gold-line mb-4 opacity-50" />

        <p
          ref={textRef}
          className={`text-xs text-mist leading-relaxed flex-1 ${isExpanded ? '' : 'line-clamp-4'} ${hasOverflow ? 'mb-1' : 'mb-4'}`}
        >
          {p.description}
        </p>

        {hasOverflow && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[0.68rem] text-gold/75 hover:text-gold font-mono tracking-widest mb-4 mt-1 transition-colors self-start cursor-pointer"
          >
            {isExpanded ? 'READ LESS ▲' : 'READ MORE ▼'}
          </button>
        )}

        <div className="flex flex-wrap gap-1.5 mb-5 shrink-0">
          {p.tags.map(t => (
            <span key={t} className="text-[0.65rem] text-mist border border-gold/10 bg-obsidian/45 px-2 py-0.5 rounded-full" style={{ letterSpacing: '0.05em' }}>{t}</span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 shrink-0">
          <div className="flex gap-4">
            {p.github && <a href={p.github} target="_blank" className="text-mist hover:text-gold transition-colors duration-300"><Github size={15} /></a>}
            {p.live   && <a href={p.live}   target="_blank" className="text-mist hover:text-gold transition-colors duration-300"><ExternalLink size={15} /></a>}
          </div>
          {isAdmin && (
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button onClick={onEdit}   className="label text-gold/65 hover:text-gold flex items-center gap-1 transition-colors" style={{ fontSize: '0.58rem' }}><Pencil size={11} /> Edit</button>
              <button onClick={onDelete} className="label text-red-400/55 hover:text-red-400 flex items-center gap-1 transition-colors" style={{ fontSize: '0.58rem' }}><Trash2 size={11} /> Delete</button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
})

export default function Projects() {
  const { projects, addProject, updateProject, deleteProject, isAdmin } = useStore()
  const [addOpen, setAddOpen] = useState(false)
  const [editing, setEditing] = useState<Project|null>(null)
  const headRef = useReveal()

  return (
    <section id="projects" className="py-24 md:py-36 px-4 sm:px-8 relative overflow-hidden">
      {/* Ambient bg orb */}
      <div className="orb-a absolute -top-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04), transparent 70%)' }} />
      <Diamond style={{ top: '10%', right: '5%', '--dur':'11s','--delay':'1s' } as any} />
      <Diamond style={{ top: '60%', right: '3%', '--dur':'8s','--delay':'3s' } as any} />
      <Diamond style={{ bottom: '15%', left: '4%', '--dur':'13s','--delay':'0.5s' } as any} />

      <div className="max-w-7xl mx-auto relative">
        <div className="section-divider mb-4" />
        <div ref={headRef} className="reveal flex items-end justify-between mb-6 pb-7 border-b border-gold/10">
          <div>
            <p className="section-number mb-4">01 — Selected Work</p>
            <h2 className="display-lg text-ivory">Projects</h2>
          </div>
          {isAdmin && (
            <button onClick={() => setAddOpen(true)}
              className="label text-gold/65 hover:text-gold border border-gold/20 hover:border-gold/50 px-6 py-3 flex items-center gap-2 transition-all duration-300" style={{ fontSize: '0.73rem' }}>
              <Plus size={14} /> ADD PROJECT
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {projects.map((p, i) => (
              <ProjectCard key={p.id} p={p} i={i}
                onEdit={() => setEditing(p)}
                onDelete={() => { deleteProject(p.id); toast.success('Project removed') }} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="NEW PROJECT">
        <ProjectForm onSave={d => { addProject(d); toast.success('Project added') }} onClose={() => setAddOpen(false)} />
      </Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title="EDIT PROJECT">
        {editing && <ProjectForm initial={editing} onSave={d => { updateProject(editing.id, d); toast.success('Updated') }} onClose={() => setEditing(null)} />}
      </Modal>
    </section>
  )
}
