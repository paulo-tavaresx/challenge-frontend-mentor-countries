'use client'

import { useEffect, useState } from 'react'

import SearchInput from '@/components/SearchInput'
import SelectInput from '@/components/SelectInput'
import CardList from '@/components/CardList'
import { countriesType } from '@/types/countriesData'
import { notFoundCountryType } from '@/types/notFoundCountryType'

const apiURL = process.env.NEXT_PUBLIC_API_URL

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [select, setSelect] = useState('')
  const [countriesList, setCountriesList] = useState<
    countriesType[] | notFoundCountryType
  >()

  useEffect(() => {
    async function loadCountries() {
      try {
        const url = inputText ? apiURL + 'name/' + inputText : apiURL + 'all'
        const response = await fetch(url)
        const data = await response.json()
        setCountriesList(data)
      } catch (error) {
        console.log()
      }
    }
    loadCountries()
  }, [inputText])

  return (
    <main className="flex min-h-screen flex-col px-5 md:px-20 pt-8 md:pt-12 ">
      <div className="flex flex-col gap-12 md:flex-row md:justify-between md:items-center mb-10 md:mb-12">
        <SearchInput inputText={inputText} setInputText={setInputText} />
        <SelectInput select={select} setSelect={setSelect} />
      </div>
      <CardList
        countries={countriesList}
        filter={select}
        searchText={inputText}
      />
    </main>
  )
}
