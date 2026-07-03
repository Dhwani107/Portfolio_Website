'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore, Skill } from '@/lib/store'
import { useReveal } from '@/lib/useReveal'
import Modal, { Field, Btn } from '@/components/ui/Modal'
import {
  Brain,
  Cpu,
  Network,
  Sparkles,
  Sliders,
  Activity,
  Layers,
  Bot,
  MessageSquare,
  Database,
  Eye,
  Lightbulb,
  Users,
  Clock,
  Edit3,
  LineChart,
  Code,
  Plus,
  Pencil,
  Trash2
} from 'lucide-react'
import toast from 'react-hot-toast'

const CATS = [
  "Programming Languages",
  "Machine Learning & Data Science",
  "Deep Learning",
  "Generative AI & LLMs",
  "AI Domains",
  "Frameworks & Web Technologies",
  "Databases & Tools",
  "Visualization & BI Tools",
  "Design Tools",
  "Soft Skills"
] as const;

function getSkillIcon(name: string): { slug?: string; lucideIcon?: any } {
  const n = name.toLowerCase().trim();
  
  // Simple Icons slugs mapping
  if (n === 'python') return { slug: 'python' };
  if (n === 'c++') return { slug: 'cplusplus' };
  if (n === 'numpy') return { slug: 'numpy' };
  if (n === 'pandas') return { slug: 'pandas' };
  if (n === 'scikit-learn') return { slug: 'scikitlearn' };
  if (n === 'matplotlib') return { slug: 'matplotlib' };
  if (n === 'tensorflow') return { slug: 'tensorflow' };
  if (n === 'pytorch') return { slug: 'pytorch' };
  if (n === 'langchain') return { slug: 'langchain' };
  if (n === 'openai api' || n === 'openai') return { slug: 'openai' };
  if (n === 'mistral ai' || n === 'mistral') return { slug: 'mistralai' };
  if (n === 'flask') return { slug: 'flask' };
  if (n === 'streamlit') return { slug: 'streamlit' };
  if (n === 'mysql') return { slug: 'mysql' };
  if (n === 'mongodb') return { slug: 'mongodb' };
  if (n === 'git') return { slug: 'git' };
  if (n === 'github') return { slug: 'github' };
  if (n === 'jupyter notebook' || n === 'jupyter') return { slug: 'jupyter' };
  if (n === 'vs code' || n === 'visual studio code') return { slug: 'visualstudiocode' };
  if (n === 'power bi') return { slug: 'powerbi' };
  if (n === 'tableau') return { slug: 'tableau' };
  if (n === 'excel' || n === 'microsoft excel') return { slug: 'microsoftexcel' };
  if (n === 'canva') return { slug: 'canva' };
  if (n === 'figma') return { slug: 'figma' };

  // Lucide icons mapping
  if (n.includes('seaborn')) return { lucideIcon: LineChart };
  if (n.includes('feature engineering')) return { lucideIcon: Sliders };
  if (n.includes('model training')) return { lucideIcon: Activity };
  if (n === 'ann' || n === 'rnn') return { lucideIcon: Layers };
  if (n === 'cnn') return { lucideIcon: Eye };
  if (n.includes('neural network')) return { lucideIcon: Network };
  if (n.includes('generative ai')) return { lucideIcon: Sparkles };
  if (n === 'llm' || n === 'llms') return { lucideIcon: MessageSquare };
  if (n === 'rag') return { lucideIcon: Database };
  if (n.includes('agentic')) return { lucideIcon: Bot };
  if (n.includes('natural language processing') || n === 'nlp') return { lucideIcon: Brain };
  if (n.includes('computer vision')) return { lucideIcon: Eye };
  
  // Soft skills mapping
  if (n.includes('problem solving')) return { lucideIcon: Lightbulb };
  if (n.includes('analytical')) return { lucideIcon: Brain };
  if (n.includes('leadership')) return { lucideIcon: Users };
  if (n.includes('communication')) return { lucideIcon: MessageSquare };
  if (n.includes('time management')) return { lucideIcon: Clock };
  if (n.includes('content writing') || n.includes('writing') || n.includes('blog')) return { lucideIcon: Edit3 };

  // Default fallback if no match
  return { lucideIcon: Code };
}

function SkillForm({ initial, onSave, onClose }: { initial?: Skill; onSave: (d: Omit<Skill,'id'>) => void; onClose: () => void }) {
  const [f, setF] = useState({ name: initial?.name??'', category: initial?.category??CATS[0] as string, level: initial?.level??80, color: initial?.color??'#C9A84C' })
  return (
    <div className="flex flex-col gap-5">
      <Field label="SKILL NAME *">
        <input className="field" value={f.name} onChange={e=>setF(p=>({...p,name:e.target.value}))} placeholder="e.g. PyTorch" />
      </Field>
      <Field label="CATEGORY">
        <select className="field" value={f.category} onChange={e=>setF(p=>({...p,category:e.target.value}))}>
          {CATS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>
      <div className="flex gap-3 pt-3 border-t border-gold/10">
        <Btn onClick={()=>{ if(!f.name){toast.error('Name required');return} onSave(f);onClose() }}>{initial?'UPDATE SKILL':'ADD SKILL'}</Btn>
        <Btn variant="ghost" onClick={onClose}>CANCEL</Btn>
      </div>
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 8 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 }
  }
}

