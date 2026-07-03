'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useStore, WorkExperience } from '@/lib/store'
import { useReveal } from '@/lib/useReveal'
import Modal, { Field, Btn } from '@/components/ui/Modal'

function ExpItem({ exp, i, onEdit, onDelete }: { exp: WorkExperience; i: number; onEdit: () => void; onDelete: () => void }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal grid md:grid-cols-[220px_1fr] gap-10 py-12 border-b border-gold/8 group">
      <div>
        <p className="label text-gold/55 mb-2" style={{ fontSize: '0.68rem' }}>{exp.startDate} — {exp.endDate}</p>
        <p className="label text-mist mt-4" style={{ fontSize: '0.7rem' }}>{exp.company}</p>
      </div>
      <div className="relative pl-9 before:absolute before:left-0 before:top-2.5 before:w-2.5 before:h-2.5 before:rounded-full before:bg-gold"
        style={{ '--tw-shadow': '0 0 10px rgba(201,168,76,0.5)' } as any}>
        <div className="flex items-start justify-between gap-4">
          <h3 className="display-md text-ivory mb-5">{exp.role}</h3>
          <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button onClick={onEdit}   className="text-gold/40 hover:text-gold transition-colors p-1"><Pencil size={14} /></button>
            <button onClick={onDelete} className="text-red-400/40 hover:text-red-400 transition-colors p-1"><Trash2 size={14} /></button>
          </div>
        </div>
        <p className="body-sm mb-7 leading-relaxed">{exp.description}</p>
        <div className="flex flex-wrap gap-2">
          {exp.technologies.map(t => (
            <span key={t} className="label text-gold/55 border border-gold/18 px-3 py-1.5" style={{ fontSize: '0.68rem' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ExpForm({ initial, onSave, onClose }: { initial?: WorkExperience; onSave: (d: Omit<WorkExperience,'id'>) => void; onClose: () => void }) {
  const [f, setF] = useState({ company: initial?.company??'', role: initial?.role??'', startDate: initial?.startDate??'', endDate: String(initial?.endDate??'Present'), description: initial?.description??'', technologies: initial?.technologies.join(', ')??'' })
  return (
    <div className="flex flex-col gap-5">
      {([['company','COMPANY *','Acme Corp'],['role','ROLE *','Senior Engineer'],['startDate','START DATE','Jan 2022'],['endDate','END DATE','Dec 2023 or Present']] as const).map(([k,l,ph])=>(
        <Field key={k} label={l}><input className="field" value={(f as any)[k]} onChange={e=>setF(p=>({...p,[k]:e.target.value}))} placeholder={ph} /></Field>
      ))}
      <Field label="DESCRIPTION"><textarea rows={3} className="field" value={f.description} onChange={e=>setF(p=>({...p,description:e.target.value}))} placeholder="Key achievements and responsibilities" /></Field>
      <Field label="TECHNOLOGIES"><input className="field" value={f.technologies} onChange={e=>setF(p=>({...p,technologies:e.target.value}))} placeholder="React, Node.js, AWS" /></Field>
      <div className="flex gap-3 pt-3 border-t border-gold/10">
        <Btn onClick={()=>{ if(!f.company||!f.role){toast.error('Company & role required');return} onSave({...f,technologies:f.technologies.split(',').map(t=>t.trim()).filter(Boolean)});onClose() }}>{initial?'UPDATE':'ADD EXPERIENCE'}</Btn>
        <Btn variant="ghost" onClick={onClose}>CANCEL</Btn>
      </div>
    </div>
  )
}

export default function Experience() {
  const { experiences, addExperience, updateExperience, deleteExperience } = useStore()
  const [addOpen, setAddOpen] = useState(false)
  const [editing, setEditing] = useState<WorkExperience|null>(null)
  const headRef = useReveal()

  return (
    <section id="experience" className="py-36 px-8 relative overflow-hidden">
      {/* Parallax bg element */}
      <div className="parallax-float absolute top-20 right-8 w-px h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.15), transparent)' }} />
      <div className="parallax-float absolute bottom-20 left-8 w-px h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.1), transparent)', animationDelay: '-6s' }} />

      <div className="max-w-5xl mx-auto">
        <div className="section-divider mb-4" />
        <div ref={headRef} className="reveal flex items-end justify-between mb-6 pb-7 border-b border-gold/10">
          <div>
            <p className="section-number mb-4">03 — Career</p>
            <h2 className="display-lg text-ivory">Experience</h2>
          </div>
          <button onClick={() => setAddOpen(true)}
            className="label text-gold/65 hover:text-gold border border-gold/20 hover:border-gold/50 px-6 py-3 flex items-center gap-2 transition-all duration-300" style={{ fontSize: '0.73rem' }}>
            <Plus size={14} /> ADD
          </button>
        </div>
        <AnimatePresence>
          {experiences.map((exp, i) => (
            <ExpItem key={exp.id} exp={exp} i={i}
              onEdit={() => setEditing(exp)}
              onDelete={() => { deleteExperience(exp.id); toast.success('Removed') }} />
          ))}
        </AnimatePresence>
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="NEW EXPERIENCE">
        <ExpForm onSave={d => { addExperience(d); toast.success('Added') }} onClose={() => setAddOpen(false)} />
      </Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title="EDIT EXPERIENCE">
        {editing && <ExpForm initial={editing} onSave={d => { updateExperience(editing.id, d); toast.success('Updated') }} onClose={() => setEditing(null)} />}
      </Modal>
    </section>
  )
}
