'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Pencil, Trash2, ExternalLink, Award } from 'lucide-react'
import toast from 'react-hot-toast'
import { useStore, Certificate } from '@/lib/store'
import { useReveal } from '@/lib/useReveal'
import Modal, { Field, Btn } from '@/components/ui/Modal'

function CertCard({ cert, i, onEdit, onDelete }: { cert: Certificate; i: number; onEdit: () => void; onDelete: () => void }) {
  const ref = useReveal()
  return (
    <motion.div ref={ref} className="reveal glass glass-hover corner-tl p-7 group relative overflow-hidden"
      style={{ borderRadius: '2px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Award size={90} className="absolute -right-5 -top-5 pointer-events-none" style={{ color: 'rgba(201,168,76,0.04)' }} />
      <div className="flex items-start gap-5">
        <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0 mt-1">
          <Award size={17} style={{ color: 'var(--gold)' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="label text-gold/55 mb-2" style={{ fontSize: '0.67rem' }}>{cert.issuer} · {cert.date}</p>
          <h3 className="font-sans text-ivory leading-snug mb-4" style={{ fontSize: '1rem', fontWeight: 300 }}>{cert.title}</h3>
          {cert.credentialId && <p className="font-mono text-mist/55" style={{ fontSize: '0.7rem' }}>ID: {cert.credentialId}</p>}
          <div className="flex items-center justify-between mt-4">
            {cert.url
              ? <a href={cert.url} target="_blank" className="label text-gold/55 hover:text-gold flex items-center gap-1.5 transition-colors" style={{ fontSize: '0.67rem' }}><ExternalLink size={11} /> Verify</a>
              : <span />}
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={onEdit}   className="text-gold/40 hover:text-gold transition-colors"><Pencil size={12} /></button>
              <button onClick={onDelete} className="text-red-400/40 hover:text-red-400 transition-colors"><Trash2 size={12} /></button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function CertForm({ initial, onSave, onClose }: { initial?: Certificate; onSave: (d: Omit<Certificate,'id'>) => void; onClose: () => void }) {
  const [f, setF] = useState({ title: initial?.title??'', issuer: initial?.issuer??'', date: initial?.date??'', credentialId: initial?.credentialId??'', url: initial?.url??'' })
  return (
    <div className="flex flex-col gap-5">
      {([['title','CERTIFICATE TITLE *'],['issuer','ISSUER *'],['date','DATE'],['credentialId','CREDENTIAL ID'],['url','VERIFY URL']] as const).map(([k,l])=>(
        <Field key={k} label={l}><input className="field" value={(f as any)[k]} onChange={e=>setF(p=>({...p,[k]:e.target.value}))} placeholder={k==='url'?'https://...':''} /></Field>
      ))}
      <div className="flex gap-3 pt-3 border-t border-gold/10">
        <Btn onClick={()=>{ if(!f.title||!f.issuer){toast.error('Title & issuer required');return} onSave(f);onClose() }}>{initial?'UPDATE':'ADD CERTIFICATE'}</Btn>
        <Btn variant="ghost" onClick={onClose}>CANCEL</Btn>
      </div>
    </div>
  )
}

export default function Certificates() {
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = useStore()
  const [addOpen, setAddOpen] = useState(false)
  const [editing, setEditing] = useState<Certificate|null>(null)
  const headRef = useReveal()

  return (
    <section id="certificates" className="py-36 px-8 relative overflow-hidden">
      <div className="orb-b absolute -bottom-20 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04), transparent 70%)' }} />
      <div className="max-w-5xl mx-auto">
        <div className="section-divider mb-4" />
        <div ref={headRef} className="reveal flex items-end justify-between mb-6 pb-7 border-b border-gold/10">
          <div>
            <p className="section-number mb-4">05 — Credentials</p>
            <h2 className="display-lg text-ivory">Certificates</h2>
          </div>
          <button onClick={() => setAddOpen(true)}
            className="label text-gold/65 hover:text-gold border border-gold/20 hover:border-gold/50 px-6 py-3 flex items-center gap-2 transition-all duration-300" style={{ fontSize: '0.73rem' }}>
            <Plus size={14} /> ADD
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {certificates.map((c, i) => <CertCard key={c.id} cert={c} i={i} onEdit={() => setEditing(c)} onDelete={() => { deleteCertificate(c.id); toast.success('Removed') }} />)}
          </AnimatePresence>
        </div>
      </div>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="NEW CERTIFICATE"><CertForm onSave={d => { addCertificate(d); toast.success('Added') }} onClose={() => setAddOpen(false)} /></Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title="EDIT CERTIFICATE">{editing && <CertForm initial={editing} onSave={d => { updateCertificate(editing.id, d); toast.success('Updated') }} onClose={() => setEditing(null)} />}</Modal>
    </section>
  )
}
