import { countriesType } from '@/types/countriesData'
import { notFoundCountryType } from '@/types/notFoundCountryType'
import Card from './Card'
import { isArray } from 'util'
import Link from 'next/link'

interface CardListProps {
  countries: notFoundCountryType | countriesType[] | undefined
  filter: string
  searchText: string
}

export default function CardList({
  countries,
  filter,
  searchText,
}: CardListProps) {
  if (!countries) return
  if (countries && !isArray(countries)) {
    return <h1> Country not found {searchText} </h1>
  }
  const filtered = countries.filter(({ region }) => {
    return filter ? region === filter : true
  })
  return (
    <div className="flex flex-col items-center justify-center md:flex-row flex-wrap md:gap-[4.5rem] gap-12">
      {filtered.length > 0 &&
        filtered.map(({ flags, capital, population, region, name }, index) => {
          return (
            <Link href={`/country/${name.common}`} key={index}>
              <Card
                name={name.common}
                region={region}
                population={population}
                capital={capital}
                src={flags.png}
                alt={flags.alt}
              />
            </Link>
          )
        })}
    </div>
  )
}
