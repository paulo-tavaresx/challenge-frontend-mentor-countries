import { Dispatch, SetStateAction } from 'react'

type Props = {
  select: string
  setSelect: Dispatch<SetStateAction<string>>
}

export default function SelectInput({ select, setSelect }: Props) {
  return (
    <label className="flex grow  border-0  max-w-[15.5rem] md:max-w-[12.5rem] shadow-3xl rounded ">
      <select
        className="block grow pl-6 py-4 mr-3 text-sm leading-normal gap-1 after:border-0 border-8 border-none"
        value={select}
        onChange={({ target }) => setSelect(target.value)}
      >
        <option value="">Filter by Region</option>
        <option value="notebook">Notebook</option>
        <option value="smartphone">Smartphone</option>
        <option value="tablet">Tablet</option>
      </select>
    </label>
  )
}
