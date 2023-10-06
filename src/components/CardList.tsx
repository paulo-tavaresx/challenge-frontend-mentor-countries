import { countriesType } from '@/types/countriesData'
import Card from './Card'

type Props = {
  countries: countriesType[]
}

export default function CardList({ countries }: Props) {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row flex-wrap md:gap-[4.5rem] gap-12">
      {countries.length > 0 &&
        countries.map(({ flags, capital, population, region, name }, index) => {
          return (
            <Card
              name={name.common}
              region={region}
              population={population}
              capital={capital}
              src={flags.png}
              alt={flags.alt}
              key={index}
            />
          )
        })}
    </div>
  )
}