export default function Skills() {
  const { skills, addSkill, updateSkill, deleteSkill, isAdmin } = useStore()
  const [addOpen, setAddOpen] = useState(false)
  const [editing, setEditing] = useState<Skill|null>(null)
  const headRef = useReveal()

  return (
    <section id="skills" className="py-36 px-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(28,28,40,0.45), transparent)' }}>
      
      {/* Ambient orb */}
      <div className="orb-b absolute -bottom-32 -left-32 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05), transparent 70%)' }} />

      <div className="max-w-6xl mx-auto relative">
        <div className="section-divider mb-4" />
        <div ref={headRef} className="reveal flex items-end justify-between mb-12 pb-7 border-b border-gold/10">
          <div>
            <p className="section-number mb-4">02 — Expertise</p>
            <h2 className="display-lg text-ivory">Skills</h2>
          </div>
          {isAdmin && (
            <button onClick={() => setAddOpen(true)}
              className="label text-gold/65 hover:text-gold border border-gold/20 hover:border-gold/50 px-6 py-3 flex items-center gap-2 transition-all duration-300 rounded-sm" style={{ fontSize: '0.73rem' }}>
              <Plus size={14} /> ADD SKILL
            </button>
          )}
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATS.map((cat, i) => {
            const filtered = skills.filter(s => s.category === cat)
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className="glass p-6 rounded-xl border border-gold/10 hover:border-gold/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 relative group overflow-hidden flex flex-col"
              >
                {/* Card top shimmer line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                {/* Stardust fireflies floating upward on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none z-0">
                  <div className="absolute w-1 h-1 bg-gold/50 rounded-full blur-[0.5px] top-[45%] left-[18%] animate-stardust-1" />
                  <div className="absolute w-1.5 h-1.5 bg-gold/40 rounded-full blur-[0.5px] top-[75%] left-[62%] animate-stardust-2" />
                  <div className="absolute w-1 h-1 bg-gold/60 rounded-full blur-[0.5px] top-[20%] left-[82%] animate-stardust-3" />
                </div>
                
                <h3 className="label text-gold mb-5 tracking-widest font-semibold flex items-center gap-2 relative z-10" style={{ fontSize: '0.78rem' }}>
                  <span className="w-1.5 h-1.5 bg-gold rounded-full inline-block shrink-0 group-hover:scale-125 transition-transform" />
                  {cat}
                </h3>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2.5 content-start flex-1 relative z-10"
                >
                  {filtered.length === 0 ? (
                    <span className="text-[0.7rem] text-mist/40 italic py-2">No skills added yet</span>
                  ) : (
                    filtered.map(s => {
                      const { slug, lucideIcon } = getSkillIcon(s.name);
                      const LucideIconComp = lucideIcon || Code;
                      return (
                        <motion.div
                          key={s.id}
                          variants={itemVariants}
                          className="flex items-center gap-2.5 px-3.5 py-1.5 bg-obsidian/45 border border-gold/8 rounded-full hover:border-gold/40 hover:bg-gold/8 transition-all duration-300 group/pill cursor-default"
                        >
                          {slug ? (
                            <span
                              className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover/pill:scale-110 group-hover/pill:rotate-3"
                              style={{
                                backgroundColor: '#C9A84C',
                                mask: `url(https://cdn.jsdelivr.net/npm/simple-icons/icons/${slug}.svg) no-repeat center`,
                                WebkitMask: `url(https://cdn.jsdelivr.net/npm/simple-icons/icons/${slug}.svg) no-repeat center`,
                                maskSize: 'contain',
                                WebkitMaskSize: 'contain',
                                display: 'inline-block'
                              }}
                            />
                          ) : (
                            <LucideIconComp size={13} className="text-gold shrink-0 transition-transform duration-300 group-hover/pill:scale-110 group-hover/pill:rotate-3" />
                          )}
                          <span className="text-xs text-mist group-hover/pill:text-ivory transition-colors font-sans font-normal" style={{ fontSize: '0.74rem' }}>{s.name}</span>
                          
                          {/* Actions inside the pill */}
                          {isAdmin && (
                            <div className="flex gap-1.5 opacity-0 group-hover/pill:opacity-100 transition-opacity ml-1 shrink-0">
                              <button onClick={() => setEditing(s)} className="text-gold/45 hover:text-gold transition-colors"><Pencil size={10} /></button>
                              <button onClick={() => { deleteSkill(s.id); toast.success('Skill removed') }} className="text-red-400/40 hover:text-red-400 transition-colors"><Trash2 size={10} /></button>
                            </div>
                          )}
                        </motion.div>
                      )
                    })
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="NEW SKILL">
        <SkillForm onSave={d => { addSkill(d); toast.success('Skill added') }} onClose={() => setAddOpen(false)} />
      </Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title="EDIT SKILL">
        {editing && <SkillForm initial={editing} onSave={d => { updateSkill(editing.id, d); toast.success('Updated') }} onClose={() => setEditing(null)} />}
      </Modal>
    </section>
  )
}
