'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Project } from '@/lib/store'
import { Field, Btn } from '@/components/ui/Modal'

export default function ProjectForm({ initial, onSave, onClose }: { initial?: Project; onSave: (d: Omit<Project,'id'>) => void; onClose: () => void }) {
  const [f, setF] = useState({ title: initial?.title??'', category: initial?.category??'Web Application', year: initial?.year??new Date().getFullYear(), description: initial?.description??'', tags: initial?.tags.join(', ')??'', github: initial?.github??'', live: initial?.live??'', featured: initial?.featured??false, index: initial?.index??0, image: initial?.image??'' })
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="TITLE *"><input className="field" value={f.title} onChange={e=>setF(p=>({...p,title:e.target.value}))} placeholder="Project name" /></Field>
        <Field label="CATEGORY"><input className="field" value={f.category} onChange={e=>setF(p=>({...p,category:e.target.value}))} placeholder="Web Application" /></Field>
      </div>
      <Field label="DESCRIPTION"><textarea rows={3} className="field" value={f.description} onChange={e=>setF(p=>({...p,description:e.target.value}))} placeholder="What makes it remarkable?" /></Field>
      <Field label="TECH STACK (COMMA SEPARATED)"><input className="field" value={f.tags} onChange={e=>setF(p=>({...p,tags:e.target.value}))} placeholder="React, TypeScript, Node.js" /></Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="GITHUB URL"><input className="field" value={f.github} onChange={e=>setF(p=>({...p,github:e.target.value}))} /></Field>
        <Field label="LIVE URL"><input className="field" value={f.live} onChange={e=>setF(p=>({...p,live:e.target.value}))} /></Field>
      </div>
      <Field label="IMAGE LINK"><input className="field" value={f.image} onChange={e=>setF(p=>({...p,image:e.target.value}))} placeholder="e.g. /images/moviefo.png or external https://..." /></Field>
      <div className="flex items-center gap-3">
        <button onClick={()=>setF(p=>({...p,featured:!p.featured}))}
          className={`w-10 h-5 rounded-full border transition-all duration-300 relative ${f.featured?'bg-gold border-gold':'bg-transparent border-gold/25'}`}>
          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-void transition-all duration-300 ${f.featured?'left-5':'left-0.5'}`} />
        </button>
        <span className="label text-mist" style={{ fontSize: '0.68rem' }}>FEATURED PROJECT</span>
      </div>
      <div className="flex gap-3 pt-3 border-t border-gold/10">
        <Btn onClick={()=>{ if(!f.title){toast.error('Title required');return} onSave({...f,tags:f.tags.split(',').map(t=>t.trim()).filter(Boolean)});onClose() }}>{initial?'UPDATE PROJECT':'ADD PROJECT'}</Btn>
        <Btn variant="ghost" onClick={onClose}>CANCEL</Btn>
      </div>
    </div>
  )
}
