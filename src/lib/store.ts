import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Project {
  id: string; title: string; category: string; year: number
  description: string; tags: string[]; github?: string; live?: string
  featured: boolean; index: number; image?: string
}
export interface Skill {
  id: string; name: string; level: number
  category: string; color: string
}
export interface Education {
  id: string; institution: string; degree: string; field: string
  startYear: number; endYear: number | 'Present'; gpa?: string; description?: string
}
export interface Certificate {
  id: string; title: string; issuer: string; date: string
  credentialId?: string; url?: string
}
export interface WorkExperience {
  id: string; company: string; role: string; startDate: string
  endDate: string | 'Present'; description: string; technologies: string[]
}

const uid = () => Math.random().toString(36).slice(2, 11)

const defaultProjects: Project[] = [
  {
    id: uid(),
    title: 'MovieFo',
    category: 'Generative AI · LLM Application',
    year: 2025,
    description: 'AI-powered movie information extractor that converts unstructured movie descriptions into structured metadata — title, genre, cast, ratings, and summaries. Built an interactive Streamlit interface integrated with LangChain and Mistral AI for real-time structured response generation.',
    tags: ['Python', 'LangChain', 'Mistral AI', 'Streamlit', 'Pydantic'],
    github: 'https://github.com/Dhwani107/MovieFo',
    live: 'https://moviefo.streamlit.app/',
    featured: true,
    index: 0,
    image: '/images/moviefoo.png',
  },
  {
    id: uid(),
    title: 'Moody Chatbot',
    category: 'Conversational AI · RAG',
    year: 2025,
    description: 'Mood-based conversational AI chatbot generating responses in multiple emotional tones — cheerful, calm, playful, and intense. Implements both terminal and Streamlit web interfaces using LangChain LLM integrations and vector-based conversational workflows with FAISS.',
    tags: ['Python', 'LangChain', 'Mistral AI', 'FAISS', 'Streamlit'],
    github: 'https://github.com/Dhwani107/Moody_Chatbot',
    live: 'https://moodychatbot-bknrewlrteokopyeyp2mtc.streamlit.app/',
    featured: true,
    index: 1,
    image: '/images/moodychatbot.png',
  },
  {
    id: uid(),
    title: 'Flappy Bird RL Agent',
    category: 'Reinforcement Learning',
    year: 2025,
    description: 'Reinforcement learning agent trained to play Flappy Bird using Deep Q-Networks (DQN) with replay memory, epsilon-greedy exploration, and target networks. Includes model training, checkpoint saving, and human-playable modes for RL experimentation.',
    tags: ['Python', 'PyTorch', 'Gymnasium', 'DQN', 'Reinforcement Learning'],
    github: 'https://github.com/Dhwani107/Flappy_Bird_Game_Trained_on_Reinforcement_Learning',
    featured: false,
    index: 2,
    image: '/images/flappybird.png',
  },
  {
    id: uid(),
    title: 'IMDb Sentiment Analyzer',
    category: 'NLP · Web Application',
    year: 2024,
    description: 'Sentiment analysis web app classifying IMDb reviews as Positive, Neutral, or Negative using NLP techniques. Designed a lightweight, interpretable detection workflow for fast real-time text analysis without heavy ML overhead.',
    tags: ['Python', 'Flask', 'NLTK', 'Scikit-learn', 'NLP'],
    github: 'https://github.com/Dhwani107/IMDb_Review_Sentiment_Analysis',
    featured: false,
    index: 3,
    image: '/images/sentimentanalysis.png',
  },
]

