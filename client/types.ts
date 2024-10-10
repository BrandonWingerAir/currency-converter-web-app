export interface ratesDataType {
    success: boolean
    timestamp: number
    abbreviation: string
    date: string
    rates: {[key: string]: number}
}

export interface currencyNameType {
    abbreviation: string
    name: string
}