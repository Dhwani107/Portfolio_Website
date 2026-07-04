'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useStore, Education } from '@/lib/store'
import { useReveal } from '@/lib/useReveal'
import Modal from '@/components/ui/Modal'

const EduForm = dynamic(() => import('./EducationForm'))

const EduRow = React.memo(function EduRow({ ed, onEdit, onDelete }: { ed: Education; onEdit: () => void; onDelete: () => void }) {
  const ref = useReveal()
  const { isAdmin } = useStore()
  return (
    <motion.div
      ref={ref}
      className="reveal relative group flex flex-col md:flex-row md:items-start gap-3 md:gap-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glowing Diamond node on the left border line */}
      <div className="absolute -left-[37px] md:-left-[53px] top-2.5 w-[9px] h-[9px] bg-void border border-gold rotate-45 flex items-center justify-center shrink-0">
        <div className="w-1.5 h-1.5 bg-gold rounded-full animate-ping absolute" />
        <div className="w-1 h-1 bg-gold rounded-full" />
      </div>

      {/* Date Column */}
      <div className="w-36 shrink-0 pt-0.5">
        <p className="label text-gold font-semibold tracking-widest" style={{ fontSize: '0.73rem' }}>
          {ed.startYear} — {ed.endYear}
        </p>
      </div>

      {/* Content details */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-2">
          <h3 className="font-display text-xl md:text-2xl text-ivory tracking-wide leading-tight">
            {ed.institution}
          </h3>
          
          {ed.gpa && (
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-gold/15 bg-gold/5 shrink-0 self-start sm:self-auto">
              <span className="text-[0.6rem] label text-gold/80 font-bold tracking-wider">GPA:</span>
              <span className="text-[0.78rem] font-display text-ivory font-semibold">{ed.gpa}</span>
            </div>
          )}
        </div>

        <p className="font-sans text-gold/75 mb-3 font-normal" style={{ fontSize: '0.88rem' }}>
          {ed.degree} · {ed.field}
        </p>
        
        {ed.description && (
          <p className="text-xs text-mist leading-relaxed max-w-3xl">
            {ed.description}
          </p>
        )}

        {/* Hover actions */}
        {isAdmin && (
          <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={onEdit} className="label text-gold/65 hover:text-gold flex items-center gap-1 transition-colors" style={{ fontSize: '0.58rem' }}>
              <Pencil size={11} /> Edit
            </button>
            <button onClick={onDelete} className="label text-red-400/55 hover:text-red-400 flex items-center gap-1 transition-colors" style={{ fontSize: '0.58rem' }}>
              <Trash2 size={11} /> Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
})

export default function Edu() {
  const { educations, addEducation, updateEducation, deleteEducation, isAdmin } = useStore()
  const [addOpen, setAddOpen] = useState(false)
  const [editing, setEditing] = useState<Education|null>(null)
  const headRef = useReveal()

  return (
    <section id="education" className="py-24 md:py-36 px-4 sm:px-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(28,28,40,0.4), transparent)' }}>
      
      {/* Background ambient light */}
      <div className="orb-a absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04), transparent 70%)' }} />
      
      <div className="max-w-4xl mx-auto">
        <div className="section-divider mb-4" />
        <div ref={headRef} className="reveal flex items-end justify-between mb-16 pb-7 border-b border-gold/10">
          <div>
            <p className="section-number mb-4">04 — Academic</p>
            <h2 className="display-lg text-ivory">Education</h2>
          </div>
          {isAdmin && (
            <button onClick={() => setAddOpen(true)}
              className="label text-gold/65 hover:text-gold border border-gold/20 hover:border-gold/50 px-6 py-3 flex items-center gap-2 transition-all duration-300 rounded-sm" style={{ fontSize: '0.73rem' }}>
              <Plus size={14} /> ADD
            </button>
          )}
        </div>

        {/* Vertical Timeline container */}
        <div className="relative pl-8 md:pl-12 border-l border-gold/15 flex flex-col gap-14">
          <AnimatePresence>
            {educations.map((ed, i) => (
              <EduRow
                key={ed.id}
                ed={ed}
                onEdit={() => setEditing(ed)}
                onDelete={() => { deleteEducation(ed.id); toast.success('Removed') }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="NEW EDUCATION">
        <EduForm onSave={d => { addEducation(d); toast.success('Added') }} onClose={() => setAddOpen(false)} />
      </Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title="EDIT EDUCATION">
        {editing && <EduForm initial={editing} onSave={d => { updateEducation(editing.id, d); toast.success('Updated') }} onClose={() => setEditing(null)} />}
      </Modal>
    </section>
  )
}
