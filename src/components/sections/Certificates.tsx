'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Pencil, Trash2, ExternalLink, Award, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useStore, Certificate } from '@/lib/store'
import { useReveal } from '@/lib/useReveal'
import Modal from '@/components/ui/Modal'

const CertForm = dynamic(() => import('./CertificatesForm'))

const CertCard = React.memo(function CertCard({ cert, i, onEdit, onDelete, onView }: { cert: Certificate; i: number; onEdit: () => void; onDelete: () => void; onView: () => void }) {
  const ref = useReveal()
  const { isAdmin } = useStore()

  const handleClick = () => {
    if (cert.url) {
      window.open(cert.url, '_blank', 'noopener,noreferrer')
    } else {
      onView()
    }
  }

  return (
    <motion.div ref={ref} onClick={handleClick} className="reveal glass glass-hover corner-tl p-7 group relative overflow-hidden cursor-pointer"
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
          <div className="flex items-center justify-between mt-4" onClick={e => e.stopPropagation()}>
            {cert.url
              ? <a href={cert.url} target="_blank" className="label text-gold/55 hover:text-gold flex items-center gap-1.5 transition-colors" style={{ fontSize: '0.67rem' }}><ExternalLink size={11} /> Verify</a>
              : <span />}
            {isAdmin && (
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={onEdit}   className="text-gold/40 hover:text-gold transition-colors"><Pencil size={12} /></button>
                <button onClick={onDelete} className="text-red-400/40 hover:text-red-400 transition-colors"><Trash2 size={12} /></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
})

export default function Certificates() {
  const { certificates, addCertificate, updateCertificate, deleteCertificate, isAdmin } = useStore()
  const [addOpen, setAddOpen] = useState(false)
  const [editing, setEditing] = useState<Certificate|null>(null)
  const [viewingImage, setViewingImage] = useState<string|null>(null)
  const [imageError, setImageError] = useState(false)
  const headRef = useReveal()

  return (
    <section id="certificates" className="py-24 md:py-36 px-4 sm:px-8 relative overflow-hidden">
      <div className="orb-b absolute -bottom-20 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04), transparent 70%)' }} />
      <div className="max-w-5xl mx-auto">
        <div className="section-divider mb-4" />
        <div ref={headRef} className="reveal flex items-end justify-between mb-6 pb-7 border-b border-gold/10">
          <div>
            <p className="section-number mb-4">05 — Credentials</p>
            <h2 className="display-lg text-ivory">Certificates</h2>
          </div>
          {isAdmin && (
            <button onClick={() => setAddOpen(true)}
              className="label text-gold/65 hover:text-gold border border-gold/20 hover:border-gold/50 px-6 py-3 flex items-center gap-2 transition-all duration-300" style={{ fontSize: '0.73rem' }}>
              <Plus size={14} /> ADD
            </button>
          )}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {certificates.map((c, i) => (
              <CertCard
                key={c.id}
                cert={c}
                i={i}
                onEdit={() => setEditing(c)}
                onDelete={() => { deleteCertificate(c.id); toast.success('Removed') }}
                onView={() => { setImageError(false); setViewingImage(`/images/${c.title}.png`); }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="NEW CERTIFICATE"><CertForm onSave={d => { addCertificate(d); toast.success('Added') }} onClose={() => setAddOpen(false)} /></Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title="EDIT CERTIFICATE">{editing && <CertForm initial={editing} onSave={d => { updateCertificate(editing.id, d); toast.success('Updated') }} onClose={() => setEditing(null)} />}</Modal>

      <AnimatePresence>
        {viewingImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setViewingImage(null); setImageError(false); }}
            className="fixed inset-0 z-[10000] bg-void/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              className="relative max-w-4xl max-h-[85vh] flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => { setViewingImage(null); setImageError(false); }}
                className="absolute -top-14 right-0 md:-right-14 text-mist hover:text-ivory p-2.5 bg-obsidian/80 border border-gold/15 hover:border-gold/40 rounded-full transition-all duration-300"
              >
                <X size={20} />
              </button>
              
              {imageError ? (
                <div className="w-[500px] max-w-full aspect-[4/3] bg-obsidian border border-gold/20 flex flex-col items-center justify-center p-8 text-center gap-4">
                  <Award size={48} className="text-gold/40 animate-pulse" />
                  <h4 className="font-sans text-ivory text-lg font-light">Certificate Image Not Found</h4>
                  <p className="font-sans text-mist text-xs leading-relaxed max-w-xs">
                    Please place the certificate image file in your project folder under:<br />
                    <code className="text-gold bg-gold/5 px-1.5 py-0.5 rounded font-mono text-[0.75rem] block mt-2 whitespace-pre-wrap select-all">public/images/{decodeURIComponent(viewingImage.split('/').pop() || '')}</code>
                  </p>
                </div>
              ) : (
                <img
                  src={viewingImage}
                  alt="Certificate"
                  className="max-w-full max-h-[80vh] object-contain border border-gold/20 shadow-2xl"
                  onError={() => setImageError(true)}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
