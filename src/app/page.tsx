'use client'

import { useState } from 'react'

import SearchInput from '@/components/SearchInput'
import SelectInput from '@/components/SelectInput'
import CardList from '@/components/CardList'

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [select, setSelect] = useState('')
  return (
    <main className="flex min-h-screen flex-col px-5 md:px-20 pt-8 md:pt-12 ">
      <div className="flex flex-col gap-12 md:flex-row md:justify-between md:items-center mb-10 md:mb-12">
        <SearchInput inputText={inputText} setInputText={setInputText} />
        <SelectInput select={select} setSelect={setSelect} />
      </div>
      <CardList cardList={[]} />
    </main>
  )
}
