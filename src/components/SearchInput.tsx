'use client'

import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  inputText: string
  setInputText: Dispatch<SetStateAction<string>>
}

export default function SearchInput({ inputText, setInputText }: Props) {
  return (
    <span className="px-10 md:px-8 py-4 shadow-3xl flex gap-6 max-w-[30rem] rounded">
      <Image
        src={'/search_Icon.svg'}
        alt="icon search"
        width={30}
        height={30}
      />
      <input
        className="grow outline-none"
        type="text"
        placeholder="Search for a country..."
        onChange={e => setInputText(e.target.value)}
        value={inputText}
      />
    </span>
  )
}
