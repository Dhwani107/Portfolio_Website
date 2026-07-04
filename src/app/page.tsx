import dynamic from 'next/dynamic'
import Nav from '@/components/ui/Nav'
import Hero from '@/components/sections/Hero'

const Projects = dynamic(() => import('@/components/sections/Projects'))
const Skills = dynamic(() => import('@/components/sections/Skills'))
const Experience = dynamic(() => import('@/components/sections/Experience'))
const Edu = dynamic(() => import('@/components/sections/Education'))
const Certificates = dynamic(() => import('@/components/sections/Certificates'))
const Contact = dynamic(() => import('@/components/sections/Contact'))
const Footer = dynamic(() => import('@/components/ui/Footer'))

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Edu />
      <Certificates />
      <Contact />
      <Footer />
    </>
  )
}
