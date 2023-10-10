import HeaderComponent from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Where in the world?',
  description: 'challenge frontend mentor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="text-[#121214] dark:text-white dark:bg-[#202D36]">
        <HeaderComponent />
        {children}
      </body>
    </html>
  )
}
