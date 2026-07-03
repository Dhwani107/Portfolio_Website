import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import TwinkleStars from '@/components/ui/TwinkleStars'

export const metadata: Metadata = {
  title: 'Dhwani Chauhan — AI Engineer · LLM & Generative AI Developer',
  description: 'AI engineer building LLM applications, RAG pipelines, and Agentic AI systems. Hands-on with LangChain, Mistral AI, PyTorch, and Python.',
  keywords: 'AI Engineer, LLM, Generative AI, RAG, LangChain, Machine Learning, NLP, Python, Portfolio, Dhwani Chauhan',
  authors: [{ name: 'Dhwani Chauhan' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grain">
        <TwinkleStars />
        {children}
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#0F0F18',
            color: '#F0EEE8',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: '2px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.85rem',
            fontWeight: '300',
          },
          success: { iconTheme: { primary: '#C9A84C', secondary: '#050507' } },
        }} />
      </body>
    </html>
  )
}
