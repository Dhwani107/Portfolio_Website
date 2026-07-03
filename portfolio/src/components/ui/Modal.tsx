'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { ReactNode } from 'react'

export default function Modal({ open, onClose, title, children }: {
  open: boolean; onClose: () => void; title: string; children: ReactNode
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="modal-overlay"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()} className="modal-box"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-gold/10">
              <div className="flex items-center gap-3">
                <div className="w-4 h-px bg-gold" />
                <h3 className="label text-gold">{title}</h3>
              </div>
              <button onClick={onClose} className="text-mist hover:text-ivory transition-colors p-1">
                <X size={16} />
              </button>
            </div>
            <div className="px-8 py-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div>
    <label className="label text-mist block mb-2 text-[0.65rem]">{label}</label>
    {children}
  </div>
)

export const Btn = ({ onClick, children, variant = 'primary' }: { onClick: () => void; children: ReactNode; variant?: 'primary' | 'ghost' }) => (
  <button onClick={onClick}
    className={`label px-6 py-3 transition-all duration-300 ${variant === 'primary' ? 'bg-gold text-void hover:bg-gold-light' : 'border border-gold/20 text-mist hover:text-ivory hover:border-gold/40'}`}>
    {children}
  </button>
)
