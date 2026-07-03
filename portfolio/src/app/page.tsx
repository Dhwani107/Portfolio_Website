import dynamic from 'next/dynamic'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Edu from '@/components/sections/Education'
import Certificates from '@/components/sections/Certificates'
import Contact from '@/components/sections/Contact'

const Cursor = dynamic(() => import('@/components/ui/Cursor'), { ssr: false })

export default function Page() {
  return (
    <>
      <Cursor />
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
