import { Roboto, Roboto_Flex } from 'next/font/google'

type headerProps = {}

const robotoFlex = Roboto_Flex({ subsets: ['latin'] })
const roboto = Roboto({ weight: '700', subsets: ['latin'] })

export default function HeaderComponent({}: headerProps) {
  return (
    <header
      className={`px-5 py-10  md:px-20  md:py-6 flex justify-between shadow-3xl w-full`}
    >
      <span
        className={`${robotoFlex.className} text-lg md:text-2xl font-bold leading-normal text-[#121214] `}
      >
        Where in the world?
      </span>
      <span className={`${roboto.className} text-base leading-normal`}>
        Dark Mode
      </span>
    </header>
  )
}
