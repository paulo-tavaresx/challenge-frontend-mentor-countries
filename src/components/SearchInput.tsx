'use client'

import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  inputText: string
  setInputText: Dispatch<SetStateAction<string>>
}

export default function SearchInput({ inputText, setInputText }: Props) {
  return (
    <span className="px-10 dark:bg-[#2B3743] md:px-8 py-4 shadow-3xl flex gap-6 max-w-[30rem] rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
      >
        <path
          d="M8.33333 14.6667C11.555 14.6667 14.1667 12.055 14.1667 8.83333C14.1667 5.61167 11.555 3 8.33333 3C5.11167 3 2.5 5.61167 2.5 8.83333C2.5 12.055 5.11167 14.6667 8.33333 14.6667Z"
          className="stroke-[#121214] dark:stroke-white"
          stroke-opacity="0.5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.5 13L17.5 18"
          className="stroke-[#121214] dark:stroke-white "
          stroke-opacity="0.5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <input
        className="grow outline-none bg-transparent"
        type="text"
        placeholder="Search for a country..."
        onChange={e => setInputText(e.target.value)}
        value={inputText}
      />
    </span>
  )
}
