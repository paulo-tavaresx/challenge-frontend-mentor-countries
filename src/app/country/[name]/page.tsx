'use client'

import {
  countriesType,
  currencyType,
  languagesType,
} from '@/types/countriesData'
import { notFoundCountryType } from '@/types/notFoundCountryType'
import { Roboto } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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
  const [countryBordersData, setCountryBordersData] = useState<
    { name: { common: string } }[] | undefined
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

  useEffect(() => {
    async function loadBorder() {
      try {
        if (!countryData || !Array.isArray(countryData))
          throw new Error("the country don't have borders")

        const bordersName = countryData[0].borders.map(alphaCode =>
          fetch(apiURL + 'alpha/' + alphaCode + '?fields=name').then(res =>
            res.json(),
          ),
        )
        Promise.all(bordersName).then(data => setCountryBordersData(data))
      } catch (error) {
        console.log()
      }
    }
    loadBorder()
  }, [countryData])

  if (!countryData || !Array.isArray(countryData)) return

  function getCountryCurrencies(currencies: currencyType[]) {
    const countryCurrencies = []
    for (let key in currencies) {
      countryCurrencies.push(currencies[key].name)
    }
    return countryCurrencies
  }

  function getCountryLanguages(languages: languagesType[]) {
    const countryLanguages = []
    for (let key in languages) {
      countryLanguages.push(languages[key])
    }
    return countryLanguages
  }

  return (
    <main className="flex min-h-screen flex-col px-5 md:p-20 pt-8  ">
      <Link
        href={'/'}
        className={`py-2 px-9 shadow-3xl max-w-[8.5rem] rounded-md ${roboto.className}`}
      >
        Back
      </Link>

      <div className="mt-[4.5rem] md:mt-20 flex flex-wrap gap-y-[4.5rem] gap-x-[9.5rem] md:items-center">
        <div className="relative w-[25rem] md:w-[34.6875rem]  h-[16.75rem] md:h-[25rem]">
          <Image
            src={countryData[0].flags.png}
            alt={
              countryData[0].flags.alt || countryData[0].name.common + ' flag'
            }
            fill={true}
            sizes="(min-width: 769px) 34.6875rem, (max-width: 768px) 25rem"
          />
        </div>
        <div className="flex flex-col gap-y-[3.75rem] max-w-xl">
          <h2
            className={`${roboto.className} text-2xl font-extrabold leading-normal`}
          >
            {countryData[0].name.common}
          </h2>
          <div className="flex flex-wrap gap-[3.75rem] justify-between">
            <div>
              <h3>Native Name: {countryData[0].name.official}</h3>
              <h3>Population: {countryData[0].population}</h3>
              <h3>Region: {countryData[0].region}</h3>
              <h3>Sub Region: {countryData[0].subregion}</h3>
              <h3>Capital: {countryData[0].capital}</h3>
            </div>
            <div>
              <h3>Top Level Domain: {countryData[0].tld}</h3>
              <h3>
                Currencies:
                {getCountryCurrencies(countryData[0].currencies).join(', ')}
              </h3>
              <h3>
                Languages:{' '}
                {getCountryLanguages(countryData[0].languages).join(', ')}
              </h3>
            </div>
          </div>
          <div>
            <h3>Border Countries:</h3>
            <span className="flex flex-wrap gap-3">
              {countryBordersData &&
                countryBordersData.map((value, index) => (
                  <Link
                    className={`${roboto.className} rounded shadow-3xl bg-white/50 w-24 h-7 text-center py-1 text-sm leading-normal font-normal`}
                    key={`border-${index}`}
                    href={value.name.common}
                  >
                    {value.name.common}
                  </Link>
                ))}
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