const defaultSkills: Skill[] = [
  // Programming Languages
  { id: uid(), name: 'Python', level: 90, category: 'Programming Languages', color: '#C9A84C' },
  { id: uid(), name: 'C++', level: 75, category: 'Programming Languages', color: '#C9A84C' },

  // Machine Learning & Data Science
  { id: uid(), name: 'NumPy', level: 85, category: 'Machine Learning & Data Science', color: '#C9A84C' },
  { id: uid(), name: 'Pandas', level: 85, category: 'Machine Learning & Data Science', color: '#C9A84C' },
  { id: uid(), name: 'Scikit-learn', level: 80, category: 'Machine Learning & Data Science', color: '#C9A84C' },
  { id: uid(), name: 'Matplotlib', level: 78, category: 'Machine Learning & Data Science', color: '#C9A84C' },
  { id: uid(), name: 'Seaborn', level: 78, category: 'Machine Learning & Data Science', color: '#C9A84C' },
  { id: uid(), name: 'Feature Engineering', level: 80, category: 'Machine Learning & Data Science', color: '#C9A84C' },
  { id: uid(), name: 'Model Training & Testing', level: 82, category: 'Machine Learning & Data Science', color: '#C9A84C' },

  // Deep Learning
  { id: uid(), name: 'TensorFlow', level: 80, category: 'Deep Learning', color: '#C9A84C' },
  { id: uid(), name: 'PyTorch', level: 85, category: 'Deep Learning', color: '#C9A84C' },
  { id: uid(), name: 'ANN', level: 75, category: 'Deep Learning', color: '#C9A84C' },
  { id: uid(), name: 'CNN', level: 80, category: 'Deep Learning', color: '#C9A84C' },
  { id: uid(), name: 'RNN', level: 75, category: 'Deep Learning', color: '#C9A84C' },
  { id: uid(), name: 'Neural Networks', level: 80, category: 'Deep Learning', color: '#C9A84C' },

  // Generative AI & LLMs
  { id: uid(), name: 'Generative AI', level: 85, category: 'Generative AI & LLMs', color: '#C9A84C' },
  { id: uid(), name: 'LLMs', level: 88, category: 'Generative AI & LLMs', color: '#C9A84C' },
  { id: uid(), name: 'RAG', level: 85, category: 'Generative AI & LLMs', color: '#C9A84C' },
  { id: uid(), name: 'Agentic AI', level: 82, category: 'Generative AI & LLMs', color: '#C9A84C' },
  { id: uid(), name: 'LangChain', level: 85, category: 'Generative AI & LLMs', color: '#C9A84C' },
  { id: uid(), name: 'OpenAI API', level: 88, category: 'Generative AI & LLMs', color: '#C9A84C' },
  { id: uid(), name: 'Mistral AI', level: 80, category: 'Generative AI & LLMs', color: '#C9A84C' },

  // AI Domains
  { id: uid(), name: 'Natural Language Processing (NLP)', level: 85, category: 'AI Domains', color: '#C9A84C' },
  { id: uid(), name: 'Computer Vision', level: 75, category: 'AI Domains', color: '#C9A84C' },

  // Frameworks & Web Technologies
  { id: uid(), name: 'Flask', level: 78, category: 'Frameworks & Web Technologies', color: '#C9A84C' },
  { id: uid(), name: 'Streamlit', level: 82, category: 'Frameworks & Web Technologies', color: '#C9A84C' },

  // Databases & Tools
  { id: uid(), name: 'MySQL', level: 80, category: 'Databases & Tools', color: '#C9A84C' },
  { id: uid(), name: 'MongoDB', level: 75, category: 'Databases & Tools', color: '#C9A84C' },
  { id: uid(), name: 'Git', level: 85, category: 'Databases & Tools', color: '#C9A84C' },
  { id: uid(), name: 'GitHub', level: 85, category: 'Databases & Tools', color: '#C9A84C' },
  { id: uid(), name: 'Jupyter Notebook', level: 90, category: 'Databases & Tools', color: '#C9A84C' },
  { id: uid(), name: 'VS Code', level: 90, category: 'Databases & Tools', color: '#C9A84C' },

  // Visualization & BI Tools
  { id: uid(), name: 'Power BI', level: 78, category: 'Visualization & BI Tools', color: '#C9A84C' },
  { id: uid(), name: 'Tableau', level: 75, category: 'Visualization & BI Tools', color: '#C9A84C' },
  { id: uid(), name: 'Excel', level: 85, category: 'Visualization & BI Tools', color: '#C9A84C' },

  // Design Tools
  { id: uid(), name: 'Canva', level: 80, category: 'Design Tools', color: '#C9A84C' },
  { id: uid(), name: 'Figma', level: 78, category: 'Design Tools', color: '#C9A84C' },

  // Soft Skills
  { id: uid(), name: 'Problem Solving', level: 90, category: 'Soft Skills', color: '#C9A84C' },
  { id: uid(), name: 'Analytical Thinking', level: 88, category: 'Soft Skills', color: '#C9A84C' },
  { id: uid(), name: 'Leadership', level: 85, category: 'Soft Skills', color: '#C9A84C' },
  { id: uid(), name: 'Communication', level: 88, category: 'Soft Skills', color: '#C9A84C' },
  { id: uid(), name: 'Time Management', level: 85, category: 'Soft Skills', color: '#C9A84C' },
  { id: uid(), name: 'Content Writing', level: 82, category: 'Soft Skills', color: '#C9A84C' }
]

