export interface ratesDataType {
    success: boolean
    timestamp: number
    Abase: string
    date: string
    rates: {[key: string]: number}
}

export interface currencyNameType {
    abbreviation: string
    name: string
}