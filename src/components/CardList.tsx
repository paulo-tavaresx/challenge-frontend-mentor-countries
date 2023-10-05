import Card from './Card'

type Props = {
  cardList: []
}

export default function CardList({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center  md:flex-row flex-wrap md:gap-[4.5rem] gap-12">
      <Card src="sfsdda" />
      <Card src="sfsdda" />
      <Card src="sfsdda" />
      <Card src="sfsdda" />
      <Card src="sfsdda" />
      <Card src="sfsdda" />
      <Card src="sfsdda" />
      <Card src="sfsdda" />
      <Card src="sfsdda" />
      <Card src="sfsdda" />
      <Card src="sfsdda" />
      <Card src="sfsdda" />
      <Card src="sfsdda" />
      <Card src="sfsdda" />
    </div>
  )
}
