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
    <main
      className={`flex min-h-screen flex-col px-5 md:p-20 py-8  ${roboto.className}`}
    >
      <Link
        href={'/'}
        className={`py-2 px-9  flex gap-2 shadow-3xl max-w-[8.5rem] rounded-md dark:bg-[#2B3743]  `}
      >
        <svg
          className="fill-[#121214] dark:fill-white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Arrow / Arrow_Right_LG">
            <path
              className="stroke-[#121214] dark:stroke-white"
              id="Vector"
              d="M21 12L3 12"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              className="stroke-[#121214] dark:stroke-white"
              id="Vector_2"
              d="M8 17L3 12L8 7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
        Back
      </Link>

      <div className="mt-[4.5rem] md:mt-20 flex flex-wrap gap-y-[4.5rem] gap-x-[9.5rem] md:items-center">
        <div className="relative w-[25rem] md:w-[34.6875rem]  h-[16.75rem] md:h-[25rem]">
          <Image
            priority
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
              <p>
                <span className="font-medium">Native Name: </span>
                {countryData[0].name.official}
              </p>
              <p>
                <span className="font-medium">Population: </span>
                {countryData[0].population}
              </p>
              <p>
                <span className="font-medium">Region: </span>
                {countryData[0].region}
              </p>
              <p>
                <span className="font-medium">Sub Region: </span>
                {countryData[0].subregion}
              </p>
              <p>
                <span className="font-medium">Capital: </span>
                {countryData[0].capital}
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium">Top Level Domain: </span>
                {countryData[0].tld}
              </p>
              <p>
                <span className="font-medium">Currencies: </span>
                {getCountryCurrencies(countryData[0].currencies).join(', ')}
              </p>
              <p>
                <span className="font-medium">Languages: </span>
                {getCountryLanguages(countryData[0].languages).join(', ')}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <p>
              <span className="font-medium">Border Countries: </span>
            </p>
            <span className="flex flex-wrap gap-3">
              {countryBordersData ? (
                countryBordersData.map((value, index) => (
                  <Link
                    className={`rounded shadow-3xl bg-white/50 dark:bg-[#2B3743]  w-24 h-7 text-center py-1 text-sm leading-normal font-normal`}
                    key={`border-${index}`}
                    href={value.name.common}
                  >
                    {value.name.common}
                  </Link>
                ))
              ) : (
                <p>{"The country don't have borders"}</p>
              )}
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