const defaultExperiences: WorkExperience[] = [
  {
    id: uid(),
    company: 'Resourcio Community',
    role: 'Content Writer',
    startDate: 'Jun 2024',
    endDate: 'Dec 2025',
    description: 'Authored 30+ blogs, website articles, and event announcements on technology topics for community engagement. Covered AI/ML, data science, and programming — building technical communication skills and growing the community\'s content library.',
    technologies: ['Technical Writing', 'AI/ML Content', 'Blogging', 'Community Engagement'],
  },
  {
    id: uid(),
    company: 'Hack4Bengal',
    role: 'Hackathon Evangelist',
    startDate: 'May 2024',
    endDate: 'Jun 2024',
    description: 'Promoted hackathon participation across 5+ student communities and drove 150+ registrations through referral outreach campaigns. Acted as a bridge between organisers and the developer community to maximise engagement.',
    technologies: ['Community Building', 'Event Promotion', 'Developer Outreach'],
  },
  {
    id: uid(),
    company: 'LetsUpgrade',
    role: 'Student Ambassador',
    startDate: 'Dec 2023',
    endDate: 'Feb 2024',
    description: 'Ranked among the Top 3 ambassadors out of 100+ participants for driving student engagement and course enrollments. Organised workshops and served as a campus liaison between students and the LetsUpgrade platform.',
    technologies: ['Leadership', 'Community Management', 'EdTech', 'Workshop Facilitation'],
  },
]

const defaultCertificates: Certificate[] = [
  { id: uid(), title: 'Prompt Engineering for Everyone', issuer: 'IBM Learning', date: '2025', url: 'https://courses.ibmlearning.skillsnetwork.site/certificates/313d2206f9b043f2ad2aa2360d2df7a8' },
  { id: uid(), title: 'Deep Learning with TensorFlow',  issuer: 'IBM Learning', date: '2025', url: 'https://courses.ibmlearning.skillsnetwork.site/certificates/094b2e1a0f0d473b9c610be2abc1a216' },
  { id: uid(), title: 'Machine Learning with Python',   issuer: 'IBM Learning', date: '2025', url: 'https://courses.ibmlearning.skillsnetwork.site/certificates/65bfd61e31bb43a5ac4cca568a983f00' },
  { id: uid(), title: 'Intro to Machine Learning',      issuer: 'Kaggle',       date: '2024', url: 'https://www.kaggle.com/learn/certification/dhwani107/intro-to-machine-learning' },
  { id: uid(), title: 'Intermediate Machine Learning', issuer: 'Kaggle',       date: '2024', url: 'https://www.kaggle.com/learn/certification/dhwani107/intermediate-machine-learning' },
  { id: uid(), title: 'Python',                        issuer: 'Kaggle',       date: '2024', url: 'https://www.kaggle.com/learn/certification/dhwani107/python' },
]

