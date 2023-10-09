'use client'

import { countriesType } from '@/types/countriesData'
import { notFoundCountryType } from '@/types/notFoundCountryType'
import { Roboto } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { isArray } from 'util'

const roboto = Roboto({ weight: ['700', '500', '400'], subsets: ['latin'] })

const apiURL = process.env.NEXT_PUBLIC_API_URL

interface CountryProps {
  params: {
    name: string
  }
}

export default function Page({ params }: CountryProps) {
  const [countryData, setCountryData] = useState<
    countriesType[] | notFoundCountryType
  >()

  useEffect(() => {
    async function loadCountries() {
      try {
        const url = apiURL + 'name/' + params.name
        const response = await fetch(url)
        const data = await response.json()
        setCountryData(data)
      } catch (error) {
        console.log()
      }
    }
    loadCountries()
  }, [params.name])

  if (!countryData || !isArray(countryData)) return

  return (
    <main className="flex min-h-screen flex-col px-5 md:p-20 pt-8  ">
      <Link
        href={'/'}
        className={`py-2 px-9 shadow-3xl max-w-[8.5rem] rounded-md ${roboto.className}`}
      >
        Back
      </Link>

      <div className="mt-[4.5rem] md:mt-20 flex flex-col md:flex-row gap-y-[4.5rem] md:items-center md:justify-between">
        <div className="relative w-[25rem] md:w-[34.6875rem]  h-[16.75rem] md:h-[25rem] self-stretch">
          <Image
            src={countryData[0].flags.png}
            alt={
              countryData[0].flags.alt || countryData[0].name.common + ' flag'
            }
            fill={true}
            sizes="(min-width: 769px) 34.6875rem, (max-width: 768px) 25rem"
          />
        </div>
        <div className="flex flex-col gap-y-[3.75rem]">
          <h2
            className={`${roboto.className} text-2xl font-extrabold leading-normal`}
          >
            {countryData[0].name.common}
          </h2>
          <div>
            <h3>Native Name: {countryData[0].name.official}</h3>
            <h3>Population: {countryData[0].population}</h3>
            <h3>Region: {countryData[0].region}</h3>
            <h3>Sub Region: {countryData[0].subregion}</h3>
            <h3>Capital: {countryData[0].capital}</h3>
          </div>
        </div>
      </div>
    </main>
  )
}
