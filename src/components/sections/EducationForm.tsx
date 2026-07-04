'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Education } from '@/lib/store'
import { Field, Btn } from '@/components/ui/Modal'

export default function EduForm({ initial, onSave, onClose }: { initial?: Education; onSave: (d: Omit<Education,'id'>) => void; onClose: () => void }) {
  const [f, setF] = useState({ institution: initial?.institution??'', degree: initial?.degree??'', field: initial?.field??'', startYear: initial?.startYear??2020, endYear: String(initial?.endYear??'Present'), gpa: initial?.gpa??'', description: initial?.description??'' })
  return (
    <div className="flex flex-col gap-5">
      <Field label="INSTITUTION *"><input className="field" value={f.institution} onChange={e=>setF(p=>({...p,institution:e.target.value}))} placeholder="MIT" /></Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="DEGREE *"><input className="field" value={f.degree} onChange={e=>setF(p=>({...p,degree:e.target.value}))} placeholder="B.Sc." /></Field>
        <Field label="FIELD"><input className="field" value={f.field} onChange={e=>setF(p=>({...p,field:e.target.value}))} placeholder="Computer Science" /></Field>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Field label="START YEAR"><input type="number" className="field" value={f.startYear} onChange={e=>setF(p=>({...p,startYear:+e.target.value}))} /></Field>
        <Field label="END YEAR"><input className="field" value={f.endYear} onChange={e=>setF(p=>({...p,endYear:e.target.value}))} placeholder="2024 or Present" /></Field>
        <Field label="GPA"><input className="field" value={f.gpa} onChange={e=>setF(p=>({...p,gpa:e.target.value}))} placeholder="3.9" /></Field>
      </div>
      <Field label="DESCRIPTION"><textarea rows={2} className="field" value={f.description} onChange={e=>setF(p=>({...p,description:e.target.value}))} placeholder="Focus areas, honours..." /></Field>
      <div className="flex gap-3 pt-3 border-t border-gold/10">
        <Btn onClick={()=>{ if(!f.institution||!f.degree){toast.error('Required fields missing');return} onSave({...f,endYear:f.endYear==='Present'?'Present':+f.endYear});onClose() }}>{initial?'UPDATE':'ADD EDUCATION'}</Btn>
        <Btn variant="ghost" onClick={onClose}>CANCEL</Btn>
      </div>
    </div>
  )
}
