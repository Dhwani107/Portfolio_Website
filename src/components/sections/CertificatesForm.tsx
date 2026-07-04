'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Certificate } from '@/lib/store'
import { Field, Btn } from '@/components/ui/Modal'

export default function CertForm({ initial, onSave, onClose }: { initial?: Certificate; onSave: (d: Omit<Certificate,'id'>) => void; onClose: () => void }) {
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
