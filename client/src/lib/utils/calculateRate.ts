import { ratesDataType } from './../../../types'

const calculateExchangeRate = (
    sourceCurrency: string = '',
    targetCurrency: string = '',
    exchangeRateData: ratesDataType
) => {
    const baseCurrency = exchangeRateData.abbreviation
    const baseCurrencyRate = exchangeRateData.rates[baseCurrency]

    const exchangeRate = (exchangeRateData.rates[targetCurrency] / exchangeRateData.rates[sourceCurrency]) * baseCurrencyRate

    return exchangeRate
}

export default calculateExchangeRate