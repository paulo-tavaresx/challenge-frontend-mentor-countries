import { Roboto } from 'next/font/google'
import Image from 'next/image'

const roboto = Roboto({ weight: ['700', '500', '400'], subsets: ['latin'] })

type Props = {
  src: string
  alt: string
  capital: string
  population: number
  region: string
  name: string
}

export default function Card({
  src,
  alt,
  capital,
  population,
  region,
  name,
}: Props) {
  return (
    <div
      className={`shadow-3xl flex flex-col w-[20.5rem] md:w-[16.5625rem] rounded-md overflow-hidden  ${roboto.className}`}
    >
      <div className="w-[20.5rem] md:w-[16.5625rem] relative h-[12.375rem] md:h-40 self-stretch">
        <Image
          src={src}
          alt={alt || name + ' flag'}
          fill={true}
          sizes="(min-width: 769px) 16.5625rem, (max-width: 768px) 20.5rem"
        />
      </div>

      <div className="px-6 pt-7 pb-11 flex flex-col gap-5 font-bold leading-normal">
        <h2 className="text-lg font-bold">{name}</h2>

        <div className="flex flex-col gap-2 ">
          <h3 className="font-medium">
            Population: <span className="font-normal">{population}</span>
          </h3>
          <h3 className="font-medium">
            Region: <span className="font-normal">{region}</span>
          </h3>
          <h3 className="font-medium">
            Capital: <span className="font-normal">{capital}</span>
          </h3>
        </div>
      </div>
    </div>
  )
}
