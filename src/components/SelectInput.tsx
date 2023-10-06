import { Dispatch, SetStateAction } from 'react'

type Props = {
  select: string
  setSelect: Dispatch<SetStateAction<string>>
}

export default function SelectInput({ select, setSelect }: Props) {
  return (
    <label className="flex grow  border-0  max-w-[15.5rem] md:max-w-[12.5rem] shadow-3xl rounded ">
      <select
        className="grow pl-6 py-4 pr-3 text-sm leading-normal gap-1 appearance-none bg-arrow focus:outline-0"
        value={select}
        onChange={({ target }) => setSelect(target.value)}
      >
        <option value="">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </label>
  )
}
