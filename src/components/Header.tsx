'use client'
import { Roboto, Roboto_Flex } from 'next/font/google'
import { useEffect, useState } from 'react'

type headerProps = {}

const robotoFlex = Roboto_Flex({ subsets: ['latin'] })
const roboto = Roboto({ weight: '700', subsets: ['latin'] })

export default function HeaderComponent({}: headerProps) {
  const [themeMode, setThemeMode] = useState<string | undefined | null>()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      let theme = localStorage.getItem('theme')
      setThemeMode(theme)
    }
  }, [])

  function changeThemeMode() {
    if (localStorage.theme == 'dark') {
      localStorage.removeItem('theme')
      setThemeMode('')
    } else {
      localStorage.setItem('theme', 'dark')
      setThemeMode('dark')
    }
  }

  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [themeMode])

  return (
    <header
      className={`px-5 py-10 dark:bg-[#2B3743] md:px-20  md:py-6 flex justify-between shadow-3xl w-full`}
    >
      <span
        className={`${robotoFlex.className} text-lg md:text-2xl font-bold leading-normal`}
      >
        Where in the world?
      </span>
      <span
        onClick={changeThemeMode}
        className={`${roboto.className} flex items-center gap-2 select-none text-base leading-normal cursor-pointer`}
      >
        <svg
          className="fill-none dark:fill-white"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            d="M15.4608 10.9609C14.8403 11.149 14.1819 11.2501 13.5 11.2501C9.77208 11.2501 6.75 8.22802 6.75 4.5001C6.75 3.81816 6.85113 3.15983 7.0392 2.53931C4.26756 3.37937 2.25 5.95412 2.25 9.0001C2.25 12.728 5.27208 15.7501 9 15.7501C12.046 15.7501 14.6207 13.7325 15.4608 10.9609Z"
            className="stroke-[#121214] dark:stroke-white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Dark Mode
      </span>
    </header>
  )
}
