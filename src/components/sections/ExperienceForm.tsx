'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { WorkExperience } from '@/lib/store'
import { Field, Btn } from '@/components/ui/Modal'

export default function ExpForm({ initial, onSave, onClose }: { initial?: WorkExperience; onSave: (d: Omit<WorkExperience,'id'>) => void; onClose: () => void }) {
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
