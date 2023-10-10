export type countriesType = {
  name: {
    common: string
    official: string
  }
  capital: string
  flags: {
    png: string
    alt: string
  }
  population: number
  borders: string[]
  region: string
  subregion: string
  tld: string
  currencies: currencyType[]
  languages: languagesType[]
}

export type currencyType = {
  [key: string]: Object[]
}

export type languagesType = {
  [key: string]: string
}