const defaultEducations: Education[] = [
  {
    id: uid(),
    institution: 'Techno India University, Kolkata',
    degree: 'Bachelor of Technology',
    field: 'Computer Science and Engineering',
    startYear: 2023,
    endYear: 'Present',
    gpa: '8.576 / 10',
    description: 'Focusing on AI, Machine Learning, and intelligent systems. Selected in Top 30 out of 200+ teams in Smart India Hackathon 2024 internal round. Built multiple AI/ML and Generative AI projects across NLP, LLMs, and Reinforcement Learning.',
  },
  {
    id: uid(),
    institution: 'H.M. Education Centre, Kolkata',
    degree: 'Higher Secondary',
    field: 'Science',
    startYear: 2021,
    endYear: 2023,
    gpa: '74.2%',
    description: 'Completed Higher Secondary with a Science stream focus.',
  },
  {
    id: uid(),
    institution: 'H.M. Education Centre, Kolkata',
    degree: 'Secondary',
    field: 'General',
    startYear: 2019,
    endYear: 2021,
    gpa: '95.6%',
    description: 'Completed with a distinction-level score of 95.6%.',
  },
]

interface Store {
  isAdmin: boolean
  setAdmin: (isAdmin: boolean) => void
  projects: Project[]; skills: Skill[]; experiences: WorkExperience[]
  certificates: Certificate[]; educations: Education[]
  addProject:       (p:  Omit<Project,'id'>)        => void
  updateProject:    (id: string, p:  Partial<Project>)        => void
  deleteProject:    (id: string)                    => void
  addSkill:         (s:  Omit<Skill,'id'>)          => void
  updateSkill:      (id: string, s:  Partial<Skill>)          => void
  deleteSkill:      (id: string)                    => void
  addExperience:    (e:  Omit<WorkExperience,'id'>) => void
  updateExperience: (id: string, e:  Partial<WorkExperience>) => void
  deleteExperience: (id: string)                    => void
  addCertificate:   (c:  Omit<Certificate,'id'>)   => void
  updateCertificate:(id: string, c:  Partial<Certificate>)    => void
  deleteCertificate:(id: string)                    => void
  addEducation:     (e:  Omit<Education,'id'>)      => void
  updateEducation:  (id: string, e:  Partial<Education>)      => void
  deleteEducation:  (id: string)                    => void
}

export const useStore = create<Store>()(persist((set) => ({
  isAdmin: false,
  setAdmin: (isAdmin) => set({ isAdmin }),
  projects: defaultProjects, skills: defaultSkills,
  experiences: defaultExperiences, certificates: defaultCertificates, educations: defaultEducations,

  addProject:       (p)    => set(s => ({ projects:     [...s.projects,     { ...p,  id: uid() }] })),
  updateProject:    (id,p) => set(s => ({ projects:     s.projects.map(x     => x.id===id ? {...x,...p}  : x) })),
  deleteProject:    (id)   => set(s => ({ projects:     s.projects.filter(x  => x.id!==id) })),
  addSkill:         (sk)   => set(s => ({ skills:       [...s.skills,       { ...sk, id: uid() }] })),
  updateSkill:      (id,sk)=> set(s => ({ skills:       s.skills.map(x       => x.id===id ? {...x,...sk} : x) })),
  deleteSkill:      (id)   => set(s => ({ skills:       s.skills.filter(x    => x.id!==id) })),
  addExperience:    (e)    => set(s => ({ experiences:  [...s.experiences,  { ...e,  id: uid() }] })),
  updateExperience: (id,e) => set(s => ({ experiences:  s.experiences.map(x  => x.id===id ? {...x,...e}  : x) })),
  deleteExperience: (id)   => set(s => ({ experiences:  s.experiences.filter(x=> x.id!==id) })),
  addCertificate:   (c)    => set(s => ({ certificates: [...s.certificates, { ...c,  id: uid() }] })),
  updateCertificate:(id,c) => set(s => ({ certificates: s.certificates.map(x => x.id===id ? {...x,...c}  : x) })),
  deleteCertificate:(id)   => set(s => ({ certificates: s.certificates.filter(x=> x.id!==id) })),
  addEducation:     (e)    => set(s => ({ educations:   [...s.educations,   { ...e,  id: uid() }] })),
  updateEducation:  (id,e) => set(s => ({ educations:   s.educations.map(x   => x.id===id ? {...x,...e}  : x) })),
  deleteEducation:  (id)   => set(s => ({ educations:   s.educations.filter(x => x.id!==id) })),
}), { name: 'dhwani-portfolio-v5' }))
